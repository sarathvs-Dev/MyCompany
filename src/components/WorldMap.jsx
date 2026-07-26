import React, { useEffect, useRef } from 'react';
import { GRID, landCells, project } from '../data/worldMask';

/**
 * Animated dotted world map for the hero backdrop — the "Together Build Future"
 * network. Land is drawn as a dot grid, a slow light sweep travels across it,
 * and pulses run along routes between hub cities, lighting nearby dots as they go.
 *
 * Canvas rather than DOM: ~4k dots redrawn every frame is far too much for SVG.
 */

const HUBS = [
  { name: 'San Francisco', lat: 37.77, lon: -122.42 },
  { name: 'New York', lat: 40.71, lon: -74.01 },
  { name: 'London', lat: 51.51, lon: -0.13 },
  { name: 'Dubai', lat: 25.2, lon: 55.27 },
  { name: 'Bengaluru', lat: 12.97, lon: 77.59 },
  { name: 'Singapore', lat: 1.35, lon: 103.82 },
  { name: 'Tokyo', lat: 35.68, lon: 139.69 },
  { name: 'Sydney', lat: -33.87, lon: 151.21 },
  { name: 'Sao Paulo', lat: -23.55, lon: -46.63 },
];

// index pairs into HUBS, with the travel duration (s) and start offset of each pulse
const ROUTES = [
  [0, 1, 5.0, 0.0],
  [1, 2, 4.4, 0.35],
  [2, 3, 4.8, 0.15],
  [3, 4, 3.8, 0.6],
  [4, 5, 3.6, 0.25],
  [5, 7, 5.2, 0.5],
  [6, 0, 6.0, 0.75],
  [8, 1, 5.4, 0.45],
  [2, 4, 6.4, 0.9],
];

// hubs worth naming on the large dark map; the rest stay as anonymous nodes
const LABELLED = new Set(['San Francisco', 'London', 'Dubai', 'Bengaluru', 'Singapore', 'Sydney']);

const mix = (a, b, t) => Math.round(a + (b - a) * t);

/**
 * dotAt(level) colours a dot by how lit it is, 0 = resting land, 1 = a pulse is
 * passing over it. Resting land stays neutral; colour only appears with motion.
 */
const ramp = (rest, lit) => (level) =>
  `rgba(${mix(rest[0], lit[0], level)}, ${mix(rest[1], lit[1], level)}, ` +
  `${mix(rest[2], lit[2], level)}, ${rest[3] + (lit[3] - rest[3]) * level})`;

const THEMES = {
  // land in neutral slate, colour reserved for the parts that actually move
  light: {
    dotAt: ramp([100, 116, 139, 0.2], [37, 99, 235, 0.75]),
    arc: 'rgba(148, 163, 184, 0.22)',
    pulse: (a) => `rgba(37, 99, 235, ${a})`,
    hub: 'rgba(37, 99, 235, 0.75)',
    ring: (a) => `rgba(37, 99, 235, ${a})`,
    label: 'rgba(71, 85, 105, 0.6)',
  },
  dark: {
    dotAt: ramp([96, 165, 250, 0.28], [191, 219, 254, 0.9]),
    arc: 'rgba(96, 165, 250, 0.16)',
    pulse: (a) => `rgba(125, 211, 252, ${a})`,
    hub: 'rgba(147, 197, 253, 0.95)',
    ring: (a) => `rgba(125, 211, 252, ${a})`,
    label: 'rgba(191, 219, 254, 0.6)',
  },
};

const WorldMap = ({ className = '', theme = 'light', minSpacing = 4.6, labels = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cells = landCells();
    const hubGrid = HUBS.map((h) => project(h.lat, h.lon));
    const C = THEMES[theme] || THEMES.light;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const BUCKETS = 10;
    const buckets = Array.from({ length: BUCKETS }, () => []);

    let dots = new Float32Array(0);
    let spacing = 0;
    let originX = 0;
    let originY = 0;
    let width = 0;
    let height = 0;

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // fit the map to the width, but never let the dots get too dense to read —
      // on narrow screens the map is scaled up and centre-cropped instead
      spacing = Math.max(width / GRID.cols, minSpacing);
      originX = (width - GRID.cols * spacing) / 2;
      originY = (height - GRID.rows * spacing) / 2;

      dots = new Float32Array(cells.length * 2);
      for (let i = 0; i < cells.length; i++) {
        dots[i * 2] = originX + cells[i][0] * spacing;
        dots[i * 2 + 1] = originY + cells[i][1] * spacing;
      }
    };

    const toCanvas = ([gx, gy]) => [originX + gx * spacing, originY + gy * spacing];

    // quadratic curve lifted perpendicular to the chord, so routes arc like flight paths
    const curve = (a, b) => {
      const [x1, y1] = toCanvas(a);
      const [x2, y2] = toCanvas(b);
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy) || 1;
      const lift = Math.min(len * 0.22, height * 0.42);
      return { x1, y1, x2, y2, cx: mx - (dy / len) * lift, cy: my + (dx / len) * lift };
    };

    const at = (c, t) => {
      const u = 1 - t;
      return [
        u * u * c.x1 + 2 * u * t * c.cx + t * t * c.x2,
        u * u * c.y1 + 2 * u * t * c.cy + t * t * c.y2,
      ];
    };

    const dotR = () => Math.max(0.9, spacing * 0.16);

    const draw = (time) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);

      // live pulse positions, used both for the arcs and to light nearby dots
      const pulses = [];
      if (!reduced) {
        for (const [ai, bi, dur, off] of ROUTES) {
          const p = ((t / dur + off) % 1.35) / 1; // >1 leaves a gap between runs
          if (p > 1) continue;
          const c = curve(hubGrid[ai], hubGrid[bi]);
          pulses.push({ c, p, pos: at(c, p) });
        }
      }

      // --- land dots ---
      // Brightness is quantised into a few buckets so the whole field costs one
      // path + one fill per bucket instead of ~4000 fills a frame.
      const r = dotR();
      const glowR = spacing * 7;
      const glowR2 = glowR * glowR;
      const TAU = Math.PI * 2;

      for (let b = 0; b < BUCKETS; b++) buckets[b].length = 0;

      for (let i = 0; i < dots.length; i += 2) {
        const x = dots[i];
        const y = dots[i + 1];
        if (x < -20 || x > width + 20) continue;

        let boost = 0;
        if (!reduced) {
          // slow diagonal light sweep
          const wave = Math.sin(x * 0.012 + y * 0.02 - t * 0.85);
          if (wave > 0) {
            const w2 = wave * wave;
            const w4 = w2 * w2;
            boost = w4 * w4 * 0.5;
          }

          // dots near a travelling pulse flare up
          for (let k = 0; k < pulses.length; k++) {
            const dx = x - pulses[k].pos[0];
            const dy = y - pulses[k].pos[1];
            const d2 = dx * dx + dy * dy;
            if (d2 < glowR2) {
              const v = (1 - d2 / glowR2) * 0.85;
              if (v > boost) boost = v;
            }
          }
        }

        const bucket = buckets[Math.min(BUCKETS - 1, (boost * BUCKETS) | 0)];
        bucket.push(x, y, r * (1 + boost * 0.9));
      }

      for (let b = 0; b < BUCKETS; b++) {
        const list = buckets[b];
        if (!list.length) continue;
        ctx.beginPath();
        for (let i = 0; i < list.length; i += 3) {
          ctx.moveTo(list[i] + list[i + 2], list[i + 1]);
          ctx.arc(list[i], list[i + 1], list[i + 2], 0, TAU);
        }
        // mid-point of the bucket keeps the ramp smooth
        ctx.fillStyle = C.dotAt((b + 0.5) / BUCKETS);
        ctx.fill();
      }

      // --- route arcs ---
      for (const [ai, bi] of ROUTES) {
        const c = curve(hubGrid[ai], hubGrid[bi]);
        ctx.beginPath();
        ctx.moveTo(c.x1, c.y1);
        ctx.quadraticCurveTo(c.cx, c.cy, c.x2, c.y2);
        ctx.strokeStyle = C.arc;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // --- travelling pulses ---
      for (const { c, p, pos } of pulses) {
        const SEGS = 14;
        const tail = 0.16;
        for (let s = 0; s < SEGS; s++) {
          const t0 = Math.max(0, p - tail * ((s + 1) / SEGS));
          const t1 = Math.max(0, p - tail * (s / SEGS));
          if (t1 <= 0) break;
          const [ax, ay] = at(c, t0);
          const [bx, by] = at(c, t1);
          const fade = 1 - s / SEGS;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = C.pulse(0.5 * fade);
          ctx.lineWidth = 1.6 * fade + 0.4;
          ctx.stroke();
        }
        const g = ctx.createRadialGradient(pos[0], pos[1], 0, pos[0], pos[1], 9);
        g.addColorStop(0, C.pulse(0.85));
        g.addColorStop(1, C.pulse(0));
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], 9, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // --- hub markers, each breathing on its own phase ---
      hubGrid.forEach((h, i) => {
        const [x, y] = toCanvas(h);
        if (x < -20 || x > width + 20) return;
        const phase = reduced ? 0 : (t * 0.5 + i * 0.37) % 1;
        if (!reduced) {
          ctx.beginPath();
          ctx.arc(x, y, 3 + phase * 13, 0, Math.PI * 2);
          ctx.strokeStyle = C.ring(0.35 * (1 - phase));
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = C.hub;
        ctx.fill();

        if (labels && LABELLED.has(HUBS[i].name) && width > 420) {
          // flip the label inboard near the edges so it never runs off the canvas
          const flip = x > width * 0.72;
          ctx.font = '500 10px Inter, sans-serif';
          ctx.textAlign = flip ? 'right' : 'left';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = C.label;
          ctx.fillText(HUBS[i].name, x + (flip ? -8 : 8), y - 7);
        }
      });
    };

    let frame = 0;
    let running = true;
    const loop = (time) => {
      draw(time);
      if (running && !reduced) frame = requestAnimationFrame(loop);
    };

    layout();
    frame = requestAnimationFrame(loop);

    const onResize = () => {
      layout();
      if (reduced) draw(performance.now());
    };
    window.addEventListener('resize', onResize);

    // don't burn frames while the hero is scrolled out of view
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          if (!reduced) frame = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      io.disconnect();
    };
  }, [theme, minSpacing, labels]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default WorldMap;

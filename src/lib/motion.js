/**
 * One motion vocabulary for the whole site.
 *
 * Everything shares a single easing curve and a short travel distance — a lot of
 * small consistent movements read as craft, whereas a dozen different durations
 * and distances read as noise. Distances stay under ~16px on purpose: content
 * that flies in from far away feels cheap and delays the read.
 *
 * prefers-reduced-motion is handled globally in index.css, which flattens these
 * transitions to ~0s while leaving the final (visible) state intact.
 */

export const EASE = [0.22, 1, 0.36, 1];

export const viewportOnce = { once: true, margin: '-80px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

/**
 * Parent wrapper that walks its children in one after another.
 * `gap` is the delay between children; keep it small — anything past ~0.08s
 * starts to feel like the page is loading slowly rather than arriving.
 */
export const stagger = (gap = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Convenience props for a scroll-triggered reveal. */
export const revealProps = {
  variants: fadeUp,
  initial: 'hidden',
  whileInView: 'show',
  viewport: viewportOnce,
};

/** Same, for a group that should stagger its children. */
export const revealGroup = (gap = 0.06) => ({
  variants: stagger(gap),
  initial: 'hidden',
  whileInView: 'show',
  viewport: viewportOnce,
});

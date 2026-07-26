import React, { useState } from 'react';

/**
 * Image wrapper for the Unsplash-hosted photography.
 *
 * The originals were requested at w=2070 and then painted into ~400px slots, so
 * every visitor downloaded roughly 25x the pixels they could actually see. This
 * rewrites the width parameter into a srcset and lets the browser pick, and
 * fades each photo in once decoded so the layout never flashes a broken frame.
 */

const WIDTHS = [480, 768, 1200, 1600];

/** Swap Unsplash's `w=` for a specific width, leaving the rest of the URL alone. */
const at = (src, width) =>
  /[?&]w=\d+/.test(src) ? src.replace(/([?&]w=)\d+/, `$1${width}`) : `${src}&w=${width}`;

const Img = ({ src, alt, className = '', sizes = '100vw', width, height, eager = false }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={at(src, 1200)}
      srcSet={WIDTHS.map((w) => `${at(src, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-700 ease-soft ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};

export default Img;

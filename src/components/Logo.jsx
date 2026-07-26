import React from 'react';

/**
 * TBF — Together Build Future
 * Wraps the brand artwork in /public so every placement stays consistent.
 *
 * withTagline: full lockup (mark + "TOGETHER BUILD FUTURE") instead of the mark alone
 * onDark:      lifts the navy strokes so they stay legible on the dark sections
 */
const Logo = ({ className = 'h-9 w-auto', withTagline = false, onDark = false }) => (
  <img
    src={withTagline ? '/logo.png' : '/logo-mark.png'}
    width={withTagline ? 786 : 710}
    height={withTagline ? 350 : 278}
    alt="TBF — Together Build Future"
    className={className}
    style={onDark ? { filter: 'brightness(1.8) saturate(1.15)' } : undefined}
  />
);

export default Logo;

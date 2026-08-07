import React from 'react';

export const BlockIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Isometric Cube (Minecraft Block) */}
    {/* Top Face */}
    <polygon points="12 3 20 7.5 12 12 4 7.5" fill="none" />
    {/* Left Face */}
    <polygon points="4 7.5 12 12 12 21 4 16.5" fill="none" />
    {/* Right Face */}
    <polygon points="20 7.5 12 12 12 21 20 16.5" fill="none" />
    {/* Grass Top Details (Subtle line indicating top layer) */}
    <path d="M4 10.5 L12 15 L20 10.5" strokeDasharray="1 3" />
  </svg>
);

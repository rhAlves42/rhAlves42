"use client";

import React, { useCallback, useEffect, useRef } from "react";

// Define keyframe points for X and Y
const keyframes = [
  { x: 42.1315, y: 83.8101 }, // 0%
  { x: 30.6253, y: 52.3812 }, // 25%
  { x: 39.7, y: 21.9 }, // 50%
  { x: 66.441, y: 50.396 }, // 75%
  { x: 42.1315, y: 83.8101 } // 100%
];

// Define sizes for radial-gradient (optional interpolation)
const sizes = [
  { rx: 25.2247, ry: 45.6171 },
  { rx: 38.8304, ry: 71.4396 },
  { rx: 61, ry: 200 },
  { rx: 38.349, ry: 69.9448 },
  { rx: 25.2247, ry: 45.6171 }
];

const duration = 3000; // 4 seconds per cycle

const Neon = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const startRef = useRef(0);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const t = (elapsed % duration) / duration; // normalize 0-1

      // Calculate which keyframe segment we are in
      const segmentCount = keyframes.length - 1;
      const segmentIndex = Math.floor(t * segmentCount);
      const segmentT = t * segmentCount - segmentIndex; // 0-1 within segment

      // Linear interpolation for position
      const x =
        keyframes[segmentIndex].x +
        (keyframes[segmentIndex + 1].x - keyframes[segmentIndex].x) * segmentT;
      const y =
        keyframes[segmentIndex].y +
        (keyframes[segmentIndex + 1].y - keyframes[segmentIndex].y) * segmentT;

      // Interpolate size
      const rx =
        sizes[segmentIndex].rx + (sizes[segmentIndex + 1].rx - sizes[segmentIndex].rx) * segmentT;
      const ry =
        sizes[segmentIndex].ry + (sizes[segmentIndex + 1].ry - sizes[segmentIndex].ry) * segmentT;

      if (divRef.current) {
        divRef.current.style.backgroundImage = `radial-gradient(${rx}% ${ry}% at ${x}% ${y}%, rgb(181,225,255) 0%, rgba(181,225,255,0) 100%)`;
      }

      requestAnimationFrame(animate);
    },
    [startRef, divRef]
  );

  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);

  return <div ref={divRef} className="neon bg-black px-7 py-4" />;
};

export default Neon;

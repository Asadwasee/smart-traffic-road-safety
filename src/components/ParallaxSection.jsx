import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ParallaxSection({ children, speed = 0.5, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const animation = gsap.to(el, {
      y: (index, target) => -ScrollTrigger.maxScroll(window) * (speed * 0.1),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

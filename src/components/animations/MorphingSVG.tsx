import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const paths = {
  code: "M20,10 L80,10 C85,10 90,15 90,20 L90,80 C90,85 85,90 80,90 L20,90 C15,90 10,85 10,80 L10,20 C10,15 15,10 20,10 Z",
  circle: "M50,10 A40,40 0 1 1 50,90 A40,40 0 1 1 50,10",
  triangle: "M50,10 L90,90 L10,90 Z",
  wave: "M10,50 C30,40 40,60 50,50 C60,40 70,60 90,50 C70,60 60,40 50,50 C40,60 30,40 10,50",
};

const MorphingSVG = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const timeline = gsap.timeline({
      repeat: -1,
      defaults: { duration: 2, ease: "power2.inOut" },
    });

    // Initial state
    gsap.set(pathRef.current, {
      attr: { d: paths.code },
    });

    // Create the morphing sequence
    timeline
      .to(pathRef.current, {
        attr: { d: paths.circle },
      })
      .to(pathRef.current, {
        attr: { d: paths.triangle },
      })
      .to(pathRef.current, {
        attr: { d: paths.wave },
      })
      .to(pathRef.current, {
        attr: { d: paths.code },
      });

    // Add floating animation
    gsap.to(svgRef.current, {
      y: 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Add rotation
    gsap.to(svgRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] opacity-30 mix-blend-screen pointer-events-none">
      <svg ref={svgRef} viewBox="0 0 100 100" className="w-full h-full">
        <path
          ref={pathRef}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          className="drop-shadow-[0_0_10px_rgba(0,245,212,0.5)]"
        />
      </svg>
    </div>
  );
};

export default MorphingSVG;

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextLayer = () => {
  const mainDivRef = useRef(null);
  const firstHeadingRef = useRef(null);
  const secondHeadingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(firstHeadingRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: mainDivRef.current,
          start: "top top",
          end: "10% top",
          scrub: 2,
        },
      });

      gsap.fromTo(
        secondHeadingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: mainDivRef.current,
            start: "100vh top",
            end: "200vh top",
            scrub: 2,
          },
        }
      );
    }, mainDivRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainDivRef} id="maindiv" className="top-0 left-16 w-full h-screen bg-transparent p-4">
      <h1 ref={firstHeadingRef} className="first-heading text-slate-100 w-[40vw] text-6xl z-10 fixed top-40 left-10">
        Get ready to reveal the <span className="glitch-text">beast..</span>
      </h1>
      <h1 ref={secondHeadingRef} className="second-heading text-slate-100 w-[40vw] text-6xl z-10 fixed top-[100vh] right-10">
        Experience the thrill of the <span className="glitch-text">ultimate driving machine </span>
      </h1>
    </div>
  );
};

export default TextLayer;

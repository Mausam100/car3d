import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CgScrollV } from "react-icons/cg";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TextLayer = ({ scrollContainerRef }) => {
  const firstHeadingRef = useRef(null);
  const secondHeadingRef = useRef(null);

  useEffect(() => {
    if (
      scrollContainerRef &&
      firstHeadingRef.current &&
      secondHeadingRef.current
    ) {
      const ctx = gsap.context(() => {
        gsap.to(firstHeadingRef.current, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top top",
            end: "10% top",
            scrub: 2,
          },
        });

        // Second heading animation, placed in the middle of the 599vh scroll
        gsap.fromTo(
          secondHeadingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: scrollContainerRef.current,
              start: "30% center", // Trigger in the middle of the 599vh scroll
              end: "10% center",
              scrub: 2,
            },
          }
        );
      });

      return () => ctx.revert();
    }
  }, [scrollContainerRef]);

  return (
    <div className="top-0 z-10 left-16 w-full bg-transparent p-4">
      <h1
        ref={firstHeadingRef}
        className="first-heading mono-text text-slate-100 w-[40vw] text-5xl fixed opacity-1 top-40 left-10"
      >
        Get ready to reveal the <span className=" font-black">beast..</span>
      </h1>
      <h1
        ref={secondHeadingRef}
        className="second-heading text-slate-100 w-[40vw] text-5xl fixed top-[50vh] right-10" // Appears halfway through the scroll
      >
        Experience the thrill of the{" "}
        <span className="font-black">ultimate driving machine</span>
      </h1>
      <div className="text-xl font-black fixed bottom-10 left-[45%] w-fit text-white flex flex-col items-center justify-center">
        <p>Scroll to Reveal</p>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 0.5, ease: "easeOut", repeat: Infinity }}
        >
          <CgScrollV className="text-white text-3xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default TextLayer;

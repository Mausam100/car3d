import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useSpring } from "framer-motion";
import { CgScrollV } from "react-icons/cg";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [vals, setVals] = useState({
    currentIndex: 18,
    maxIndex: 272,
  });
  const imageObjects = useRef([]);
  const imagesLoaded = useRef(0);
  const CanvasRef = useRef(null);
  const parentDivRef = useRef(null);

  useEffect(() => {
    preloadImages();
  }, []); // Added an empty dependency array to prevent re-render loops

  const preloadImages = () => {
    for (let i = 0; i <= vals.maxIndex; i++) {
      const imageUrl = `./car/car_${i.toString().padStart(3, "0")}.jpg`;
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        imagesLoaded.current++;
        if (imagesLoaded.current === vals.maxIndex) {
          loadImage(vals.currentIndex);
        }
      };
      imageObjects.current.push(img);
    }
  };

  const loadImage = (index) => {
    if (index >= 0 && index <= vals.maxIndex) {
      const img = imageObjects.current[index];
      const canvas = CanvasRef.current;
      if (canvas && img) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          const scaleX = canvas.width / img.width;
          const scaleY = canvas.height / img.height;
          const scale = Math.max(scaleX, scaleY);

          const newWidth = img.width * scale;
          const newHeight = img.height * scale;

          const offsetX = (canvas.width - newWidth) / 2;
          const offsetY = (canvas.height - newHeight) / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

          setVals((prevVals) => ({
            ...prevVals,
            currentIndex: index,
          }));
        }
      }
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentDivRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 3,
      },
    });

    tl.to(vals, {
      currentIndex: vals.maxIndex,
      onUpdate: () => {
        loadImage(Math.floor(vals.currentIndex));
      },
    });
  });

  useGSAP(() => {
    gsap.to(CanvasRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: parentDivRef.current,
        start: "center center", // Adjust for earlier fade-out
        end: "bottom top",
        scrub: 2,
      },
    });
  });

  return (
    <div className="w-full bg-zinc-900">
      <div id="parentDiv" ref={parentDivRef} className="w-full -z-50 h-[599vh]">
        <div className="sticky top-0 left-0">
          <canvas ref={CanvasRef} className="w-full"></canvas>
        </div>
      </div>
      <motion.div
        className="progress-bar fixed bottom-0 left-0 w-full h-1 bg-white transform origin-left"
        style={{ scaleX }}
      ></motion.div>
      <div
        ref={(el) => {
          if (el) {
            gsap.to(el, {
              opacity: 0,
              y: -50,
              scrollTrigger: {
                trigger: parentDivRef.current,
                start: "top top",
                end: "5% top",
                scrub: 2,
              },
            });
          }
        }}
        className=" text-xl fixed bottom-10 left-[45%] w-fit text-white flex flex-col items-center justify-center"
      >
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

export default Landing;

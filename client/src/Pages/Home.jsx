import React, { useContext, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import hiringPortal from '../Assets/hiring-portal.png';
import { ThemeContext } from '../ThemeContext';
import { gsap } from 'gsap';

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const charsRef = useRef([]);
  const imgRef = useRef(null);
  const imgContainerRef = useRef(null);
  const buttonRef = useRef(null);
  const isAnimating = useRef(false);

  /* -------------------------------------------------
     1. Split text into <span> characters
  ------------------------------------------------- */
  useEffect(() => {
    const title = titleRef.current;
    const text = "Join Grotify Careers";

    title.innerHTML = text
      .split("")
      .map((ch) => `<span class="inline-block">${ch === " " ? "&nbsp;" : ch}</span>`)
      .join("");

    charsRef.current = title.querySelectorAll("span");
  }, []);

  /* -------------------------------------------------
     2. Hover: Move letters based on cursor direction
  ------------------------------------------------- */
  const createHoverTl = useCallback(() => {
    const title = titleRef.current;
    const chars = charsRef.current;

    const onMove = (e) => {
      const rect = title.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;

      chars.forEach((char, i) => {
        const charRect = char.getBoundingClientRect();
        const charCenter = charRect.left + charRect.width / 2 - rect.left;
        const direction = mouseX > charCenter ? -10 : 10;

        gsap.to(char, {
          x: direction,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    };

    const onLeave = () => {
      gsap.to(chars, {
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    title.addEventListener("mousemove", onMove);
    title.addEventListener("mouseleave", onLeave);

    return () => {
      title.removeEventListener("mousemove", onMove);
      title.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* -------------------------------------------------
     3. Click: Explode → Reassemble
  ------------------------------------------------- */
  const explodeAndReassemble = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const chars = charsRef.current;
    const tl = gsap.timeline({
      onComplete: () => (isAnimating.current = false),
    });

    tl.to(chars, {
      opacity: 0,
      scale: 0,
      x: () => gsap.utils.random(-180, 180),
      y: () => gsap.utils.random(-180, 180),
      rotation: () => gsap.utils.random(-360, 360),
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.02,
    }, 0);

    tl.to(chars, {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.7,
      ease: "back.out(1.7)",
      stagger: 0.03,
    }, 0.4);
  };

  /* -------------------------------------------------
     4. Image 3D Tilt + Glow
  ------------------------------------------------- */
  const setupImageTilt = useCallback(() => {
    const container = imgContainerRef.current;
    const img = imgRef.current;

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotY = ((x - cx) / cx) * 15;
      const rotX = ((cy - y) / cy) * 15;

      gsap.to(container, {
        rotationY: rotY,
        rotationX: rotX,
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(img, {
        boxShadow: isDarkMode
          ? "0 25px 50px rgba(34,197,94,.7), 0 0 30px rgba(34,197,94,.4)"
          : "0 25px 50px rgba(34,197,94,.4), 0 0 20px rgba(34,197,94,.3)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(container, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.6, ease: "power2.out" });
      gsap.to(img, { boxShadow: "0 10px 20px rgba(0,0,0,.2)", duration: 0.4, ease: "power2.out" });
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [isDarkMode]);

  /* -------------------------------------------------
     5. Button Navigation
  ------------------------------------------------- */
  const setupButton = useCallback(() => {
    const btn = buttonRef.current;
    const onClick = (e) => {
      e.preventDefault();
      navigate('/dashboard');
      // Alternative without React Router:
      // window.location.href = '/dashboard';
    };

    btn.addEventListener("click", onClick);
    return () => btn.removeEventListener("click", onClick);
  }, [navigate]);

  /* -------------------------------------------------
     6. Main useEffect – Connect Everything
  ------------------------------------------------- */
  useEffect(() => {
    const cleanupHover = createHoverTl();
    const cleanupImg = setupImageTilt();
    const cleanupBtn = setupButton();

    const title = titleRef.current;
    title.addEventListener("click", explodeAndReassemble);

    return () => {
      title.removeEventListener("click", explodeAndReassemble);
      cleanupHover();
      cleanupImg();
      cleanupBtn();
    };
  }, [createHoverTl, setupImageTilt, setupButton]);

  return (
    <div className="h-screen w-full overflow-hidden">
      <section
        id="home"
        className={`h-full w-full flex items-center justify-center ${
          isDarkMode
            ? "bg-gradient-to-br from-green-800 to-blue-800"
            : "bg-gradient-to-br from-green-100 to-blue-100"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center h-full">
          {/* LEFT: TEXT */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1
              ref={titleRef}
              className={`text-4xl md:text-6xl font-extrabold ${
                isDarkMode ? "text-white" : "text-gray-800"
              } mb-4 select-none cursor-pointer`}
              style={{ perspective: "1000px" }}
            >
              {/* Text injected via JS */}
            </h1>

            <p
              className={`text-lg md:text-xl ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-6`}
            >
              Discover exciting career opportunities at Grotify and be part of our mission
              to revolutionize the grocery industry!
            </p>

            {/* BUTTON */}
            <button
              ref={buttonRef}
              className={`relative px-8 py-3 rounded-lg font-semibold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                isDarkMode
                  ? "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400"
              } border border-transparent hover:border-gray-300 shadow-lg`}
            >
              Dashboard
            </button>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="md:w-1/2 flex justify-center">
            <div
              ref={imgContainerRef}
              className="relative w-full max-w-md h-80 md:h-96 rounded-lg overflow-hidden cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                ref={imgRef}
                src={hiringPortal}
                alt="Grotify Careers Portal"
                className="w-full h-full object-cover"
                style={{ boxShadow: "0 10px 20px rgba(0,0,0,.2)" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
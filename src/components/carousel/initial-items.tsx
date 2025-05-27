"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion, useMotionValue, useTransform } from "framer-motion";

import { SlideData } from "@/interface/hero";
import { fixUrl } from "@/lib/utils";

export const HeroCarousel = ({ heroSlides }: { heroSlides: SlideData[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const xParallax = useTransform(mouseX, [0, 1], ["-5px", "5px"]);
  const yParallax = useTransform(mouseY, [0, 1], ["-5px", "5px"]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSlideChangeStart = () => {
    setTransitioning(true);
    setParallaxEnabled(true);
  };

  const handleSlideChangeEnd = () => {
    setTimeout(() => {
      setTransitioning(false);
      setParallaxEnabled(false);
    }, 1000);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden bg-black"
    >
      {/* Navigation Arrows */}
      <button
        className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white text-3xl transition-transform duration-300 hover:scale-125"
        aria-label="Previous Slide"
      >
        <FiArrowLeft className="h-8 w-8" />
      </button>
      <button
        className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white text-3xl transition-transform duration-300 hover:scale-125"
        aria-label="Next Slide"
      >
        <FiArrowRight className="h-8 w-8" />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        speed={1000}
        className="h-full"
        onSlideChangeTransitionStart={handleSlideChangeStart}
        onSlideChangeTransitionEnd={handleSlideChangeEnd}
      >
        {heroSlides?.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full overflow-hidden">
              <motion.div
                style={parallaxEnabled ? { x: xParallax, y: yParallax } : {}}
                animate={{ scale: transitioning ? 1.05 : 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src={fixUrl(slide?.image?.file?.url)}
                  alt={slide.headline}
                  fill
                  className="object-cover object-center"
                  priority={idx === 0}
                  quality={100}
                  sizes="100vw"
                  loading="eager"
                />
              </motion.div>

              <div className="absolute inset-0 z-10 flex flex-col justify-end items-center text-center px-4 md:px-12 pb-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                {idx === 0 ? (
                  <>
                    <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">
                      {slide.headline}
                    </h2>
                    <p className="text-white text-base md:text-lg max-w-xl mb-6">
                      {slide.description}
                    </p>
                    <Link
                      href={slide.buttonLink}
                      className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                      {slide.buttonLabel}
                    </Link>
                  </>
                ) : (
                  <>
                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-white text-3xl md:text-5xl font-bold mb-4"
                    >
                      {slide.headline}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.6 }}
                      className="text-white text-base md:text-lg max-w-xl mb-6"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <Link
                        href={slide.buttonLink}
                        className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                      >
                        {slide.buttonLabel}
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

"use client";

import { useEffect, useRef } from "react";
// import { motion } from "framer-motion";
import Image from "next/image";
import { ITestimonials } from "@/interface/testimonials";
import { fixUrl } from "@/lib/utils";

// const AnimatedBackground = () => {
// 	const canvasRef = useRef<HTMLCanvasElement | null>(null);

// 	useEffect(() => {
// 		const canvas = canvasRef.current;
// 		if (!canvas) return;
// 		const ctx = canvas.getContext("2d");
// 		if (!ctx) return;

// 		let width = (canvas.width = canvas.offsetWidth);
// 		let height = (canvas.height = canvas.offsetHeight);

// 		const particles = Array.from({ length: 60 }).map(() => ({
// 			x: Math.random() * width,
// 			y: Math.random() * height,
// 			radius: Math.random() * 12 + 6,
// 			dx: 0,
// 			dy: Math.random() * 0.5 + 0.2,
// 		}));

// 		const draw = () => {
// 			ctx.clearRect(0, 0, width, height);

// 			particles.forEach((p) => {
// 				p.y += p.dy;

// 				if (p.y - p.radius > height) {
// 					p.y = -p.radius;
// 					p.x = Math.random() * width;
// 				}

// 				ctx.beginPath();
// 				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
// 				ctx.fillStyle = "#cbd5e1";
// 				ctx.fill();
// 			});

// 			requestAnimationFrame(draw);
// 		};

// 		draw();

// 		const resize = () => {
// 			width = canvas.width = canvas.offsetWidth;
// 			height = canvas.height = canvas.offsetHeight;
// 		};

// 		window.addEventListener("resize", resize);
// 		return () => window.removeEventListener("resize", resize);
// 	}, []);

// 	return (
// 		<canvas
// 			ref={canvasRef}
// 			className="absolute inset-0 w-full h-full"
// 			style={{ pointerEvents: "none" }}
// 		/>
// 	);
// };

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 40 + 20,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.globalAlpha = 0.6;

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius
        );
        gradient.addColorStop(0, `rgba(203,213,225,${p.opacity})`);
        gradient.addColorStop(1, `rgba(203,213,225,0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", filter: "blur(8px)" }}
    />
  );
};

export const Testimonials = ({
  testimonials
}: {
  testimonials: ITestimonials[];
}) => {
  console.log({ testimonials: testimonials[1] });
  return (
    <section
      id="testimonials"
      className="relative py-2 bg-gray-100 overflow-hidden"
    >
      <AnimatedBackground />

      <div className="relative z-10 mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold text-gray-900">
          What Our Clients Say
        </h2>

        {/* Horizontal Scrollable Testimonials */}
        <div className="overflow-x-auto ">
          <div className="flex space-x-6 px-4 snap-x snap-mandatory overflow-x-scroll scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-xl flex-shrink-0 w-80 bg-white snap-start my-4"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
                    {testimonial?.avatar?.file?.url ? (
                      <Image
                        height={56}
                        width={56}
                        src={fixUrl(testimonial?.avatar?.file?.url)}
                        alt={testimonial.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="bg-gray-300 w-full h-full flex items-center justify-center text-white text-xl font-semibold">
                        {testimonial?.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                  “{testimonial.message}”
                </p>

                <div className="flex space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

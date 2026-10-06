'use client';

import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const aboutImgRef = useRef<HTMLDivElement>(null);

  // Crossfade between the two background images based on scroll position
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let ctx: any;
    (async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;

        gsap.set(aboutImgRef.current, { opacity: 0 });

        ScrollTrigger.create({
          trigger: aboutSection,
          start: 'top 70%',
          end: 'top 20%',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(aboutImgRef.current, { opacity: self.progress });
            gsap.set(heroImgRef.current, { opacity: 1 - self.progress * 0.85 });
          }
        });
      });
    })();

    return () => ctx && ctx.revert();
  }, []);

  // Floating ember particles on canvas
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particleCount = 36;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      speed: Math.random() * 0.4 + 0.15,
      drift: Math.random() * 0.6 - 0.3,
      phase: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.5 + 0.2
    }));

    let rafId: number;
    function draw(time: number) {
      ctx2d!.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        const sway = Math.sin(time / 1800 + p.phase) * 8;
        ctx2d!.beginPath();
        ctx2d!.arc(p.x + sway, p.y, p.r, 0, Math.PI * 2);
        ctx2d!.fillStyle = `rgba(182, 151, 95, ${p.opacity})`;
        ctx2d!.shadowBlur = 6;
        ctx2d!.shadowColor = 'rgba(182, 151, 95, 0.6)';
        ctx2d!.fill();

        p.y -= p.speed;
        p.x += p.drift * 0.1;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
      });
      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-forest">
      <div
        ref={heroImgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/ambient-hero.jpg')" }}
      />
      <div
        ref={aboutImgRef}
        className="absolute inset-0 bg-cover bg-center opacity-0"
        style={{ backgroundImage: "url('/images/ambient-about.jpg')" }}
      />

      {/* dark teal tint to pull the warm photos toward the site palette */}
      <div className="absolute inset-0 bg-forest/55 mix-blend-multiply" />

      {/* drifting mist bands */}
      <div className="ambient-mist absolute inset-0 opacity-30" />

      {/* lantern flicker glows */}
      <div className="lantern lantern-a" />
      <div className="lantern lantern-b" />
      <div className="lantern lantern-c" />

      {/* floating embers */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="grain absolute inset-0" />
      <div className="vignette absolute inset-0" />

      <style jsx>{`
        .ambient-mist {
          background: linear-gradient(
            100deg,
            transparent 0%,
            rgba(242, 237, 224, 0.06) 30%,
            transparent 55%,
            rgba(242, 237, 224, 0.05) 80%,
            transparent 100%
          );
          background-size: 200% 200%;
          animation: mistDrift 28s ease-in-out infinite;
          filter: blur(6px);
        }

        @keyframes mistDrift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .lantern {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            rgba(214, 180, 120, 0.35) 0%,
            rgba(214, 180, 120, 0) 70%
          );
          animation: flicker 5s ease-in-out infinite;
        }

        .lantern-a {
          top: 20%;
          left: 12%;
          animation-delay: 0s;
        }
        .lantern-b {
          top: 55%;
          right: 15%;
          animation-delay: 1.4s;
        }
        .lantern-c {
          bottom: 15%;
          left: 45%;
          animation-delay: 2.7s;
        }

        @keyframes flicker {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(1);
          }
          30% {
            opacity: 0.85;
            transform: scale(1.08);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.96);
          }
          70% {
            opacity: 0.7;
            transform: scale(1.04);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ambient-mist,
          .lantern {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
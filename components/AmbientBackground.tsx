'use client';

import { useEffect, useRef } from 'react';

const SCENES = {
  archway: '/images/scenes/scene-archway.jpg',
  bridge: '/images/scenes/scene-bridge.jpg',
  library: '/images/scenes/scene-library.jpg'
};

// how far (0..1) an element's top edge has travelled between two viewport heights
function progress(id: string, from: number, to: number) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const vh = window.innerHeight;
  const top = el.getBoundingClientRect().top;
  const p = (from * vh - top) / ((from - to) * vh);
  return Math.min(1, Math.max(0, p));
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const libraryRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Scroll: archway zooms + fades into bridge, bridge -> library, library -> bridge
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const a = progress('about', 0.95, 0.35); // archway -> bridge
      const b = progress('worlds', 0.95, 0.35); // bridge -> library
      const c = progress('journal', 0.95, 0.35); // library -> bridge

      const arch = archRef.current;
      const bridge = bridgeRef.current;
      const library = libraryRef.current;
      if (!arch || !bridge || !library) return;

      arch.style.opacity = String(1 - a);
      arch.style.transform = `scale(${1 + a * 0.45})`;

      bridge.style.opacity = String(Math.min(1, a * (1 - b) + c));
      bridge.style.transform = `scale(${1.25 - a * 0.25})`;

      library.style.opacity = String(b * (1 - c));
      library.style.transform = `scale(${1.15 - b * 0.15})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // layout shifts after fonts/images load
    const t = setTimeout(update, 800);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Pointer parallax (desktop): the whole scene drifts opposite the cursor
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * -26;
      ty = (e.clientY / window.innerHeight - 0.5) * -16;
    };
    const loop = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Fireflies / golden motes
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const g = canvas.getContext('2d');
    if (!g) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    const count = w < 700 ? 34 : 70;
    const motes = Array.from({ length: count }).map(() => {
      const depth = Math.random(); // 0 far, 1 near
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + depth * 2.6,
        vy: -(0.08 + depth * 0.45),
        vx: (Math.random() - 0.5) * 0.25,
        phase: Math.random() * Math.PI * 2,
        pulse: 0.6 + Math.random() * 1.4,
        a: 0.35 + depth * 0.55
      };
    });

    let raf = 0;
    const draw = (t: number) => {
      g.clearRect(0, 0, w, h);
      for (const m of motes) {
        const tw = 0.5 + 0.5 * Math.sin(t / 1000 * m.pulse + m.phase);
        const x = m.x + Math.sin(t / 2400 + m.phase) * 14 * m.r * 0.4;
        const alpha = m.a * (0.35 + 0.65 * tw);
        const grad = g.createRadialGradient(x, m.y, 0, x, m.y, m.r * 6);
        grad.addColorStop(0, `rgba(255, 235, 170, ${alpha})`);
        grad.addColorStop(0.3, `rgba(240, 200, 120, ${alpha * 0.45})`);
        grad.addColorStop(1, 'rgba(240, 200, 120, 0)');
        g.fillStyle = grad;
        g.beginPath();
        g.arc(x, m.y, m.r * 6, 0, Math.PI * 2);
        g.fill();
        m.y += m.vy;
        m.x += m.vx;
        if (m.y < -20) {
          m.y = h + 20;
          m.x = Math.random() * w;
        }
        if (m.x < -20) m.x = w + 20;
        if (m.x > w + 20) m.x = -20;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', size);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    };
  }, []);

  return (
    <div className="ambient" aria-hidden="true">
      <div ref={parallaxRef} className="ambient-parallax">
        {/* the three scenes; each has its own slow panoramic drift */}
        <div ref={libraryRef} className="scene" style={{ opacity: 0 }}>
          <div
            className="scene-img drift-b"
            style={{ backgroundImage: `url('${SCENES.library}')` }}
          />
        </div>
        <div ref={bridgeRef} className="scene" style={{ opacity: 0 }}>
          <div
            className="scene-img drift-a"
            style={{ backgroundImage: `url('${SCENES.bridge}')` }}
          />
        </div>
        <div ref={archRef} className="scene">
          <div
            className="scene-img drift-c"
            style={{ backgroundImage: `url('${SCENES.archway}')` }}
          />
        </div>
      </div>

      {/* depth + atmosphere */}
      <div className="rays" />
      <div className="mist mist-1" />
      <div className="mist mist-2" />
      <div className="lantern lantern-a" />
      <div className="lantern lantern-b" />
      <div className="lantern lantern-c" />
      <canvas ref={canvasRef} className="motes" />
      <div className="tint" />
      <div className="vig" />

      <style jsx>{`
        .ambient {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: #0a120f;
          pointer-events: none;
        }
        .ambient-parallax {
          position: absolute;
          inset: -4%;
          will-change: transform;
        }
        .scene {
          position: absolute;
          inset: 0;
          will-change: opacity, transform;
          transform-origin: 50% 55%;
        }
        .scene-img {
          position: absolute;
          inset: 0 -9%;
          background-size: cover;
          background-position: center;
          will-change: transform;
        }
        .drift-a {
          animation: driftA 46s ease-in-out infinite alternate;
        }
        .drift-b {
          animation: driftB 52s ease-in-out infinite alternate;
        }
        .drift-c {
          animation: driftC 40s ease-in-out infinite alternate;
        }
        @keyframes driftA {
          from { transform: translate3d(-3.5%, 0, 0) scale(1.02); }
          to   { transform: translate3d(3.5%, -1%, 0) scale(1.1); }
        }
        @keyframes driftB {
          from { transform: translate3d(3.5%, -1%, 0) scale(1.1); }
          to   { transform: translate3d(-3.5%, 0.5%, 0) scale(1.02); }
        }
        @keyframes driftC {
          from { transform: translate3d(0, 0.5%, 0) scale(1.0); }
          to   { transform: translate3d(0, -1%, 0) scale(1.12); }
        }

        /* soft god-rays that breathe */
        .rays {
          position: absolute;
          inset: -20% -10%;
          background:
            linear-gradient(105deg, transparent 38%, rgba(255, 236, 180, 0.12) 44%, transparent 50%),
            linear-gradient(112deg, transparent 52%, rgba(255, 236, 180, 0.09) 57%, transparent 63%),
            linear-gradient(100deg, transparent 20%, rgba(255, 236, 180, 0.07) 25%, transparent 31%);
          mix-blend-mode: screen;
          animation: raysSway 14s ease-in-out infinite alternate;
        }
        @keyframes raysSway {
          from { transform: translateX(-3%) rotate(-1deg); opacity: 0.55; }
          to   { transform: translateX(3%) rotate(1deg); opacity: 1; }
        }

        .mist {
          position: absolute;
          left: -50%;
          width: 200%;
          height: 45%;
          filter: blur(22px);
          mix-blend-mode: screen;
        }
        .mist-1 {
          bottom: -5%;
          background: radial-gradient(ellipse at 30% 60%, rgba(200, 225, 215, 0.22), transparent 55%),
            radial-gradient(ellipse at 75% 50%, rgba(200, 225, 215, 0.16), transparent 50%);
          animation: mistA 60s linear infinite;
        }
        .mist-2 {
          bottom: 12%;
          opacity: 0.7;
          background: radial-gradient(ellipse at 20% 50%, rgba(220, 235, 225, 0.14), transparent 50%),
            radial-gradient(ellipse at 65% 60%, rgba(220, 235, 225, 0.12), transparent 55%);
          animation: mistB 85s linear infinite;
        }
        @keyframes mistA {
          from { transform: translateX(0); }
          to   { transform: translateX(25%); }
        }
        @keyframes mistB {
          from { transform: translateX(25%); }
          to   { transform: translateX(0); }
        }

        .lantern {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255, 214, 140, 0.34) 0%, rgba(255, 214, 140, 0) 68%);
          mix-blend-mode: screen;
          animation: flicker 5s ease-in-out infinite;
        }
        .lantern-a { top: 18%; left: 8%; }
        .lantern-b { top: 46%; right: 10%; animation-delay: 1.4s; }
        .lantern-c { bottom: 12%; left: 44%; animation-delay: 2.7s; }
        @keyframes flicker {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          30% { opacity: 0.9; transform: scale(1.1); }
          50% { opacity: 0.4; transform: scale(0.95); }
          70% { opacity: 0.75; transform: scale(1.05); }
        }

        .motes {
          position: absolute;
          inset: 0;
        }

        /* keep it moody + readable: a light teal tint and a vignette */
        .tint {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8, 20, 18, 0.28), rgba(6, 14, 12, 0.4));
        }
        .vig {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(3, 8, 6, 0.65) 100%);
        }

        @media (prefers-reduced-motion: reduce) {
          .drift-a, .drift-b, .drift-c, .rays, .mist, .lantern {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
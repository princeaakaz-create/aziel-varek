'use client';

import { useEffect, useRef } from 'react';

const SCENES = {
  archway: '/images/scenes/scene-archway.jpg',
  bridge: '/images/scenes/scene-bridge.jpg',
  library: '/images/scenes/scene-library.jpg'
};

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => {
  const c = clamp(v);
  return c * c * (3 - 2 * c);
};

// how far (0..1) an element's top edge has travelled between two viewport heights
function progress(id: string, from: number, to: number) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const vh = window.innerHeight;
  const top = el.getBoundingClientRect().top;
  return clamp((from * vh - top) / ((from - to) * vh));
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const libraryRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  /*
   * Scroll-driven journey (fully reversible, nothing is "played" — every frame is
   * computed from the scroll position):
   *   hero  -> worlds : the camera pushes through the archway into the kingdom
   *   worlds-> books  : kingdom crossfades into the library
   *   books -> about  : library eases back out to the kingdom
   */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const rawA = progress('worlds', 1.0, 0.1); // gate -> kingdom
      const b = smooth(progress('books', 0.95, 0.35)); // kingdom -> library
      const c = smooth(progress('about', 0.95, 0.35)); // library -> kingdom
      const a = smooth(rawA);

      const arch = archRef.current;
      const bridge = bridgeRef.current;
      const library = libraryRef.current;
      if (!arch || !bridge || !library) return;

      // push in towards the gate, then dissolve while passing through
      arch.style.transform = `scale(${1 + Math.pow(a, 1.7) * 2.1})`;
      arch.style.opacity = String(1 - smooth((a - 0.45) / 0.5));

      // the kingdom rushes up from behind the gate
      const bridgeIn = smooth((a - 0.4) / 0.6);
      bridge.style.opacity = String(Math.min(1, bridgeIn * (1 - b) + c));
      bridge.style.transform = `scale(${1.5 - bridgeIn * 0.5})`;

      library.style.opacity = String(b * (1 - c));
      library.style.transform = `scale(${1.12 - b * 0.12})`;

      // hero copy drifts and fades as you move forward
      const root = document.documentElement;
      root.style.setProperty('--hero-p', String(clamp(rawA * 1.6)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const t = setTimeout(update, 800);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Gentle pointer parallax (desktop only)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * -18;
      ty = (e.clientY / window.innerHeight - 0.5) * -10;
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

  // Very small, slow golden motes
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const g = canvas.getContext('2d');
    if (!g) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const small = w < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
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

    const count = small ? 16 : 34;
    const motes = Array.from({ length: count }).map(() => {
      const depth = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.7 + depth * 1.6,
        vy: -(0.05 + depth * 0.22),
        vx: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
        pulse: 0.5 + Math.random() * 1.0,
        a: 0.3 + depth * 0.4
      };
    });

    let raf = 0;
    const draw = (t: number) => {
      g.clearRect(0, 0, w, h);
      for (const m of motes) {
        const tw = 0.5 + 0.5 * Math.sin((t / 1000) * m.pulse + m.phase);
        const x = m.x + Math.sin(t / 3000 + m.phase) * 10;
        const alpha = m.a * (0.3 + 0.7 * tw);
        const grad = g.createRadialGradient(x, m.y, 0, x, m.y, m.r * 5);
        grad.addColorStop(0, `rgba(255, 236, 180, ${alpha})`);
        grad.addColorStop(0.35, `rgba(240, 205, 130, ${alpha * 0.35})`);
        grad.addColorStop(1, 'rgba(240, 205, 130, 0)');
        g.fillStyle = grad;
        g.beginPath();
        g.arc(x, m.y, m.r * 5, 0, Math.PI * 2);
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
        <div ref={libraryRef} className="scene" style={{ opacity: 0 }}>
          <div className="scene-img drift-b" style={{ backgroundImage: `url('${SCENES.library}')` }} />
        </div>
        <div ref={bridgeRef} className="scene" style={{ opacity: 0 }}>
          <div className="scene-img drift-a" style={{ backgroundImage: `url('${SCENES.bridge}')` }} />
        </div>
        <div ref={archRef} className="scene arch-scene">
          <div className="scene-img drift-c" style={{ backgroundImage: `url('${SCENES.archway}')` }} />
        </div>
      </div>

      <div className="rays" />
      <div className="mist mist-1" />
      <div className="lantern lantern-a" />
      <div className="lantern lantern-b" />
      <canvas ref={canvasRef} className="motes" />
      <div className="tint" />
      <div className="vig" />

      <style jsx>{`
        .ambient {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: #0a100e;
          pointer-events: none;
        }
        .ambient-parallax {
          position: absolute;
          inset: -3%;
          will-change: transform;
        }
        .scene {
          position: absolute;
          inset: 0;
          will-change: opacity, transform;
          transform-origin: 50% 50%;
        }
        .arch-scene {
          transform-origin: 50% 40%;
        }
        .scene-img {
          position: absolute;
          inset: 0 -6%;
          background-size: cover;
          background-position: center;
          will-change: transform;
        }
        .drift-a { animation: driftA 60s ease-in-out infinite alternate; }
        .drift-b { animation: driftB 70s ease-in-out infinite alternate; }
        .drift-c { animation: driftC 55s ease-in-out infinite alternate; }
        @keyframes driftA {
          from { transform: translate3d(-2.5%, 0, 0) scale(1.02); }
          to   { transform: translate3d(2.5%, -0.5%, 0) scale(1.07); }
        }
        @keyframes driftB {
          from { transform: translate3d(2.5%, -0.5%, 0) scale(1.07); }
          to   { transform: translate3d(-2.5%, 0.3%, 0) scale(1.02); }
        }
        @keyframes driftC {
          from { transform: translate3d(0, 0.3%, 0) scale(1); }
          to   { transform: translate3d(0, -0.6%, 0) scale(1.05); }
        }

        .rays {
          position: absolute;
          inset: -20% -10%;
          background:
            linear-gradient(105deg, transparent 40%, rgba(255, 236, 180, 0.07) 45%, transparent 51%),
            linear-gradient(112deg, transparent 54%, rgba(255, 236, 180, 0.05) 58%, transparent 63%);
          mix-blend-mode: screen;
          animation: raysSway 18s ease-in-out infinite alternate;
        }
        @keyframes raysSway {
          from { transform: translateX(-2%) rotate(-1deg); opacity: 0.5; }
          to   { transform: translateX(2%) rotate(1deg); opacity: 1; }
        }

        .mist {
          position: absolute;
          left: -50%;
          width: 200%;
          height: 40%;
          bottom: -4%;
          filter: blur(24px);
          mix-blend-mode: screen;
          background: radial-gradient(ellipse at 30% 60%, rgba(200, 225, 215, 0.14), transparent 55%),
            radial-gradient(ellipse at 75% 50%, rgba(200, 225, 215, 0.1), transparent 50%);
          animation: mistA 90s linear infinite;
        }
        @keyframes mistA {
          from { transform: translateX(0); }
          to   { transform: translateX(25%); }
        }

        .lantern {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255, 214, 140, 0.22) 0%, rgba(255, 214, 140, 0) 68%);
          mix-blend-mode: screen;
          animation: flicker 6s ease-in-out infinite;
        }
        .lantern-a { top: 24%; left: 7%; }
        .lantern-b { top: 52%; right: 9%; animation-delay: 2s; }
        @keyframes flicker {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          35% { opacity: 0.85; transform: scale(1.06); }
          60% { opacity: 0.4; transform: scale(0.97); }
        }

        .motes {
          position: absolute;
          inset: 0;
        }

        .tint {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(13, 31, 26, 0.3), rgba(10, 16, 14, 0.42));
        }
        .vig {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 42%, rgba(4, 8, 6, 0.62) 100%);
        }

        @media (max-width: 768px) {
          .mist, .lantern { display: none; }
          .rays { opacity: 0.6; }
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
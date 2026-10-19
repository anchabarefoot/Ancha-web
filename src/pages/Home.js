import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { calzado } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

// Falling glitter canvas for banner
function GlitterCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 140; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 500),
        size: Math.random() * 2.8 + 0.8,
        speed: Math.random() * 1.0 + 0.25,
        drift: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.75 + 0.25,
        glow: Math.random() > 0.6,
        hue: Math.random() * 28 + 36,
        phase: Math.random() * Math.PI * 2,
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() / 900;
      particles.forEach(p => {
        p.y += p.speed;
        p.x += p.drift;
        if (p.y > canvas.height + 10) { p.y = -10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        ctx.save();
        ctx.globalAlpha = p.opacity * (0.55 + 0.45 * Math.sin(t + p.phase));
        if (p.glow) { ctx.shadowBlur = p.size * 7; ctx.shadowColor = `hsl(${p.hue},90%,72%)`; }
        ctx.fillStyle = `hsl(${p.hue},82%,62%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

// Hero parallax image block
function HeroBlock({ img, bg, label, sub, to, delay = 0 }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  const [hover, setHover] = useState(false);
  const [mpos, setMpos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      setOffset((center - window.innerHeight / 2) * 0.08);
    };
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setMpos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const imgStyle = img
    ? {
        backgroundImage: `url(${img})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#ffffff',
        transform: hover
          ? `scale(1.04) translate(${(mpos.x - 50) * -0.03}%, ${(mpos.y - 50) * -0.03 + offset * 0.2}px)`
          : `scale(1.0) translateY(${offset * 0.5}px)`,
      }
    : {
        background: bg,
        transform: hover
          ? `scale(1.04) translate(${(mpos.x - 50) * -0.03}%, ${(mpos.y - 50) * -0.03 + offset * 0.2}px)`
          : `scale(1.0) translateY(${offset * 0.5}px)`,
      };

  return (
    <Link
      to={to}
      className="hero-block"
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMove}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="hero-block__img" style={imgStyle} />
      <div className="hero-block__over">
        <p className="hero-block__sub">{sub}</p>
        <h2 className="hero-block__label">{label}</h2>
        <span className="hero-block__cta">Ver modelo</span>
      </div>
    </Link>
  );
}

export default function Home() {
  const newCalzado = calzado;

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="home-hero" style={{ backgroundImage: 'url(/images/maiten-natural.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <img src="/images/logo-ancha.png" alt="anCHA" className="home-hero__logo-img" />
        <div className="home-hero__eyebrow">Otoño · Invierno 2025</div>
        <h1 className="home-hero__title">
          VIVI anCHA
        </h1>
        <p className="home-hero__body">
          anCHA nace de un encuentro magnético, casi ineludible.<br />
          De una forma compartida de transitar la vida: con naturalidad, ligereza y libertad.
        </p>
      </section>

      {/* ── EDITORIAL BLOCKS ── */}
      <section className="home-blocks container">
        <HeroBlock
          img="/images/maiten-natural.jpg"
          bg="linear-gradient(145deg, #d4c4b0 0%, #b8a070 100%)"
          label="Maitén"
          sub="Náutico · Cuero curtido"
          to="/maiten"
          delay={0}
        />
        <HeroBlock
          img="/images/calden-natural.jpg"
          bg="linear-gradient(145deg, #c8b8a8 0%, #9a8070 60%, #7a6858 100%)"
          label="Caldén"
          sub="Acordonado · Cuero curtido"
          to="/calden"
          delay={80}
        />
        <HeroBlock
          img="/images/mara-azul.jpg"
          bg="linear-gradient(145deg, #e0d4c4 0%, #c0a888 100%)"
          label="Mara"
          sub="Alpargata · anCHA"
          to="/mara"
          delay={160}
        />
      </section>

      {/* ── STRIP MARQUEE ── */}
      <div className="home-strip" aria-hidden>
        {Array(6).fill('anCHA · Barefoot · Industria Argentina · ').map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>

      {/* ── NEW CALZADO ── */}
      <section className="home-section">
        <div className="home-section__head container">
          <div>
            <p className="home-section__eye">Nuevos ingresos</p>
            <h2 className="home-section__title">Calzado</h2>
          </div>
          <Link to="/maiten" className="home-section__all">Ver todo →</Link>
        </div>
        <div className="home-grid home-grid--3 container">
          {newCalzado.map((p, i) => (
            <ProductCard key={p.id} product={p} size={i === 0 ? 'tall' : 'normal'} />
          ))}
        </div>
      </section>

      {/* ── BANNER EDITORIAL ── */}
      <section className="home-banner">
        <div className="home-banner__img">
          <GlitterCanvas />
          <div className="home-banner__txt">
            <p className="home-banner__eye">anCHA</p>
            <h2>Aceptando lo que viene,<br />dando espacio a cada forma</h2>
            <p>Sin forzar. Sin apretar. Sin encajar. anCHA nace de una forma compartida de transitar la vida: con naturalidad, ligereza y libertad.</p>
            <Link to="/vivi-ancha" className="home-banner__btn">VIVI anCHA</Link>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="home-pillars container">
        {[
          { num: '01', title: 'Diseño desde la base', body: 'Inyección de TR', img: '/images/pillar-bases.png', sepia: true },
          { num: '02', title: 'Producción y aparado', body: 'Cada pieza construida por artesanos en Buenos Aires.', img: '/images/pillar-aparado.jpg', sepia: true },
          { num: '03', title: 'Venta final y producción de marcas', body: '', img: '/images/pillar-caja.jpg', sepia: true },
        ].map(p => (
          <div key={p.num} className="pillar">
            {p.img && (
              <div className="pillar__img-wrap">
                <img src={p.img} alt={p.title} className={`pillar__img${p.sepia ? ' pillar__img--sepia' : ''}`} />
              </div>
            )}
            <span className="pillar__num">{p.num}</span>
            <h3 className="pillar__title">{p.title}</h3>
            <p className="pillar__body">{p.body}</p>
          </div>
        ))}
      </section>

      {/* ── FOOTER ── */}
      <footer className="home-footer">
        <div className="home-footer__inner container">
          <div className="home-footer__brand">
            <img src="/images/logo-ancha.png" alt="anCHA" className="home-footer__isologo" />
            <p>viviancha.ar@gmail.com<br />11 3297 7252</p>
          </div>
          <div className="home-footer__links">
            <Link to="/">VIVI anCHA</Link>
            <Link to="/maiten">Maitén</Link>
            <Link to="/manso">Manso</Link>
            <Link to="/mara">Mara</Link>
            <Link to="/calden">Caldén</Link>
            <Link to="/bacan">Bacán</Link>
            <Link to="/zonda">Zonda</Link>
            <Link to="/anchitas">Anchitas</Link>
            <Link to="/cambios">Cambios y devoluciones</Link>
          </div>
          <div className="home-footer__social">
            <a href="https://instagram.com/viviancha" target="_blank" rel="noreferrer">@viviancha</a>
          </div>
        </div>
        <div className="home-footer__copy container">
          <p>© {new Date().getFullYear()} anCHA</p>
          <p>Diseño y fabricación local</p>
        </div>
      </footer>
    </div>
  );
}

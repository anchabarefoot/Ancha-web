import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { calzado } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: hover
          ? `scale(1.07) translate(${(mpos.x - 50) * -0.05}%, ${(mpos.y - 50) * -0.05 + offset * 0.3}px)`
          : `scale(1.02) translateY(${offset}px)`,
      }
    : {
        background: bg,
        transform: hover
          ? `scale(1.07) translate(${(mpos.x - 50) * -0.05}%, ${(mpos.y - 50) * -0.05 + offset * 0.3}px)`
          : `scale(1.02) translateY(${offset}px)`,
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
  const newCalzado = calzado.slice(0, 4);

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="home-hero" style={{ backgroundImage: 'url(/images/maiten-natural.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="home-hero__stacked-logo">
          <span className="hero-logo-an">an</span>
          <span className="hero-logo-cha">CHA</span>
        </div>
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
        {Array(6).fill('anCHA · Hecho a mano en Argentina · ').map((t, i) => (
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
        <div className="home-grid home-grid--4 container">
          {newCalzado.map((p, i) => (
            <ProductCard key={p.id} product={p} size={i === 0 ? 'tall' : 'normal'} />
          ))}
        </div>
      </section>

      {/* ── BANNER EDITORIAL ── */}
      <section className="home-banner">
        <div className="home-banner__img" style={{ background: 'linear-gradient(120deg, #2a2018 0%, #4a3828 60%, #3a2818 100%)' }}>
          <div className="home-banner__txt">
            <p className="home-banner__eye">anCHA · Caseros, Bs. As.</p>
            <h2>Aceptando lo que viene,<br />dando espacio a cada forma</h2>
            <p>Sin forzar. Sin apretar. Sin encajar. anCHA nace de una forma compartida de transitar la vida: con naturalidad, ligereza y libertad.</p>
            <Link to="/vivi-ancha" className="home-banner__btn">VIVI anCHA</Link>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="home-pillars container">
        {[
          { num: '01', title: 'Hecho a mano', body: 'Cada pieza construida por artesanos en Buenos Aires.' },
          { num: '02', title: 'Materiales nobles', body: 'Cuero natural curtido al vegetal. Fibras locales seleccionadas.' },
          { num: '03', title: 'Sin talles imposibles', body: 'Del 35 al 46 en calzado. Del 26 al 36 en Anchitas.' },
        ].map(p => (
          <div key={p.num} className="pillar">
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
            <img src="/images/isologo.jpg" alt="anCHA" className="home-footer__isologo" />
            <p>Caseros, Bs. As.<br />viviancha.ar@gmail.com<br />11 3297 7252</p>
          </div>
          <div className="home-footer__links">
            <Link to="/">VIVI anCHA</Link>
            <Link to="/maiten">Maitén</Link>
            <Link to="/mara">Mara</Link>
            <Link to="/calden">Caldén</Link>
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

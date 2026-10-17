import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const LINKS = [
  { to: '/vivi-ancha',  label: 'Vivi anCHA' },
  { to: '/maiten',      label: 'Maitén' },
  { to: '/mara',        label: 'Mara' },
  { to: '/calden',      label: 'Caldén' },
  { to: '/zonda',       label: 'Zonda' },
  { to: '/anchitas',    label: 'Anchitas' },
  { to: '/cambios',     label: 'Cambios' },
  { to: '/gift-card',   label: 'Gift Card' },
];

export default function Navbar() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const indicatorRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  // Slide indicator under active link
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;
    const active = navRef.current.querySelector('.nav-link--active');
    if (!active) { indicatorRef.current.style.opacity = '0'; return; }
    const rect = active.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    indicatorRef.current.style.opacity = '1';
    indicatorRef.current.style.width = rect.width + 'px';
    indicatorRef.current.style.transform = `translateX(${rect.left - navRect.left}px)`;
  }, [location]);

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  return (
    <header className={`navbar ${transparent ? 'navbar--top' : 'navbar--scrolled'}`}>
      <div className="navbar__inner container">
        {/* Burger */}
        <button className="navbar__burger" onClick={() => setMenuOpen(v => !v)} aria-label="Menú">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>

        {/* Logo */}
        <Link to="/" className="navbar__logo">anCHA</Link>

        {/* Desktop nav */}
        <nav className="navbar__nav" ref={navRef}>
          {LINKS.map(l => (
            <Link
              key={l.label}
              to={l.to}
              className={`nav-link ${location.pathname === l.to ? 'nav-link--active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="nav-indicator" ref={indicatorRef} />
        </nav>

        {/* Cart */}
        <Link to="/carrito" className="navbar__cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {count > 0 && <span className="navbar__badge">{count}</span>}
        </Link>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${menuOpen ? 'open' : ''}`}>
        {LINKS.map(l => (
          <Link key={l.label} to={l.to} className="drawer-link">{l.label}</Link>
        ))}
        <Link to="/carrito" className="drawer-link">Carrito {count > 0 && `(${count})`}</Link>
      </div>
    </header>
  );
}

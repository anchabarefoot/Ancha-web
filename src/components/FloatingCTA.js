import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FloatingCTA.css';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <Link to="/maiten" className={`floating-cta ${visible ? 'floating-cta--visible' : ''}`}>
      Comprá ahora
    </Link>
  );
}

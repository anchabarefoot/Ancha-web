import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { COLORS, formatPrice } from '../data/products';
import BottomSheet from './BottomSheet';
import './ProductCard.css';

export default function ProductCard({ product, size = 'normal' }) {
  const { add } = useCart();
  const [imgIndex, setImgIndex] = useState(0);
  const [showSizes, setShowSizes] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [added, setAdded] = useState(false);
  const [hover, setHover] = useState(false);
  const isTouch = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [selectedColor] = useState(null);
  const cardRef = useRef(null);
  const timerRef = useRef(null);

  const images = product.images || [];
  const hasImages = images.length > 0;

  useEffect(() => {
    if (hover && images.length > 1) {
      timerRef.current = setInterval(() => {
        setImgIndex(i => (i + 1) % images.length);
      }, 900);
    } else {
      clearInterval(timerRef.current);
      if (!hover) setImgIndex(0);
    }
    return () => clearInterval(timerRef.current);
  }, [hover, images.length]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleAdd = (sz) => {
    add({ id: product.id, name: product.name, price: product.price, size: sz, color: selectedColor });
    setAdded(true);
    setShowSizes(false);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuickTap = (e) => {
    e.preventDefault();
    if (isTouch.current) {
      setShowSheet(true);
    } else {
      setShowSizes(true);
    }
  };

  const productPath = `/${product.id}`;

  return (
    <article
      className={`pcard pcard--${size} ${hover ? 'pcard--hovered' : ''}`}
      ref={cardRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setShowSizes(false); }}
      onMouseMove={handleMouseMove}
    >
      <Link to={productPath} className="pcard__img-wrap">
        {hasImages ? (
          <>
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={product.name}
                className={`pcard__photo ${i === imgIndex ? 'visible' : ''}`}
              />
            ))}
            {images.length > 1 && (
              <div className="pcard__dots">
                {images.map((_, i) => (
                  <span key={i} className={`pcard__dot ${i === imgIndex ? 'active' : ''}`} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div
            className="pcard__img"
            style={{
              background: `linear-gradient(135deg, ${product.color1} 0%, ${product.color2} 100%)`,
              transform: hover
                ? `scale(1.08) translate(${(pos.x - 50) * -0.06}%, ${(pos.y - 50) * -0.06}%)`
                : 'scale(1) translate(0,0)',
            }}
          >
            <span className="pcard__mono">{product.name.charAt(0)}</span>
          </div>
        )}

        {product.tag && <span className="pcard__tag">{product.tag}</span>}

        <div className={`pcard__overlay ${showSizes || hover ? 'visible' : ''}`}>
          {!showSizes ? (
            <button className="pcard__quick" onClick={handleQuickTap}>
              Seleccionar talle
            </button>
          ) : (
            <div className="pcard__sizes">
              {product.sizes.map(s => (
                <button
                  key={s}
                  className="pcard__sz"
                  onClick={(e) => { e.preventDefault(); handleAdd(s); }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="pcard__info">
        <div>
          <p className="pcard__sub">{product.sub}</p>
          <h3 className="pcard__name">{product.name}</h3>
          {product.colors && (
            <div className="pcard__swatches">
              {product.colors.map(c => (
                <span
                  key={c}
                  className="pcard__swatch"
                  style={{ background: COLORS[c]?.hex || '#ccc' }}
                  title={COLORS[c]?.label || c}
                />
              ))}
            </div>
          )}
        </div>
        <p className={`pcard__price ${added ? 'added' : ''}`}>
          {added ? '✓ Agregado' : formatPrice(product.price)}
        </p>
      </div>

      {showSheet && (
        <BottomSheet product={product} onClose={() => setShowSheet(false)} />
      )}
    </article>
  );
}

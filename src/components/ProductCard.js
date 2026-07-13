import React, { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './ProductCard.css';

export default function ProductCard({ product, size = 'normal' }) {
  const { add } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizes, setShowSizes] = useState(false);
  const [added, setAdded] = useState(false);
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  const handleAdd = (sz) => {
    add({ id: product.id, name: product.name, price: product.price, size: sz, color: product.color1 });
    setAdded(true);
    setShowSizes(false);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article
      className={`pcard pcard--${size} ${hover ? 'pcard--hovered' : ''}`}
      ref={cardRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setShowSizes(false); }}
      onMouseMove={handleMouseMove}
    >
      {/* Image with parallax pan */}
      <div className="pcard__img-wrap">
        <div
          className="pcard__img"
          style={{
            background: `linear-gradient(135deg, ${product.color1} 0%, ${product.color2} 100%)`,
            transform: hover
              ? `scale(1.08) translate(${(pos.x - 50) * -0.06}%, ${(pos.y - 50) * -0.06}%)`
              : 'scale(1) translate(0,0)',
          }}
        >
          {/* Monogram placeholder */}
          <span className="pcard__mono">{product.name.charAt(0)}</span>
        </div>

        {product.tag && <span className="pcard__tag">{product.tag}</span>}

        {/* Quick add overlay */}
        <div className={`pcard__overlay ${showSizes || hover ? 'visible' : ''}`}>
          {!showSizes ? (
            <button className="pcard__quick" onClick={() => setShowSizes(true)}>
              Seleccionar talle
            </button>
          ) : (
            <div className="pcard__sizes">
              {product.sizes.map(s => (
                <button
                  key={s}
                  className={`pcard__sz ${selectedSize === s ? 'active' : ''}`}
                  onClick={() => handleAdd(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="pcard__info">
        <div>
          <p className="pcard__sub">{product.sub}</p>
          <h3 className="pcard__name">{product.name}</h3>
        </div>
        <p className={`pcard__price ${added ? 'added' : ''}`}>
          {added ? '✓ Agregado' : formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}

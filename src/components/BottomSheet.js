import React, { useEffect, useRef } from 'react';
import { COLORS, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import './BottomSheet.css';

export default function BottomSheet({ product, onClose }) {
  const { add } = useCart();
  const sheetRef = useRef(null);
  const startY = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // drag-to-close
  const onTouchStart = (e) => { startY.current = e.touches[0].clientY; };
  const onTouchEnd = (e) => {
    if (startY.current !== null && e.changedTouches[0].clientY - startY.current > 60) onClose();
    startY.current = null;
  };

  const handleAdd = (sz) => {
    add({ id: product.id, name: product.name, price: product.price, size: sz });
    onClose();
  };

  if (!product) return null;

  const img = product.images?.[0];

  return (
    <>
      <div className="bs-backdrop" onClick={onClose} />
      <div
        className="bs"
        ref={sheetRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="bs__handle" />

        <div className="bs__product">
          {img && (
            <div className="bs__img-wrap">
              <img src={img} alt={product.name} className="bs__img" />
            </div>
          )}
          <div className="bs__meta">
            <p className="bs__sub">{product.sub}</p>
            <h2 className="bs__name">{product.name}</h2>
            <p className="bs__price">{formatPrice(product.price)}</p>
            {product.colors && (
              <div className="bs__swatches">
                {product.colors.map(c => (
                  <span
                    key={c}
                    className="bs__swatch"
                    style={{ background: COLORS[c]?.hex || '#ccc' }}
                    title={COLORS[c]?.label || c}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="bs__label">Elegí tu talle</p>
        <div className="bs__sizes">
          {product.sizes.map(s => (
            <button key={s} className="bs__sz" onClick={() => handleAdd(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

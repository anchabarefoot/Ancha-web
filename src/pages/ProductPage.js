import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { COLORS, formatPrice } from '../data/products';
import './ProductPage.css';

export default function ProductPage({ product }) {
  const { add } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [activeColor, setActiveColor] = useState(product.colors?.[0] || null);
  const [activeSize, setActiveSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const images = (product.colorImages?.[activeColor] || product.images || []);
  const displayImages = images.length > 0 ? images : product.images || [];

  const handleAdd = () => {
    if (!activeSize) { setSizeError(true); return; }
    add({ id: product.id, name: product.name, price: product.price, size: activeSize, color: activeColor });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="product-page container">
      {/* Gallery */}
      <div className="pp-gallery">
        <div className="pp-main-img">
          {displayImages.length > 0 ? (
            <img src={displayImages[activeImg]} alt={product.name} />
          ) : (
            <div className="pp-placeholder" style={{ background: `linear-gradient(135deg, ${product.color1} 0%, ${product.color2} 100%)` }}>
              <span>{product.name.charAt(0)}</span>
            </div>
          )}
        </div>
        {displayImages.length > 1 && (
          <div className="pp-thumbs">
            {displayImages.map((src, i) => (
              <button key={i} className={`pp-thumb ${i === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pp-info">
        <p className="pp-sub">{product.sub}</p>
        <h1 className="pp-name">{product.name}</h1>
        <p className="pp-price">{formatPrice(product.price)}</p>
        <p className="pp-desc">{product.description}</p>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="pp-section">
            <p className="pp-label">
              Color: <strong>{COLORS[activeColor]?.label || activeColor}</strong>
            </p>
            <div className="pp-colors">
              {product.colors.map(c => (
                <button
                  key={c}
                  className={`pp-color ${activeColor === c ? 'active' : ''}`}
                  style={{ background: COLORS[c]?.hex || '#ccc' }}
                  title={COLORS[c]?.label || c}
                  onClick={() => { setActiveColor(c); setActiveImg(0); }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        <div className="pp-section">
          <p className={`pp-label ${sizeError ? 'error' : ''}`}>
            {sizeError ? 'Seleccioná un talle' : 'Talle'}
          </p>
          <div className="pp-sizes">
            {product.sizes.map(s => (
              <button
                key={s}
                className={`pp-size ${activeSize === s ? 'active' : ''}`}
                onClick={() => { setActiveSize(s); setSizeError(false); }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button className={`pp-add ${added ? 'added' : ''}`} onClick={handleAdd}>
          {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
        </button>

        {/* Size guide */}
        <div className="pp-sizeguide">
          <p className="pp-sizeguide__title">Guía de talles</p>
          <table className="pp-sizeguide__table">
            <thead>
              <tr><th>Talle</th><th>CM</th></tr>
            </thead>
            <tbody>
              <tr><td>35/36</td><td>22.5 – 23.5</td></tr>
              <tr><td>37/38</td><td>24 – 25</td></tr>
              <tr><td>39/40</td><td>25.5 – 26.5</td></tr>
              <tr><td>41/42</td><td>27 – 28</td></tr>
              <tr><td>43/44</td><td>28.5 – 29.5</td></tr>
              <tr><td>45/46</td><td>30 – 31</td></tr>
            </tbody>
          </table>
          <p className="pp-sizeguide__note">Medí tu pie en cm desde el talón hasta el dedo más largo.</p>
        </div>
      </div>
    </div>
  );
}

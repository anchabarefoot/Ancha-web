import React, { useState } from 'react';
import { anchitas, COLORS, formatPrice } from '../data/products';
import './Anchitas.css';

function AnchitaCard({ product }) {
  const [activeImg, setActiveImg] = useState(0);
  const imgs = product.images || [];

  return (
    <div className="anchita-card">
      <div className="anchita-card__gallery">
        <div className="anchita-card__main">
          {imgs.length > 0 ? (
            <img src={imgs[activeImg]} alt={product.name} className="anchita-card__photo" />
          ) : (
            <div className="anchita-card__placeholder" style={{ background: `linear-gradient(135deg, ${product.color1} 0%, ${product.color2} 100%)` }}>
              <span>{product.name.charAt(0)}</span>
            </div>
          )}
        </div>
        {imgs.length > 1 && (
          <div className="anchita-card__thumbs">
            {imgs.map((src, i) => (
              <button key={i} className={`anchita-card__thumb ${i === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="anchita-card__info">
        <p className="anchita-card__sub">{product.sub}</p>
        <h2 className="anchita-card__name">{product.name}</h2>
        <p className="anchita-card__desc">{product.description}</p>
        <p className="anchita-card__price">{formatPrice(product.price)}</p>

        <div className="anchita-card__colors">
          {product.colors.map(c => (
            <span
              key={c}
              className="anchita-card__dot"
              style={{ background: COLORS[c]?.hex || '#ccc' }}
              title={COLORS[c]?.label}
            />
          ))}
        </div>

        <div className="anchita-card__sizes">
          {product.sizes.map(s => (
            <span key={s} className="anchita-card__size">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Anchitas() {
  return (
    <div className="anchitas-page">
      <div className="anchitas-hero">
        <div className="container">
          <p className="anchitas-hero__eye">Para los más chicos</p>
          <h1 className="anchitas-hero__title">Anchitas</h1>
          <p className="anchitas-hero__sub">Talles 26 al 36</p>
        </div>
      </div>

      <div className="anchitas-grid container">
        {anchitas.map(p => <AnchitaCard key={p.id} product={p} />)}
      </div>

      <div className="anchitas-sizeguide container">
        <p className="anchitas-sizeguide__title">Guía de talles Anchitas</p>
        <table className="anchitas-sizeguide__table">
          <thead>
            <tr>
              <th>Talle</th>
              <th>CM</th>
              <th>Edad aprox.</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['26/27', '16 – 17', '2-3 años'],
              ['28/29', '17.5 – 18.5', '4-5 años'],
              ['30/31', '19 – 20', '6-7 años'],
              ['32/33', '20.5 – 21.5', '8-9 años'],
              ['34/35', '22 – 22.5', '10-11 años'],
              ['35/36', '22.5 – 23.5', '12+ años'],
            ].map(([t, cm, edad]) => (
              <tr key={t}>
                <td>{t}</td>
                <td>{cm}</td>
                <td>{edad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

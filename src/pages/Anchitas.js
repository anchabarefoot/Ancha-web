import React from 'react';
import { anchitas, COLORS, formatPrice } from '../data/products';
import './ShopPage.css';
import './ProductPage.css';

function AnchitaCard({ product }) {
  return (
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, marginBottom: 32 }}>
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: 4 }}>{product.sub}</p>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, marginBottom: 8 }}>{product.name}</h2>
      <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: 12 }}>{product.description}</p>
      <p style={{ fontSize: '1rem', marginBottom: 10 }}>{formatPrice(product.price)}</p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {product.colors.map(c => (
          <span key={c} style={{ width: 18, height: 18, borderRadius: '50%', background: COLORS[c]?.hex || '#ccc', border: '1px solid rgba(0,0,0,0.1)', display: 'inline-block' }} title={COLORS[c]?.label} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {product.sizes.map(s => (
          <span key={s} style={{ padding: '5px 10px', border: '1px solid var(--border-dark)', fontSize: '0.75rem' }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

export default function Anchitas() {
  return (
    <div className="shop-page">
      <div className="shop-hero">
        <div className="container">
          <p className="shop-eye">Para los más chicos</p>
          <h1 className="shop-title">Anchitas</h1>
          <p className="shop-count">Talles 26 al 36</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 800 }}>
        {anchitas.map(p => <AnchitaCard key={p.id} product={p} />)}

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28 }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Guía de talles Anchitas</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', maxWidth: 320 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '5px 12px 5px 0', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Talle</th>
                <th style={{ textAlign: 'left', padding: '5px 12px 5px 0', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>CM</th>
                <th style={{ textAlign: 'left', padding: '5px 0', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Edad aprox.</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['26/27','16 – 17','2-3 años'],
                ['28/29','17.5 – 18.5','4-5 años'],
                ['30/31','19 – 20','6-7 años'],
                ['32/33','20.5 – 21.5','8-9 años'],
                ['34/35','22 – 22.5','10-11 años'],
                ['35/36','22.5 – 23.5','12+ años'],
              ].map(([t, cm, edad]) => (
                <tr key={t}>
                  <td style={{ padding: '5px 12px 5px 0', borderBottom: '1px solid var(--border)' }}>{t}</td>
                  <td style={{ padding: '5px 12px 5px 0', borderBottom: '1px solid var(--border)' }}>{cm}</td>
                  <td style={{ padding: '5px 0', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>{edad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

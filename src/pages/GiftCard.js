import React from 'react';
import './ShopPage.css';

export default function GiftCard() {
  return (
    <div className="shop-page">
      <div className="shop-hero">
        <div className="container">
          <p className="shop-eye">anCHA</p>
          <h1 className="shop-title">Gift Card</h1>
          <p className="shop-count">Próximamente</p>
        </div>
      </div>
      <div className="container" style={{ padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 480, margin: '0 auto' }}>
          Regalá libertad. Pronto vas a poder regalar una Gift Card de anCHA para que quien quieras elija su pieza favorita.
        </p>
      </div>
    </div>
  );
}

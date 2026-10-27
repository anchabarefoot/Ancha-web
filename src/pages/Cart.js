import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './Cart.css';

const EMAILJS_SERVICE_ID  = 'service_nzpelnk';
const EMAILJS_TEMPLATE_ID = 'template_oaqxvw9';
const EMAILJS_PUBLIC_KEY  = '8nHj4qUv_chBr6Qsz';

function MPLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display:'inline', verticalAlign:'middle', marginRight:6 }}>
      <circle cx="12" cy="12" r="12" fill="#009ee3"/>
      <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Arial" fontWeight="bold">MP</text>
    </svg>
  );
}

export default function Cart() {
  const { items, remove, setQty, clear, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [mpError, setMpError] = useState('');
  const [searchParams] = useSearchParams();
  const pagoStatus = searchParams.get('pago');

  const shipping = total > 80000 ? 0 : 3500;
  const grandTotal = total + shipping;

  const handleMercadoPago = async () => {
    setLoading(true);
    setMpError('');
    try {
      const res = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            id:    i.id,
            name:  `${i.name}${i.color ? ` (${i.color})` : ''} — Talle ${i.size}`,
            color: i.color,
            size:  i.size,
            price: i.price,
            qty:   i.qty,
          })),
          shipping,
        }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        setMpError('No pudimos conectar con Mercado Pago. Intentá de nuevo.');
      }
    } catch {
      setMpError('No pudimos conectar con Mercado Pago. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // ── Regreso de Mercado Pago ──
  const mailSent = useRef(false);
  useEffect(() => {
    if (pagoStatus === 'ok' && items.length > 0 && !mailSent.current) {
      mailSent.current = true;
      const orderId = `ACH-${Math.floor(10000 + Math.random() * 90000)}`;
      const itemsList = items.map(i => `${i.name} (Talle ${i.size}${i.color ? `, ${i.color}` : ''}) x${i.qty} — ${formatPrice(i.price * i.qty)}`).join('\n');
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        order_id: orderId,
        email:    '',
        orders:   itemsList,
        'cost.shipping': shipping ? formatPrice(shipping) : 'Gratis',
        'cost.tax':      '$0',
        'cost.total':    formatPrice(grandTotal),
      }, EMAILJS_PUBLIC_KEY).catch(console.error);
    }
  }, [pagoStatus]); // eslint-disable-line

  if (pagoStatus === 'ok') return (
    <div className="cart-page">
      <div className="cart-success container">
        <div className="cart-success__check">✓</div>
        <h2>¡Pago confirmado!</h2>
        <p>Tu pedido está en preparación. En 24–48 hs hábiles te llegará el seguimiento.</p>
        <p className="cart-success__note">Preparación: 3 a 5 días hábiles.</p>
        <Link to="/" className="cart-btn" onClick={clear}>Seguir comprando</Link>
      </div>
    </div>
  );

  if (pagoStatus === 'pendiente') return (
    <div className="cart-page">
      <div className="cart-success container">
        <div className="cart-success__check" style={{ color: '#C8921A' }}>⏳</div>
        <h2>Pago pendiente</h2>
        <p>Tu pago está siendo procesado. Te avisamos cuando se confirme.</p>
        <Link to="/" className="cart-btn">Volver al inicio</Link>
      </div>
    </div>
  );

  if (pagoStatus === 'error') return (
    <div className="cart-page">
      <div className="cart-success container">
        <div className="cart-success__check" style={{ color: '#c0392b' }}>✗</div>
        <h2>Hubo un problema con el pago</h2>
        <p>Podés intentarlo de nuevo o contactarnos.</p>
        <Link to="/carrito" className="cart-btn">Intentar de nuevo</Link>
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div className="cart-page">
      <div className="cart-empty container">
        <h2>Tu carrito está vacío</h2>
        <p>Todavía no agregaste ningún producto.</p>
        <Link to="/maiten" className="cart-btn">Ver modelos</Link>
      </div>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="cart-head container">
        <h1>Carrito</h1>
        <span>{items.reduce((a, i) => a + i.qty, 0)} productos</span>
      </div>

      <div className="cart-layout container">
        {/* Items */}
        <div className="cart-items">
          {items.map(item => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="cart-row">
              <div className="cart-row__img" style={{ background: item.color || '#e8e0d4' }} />
              <div className="cart-row__info">
                <h3>{item.name}</h3>
                <p>Talle {item.size}{item.color ? ` · ${item.color}` : ''}</p>
              </div>
              <div className="cart-row__right">
                <div className="cart-qty">
                  <button onClick={() => item.qty > 1 ? setQty(item.id, item.size, item.color, item.qty - 1) : remove(item.id, item.size, item.color)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => setQty(item.id, item.size, item.color, item.qty + 1)}>+</button>
                </div>
                <p className="cart-row__price">{formatPrice(item.price * item.qty)}</p>
                <button className="cart-row__del" onClick={() => remove(item.id, item.size, item.color)}>×</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h2>Resumen</h2>
          <div className="cart-summary__lines">
            <div className="line"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
            <div className="line"><span>Envío</span><span>{shipping ? formatPrice(shipping) : 'Gratis'}</span></div>
            {shipping > 0 && <p className="cart-summary__note">Envío gratis superando {formatPrice(80000)}</p>}
            <div className="line line--total"><span>Total</span><span>{formatPrice(grandTotal)}</span></div>
          </div>

          <button
            className="cart-btn cart-btn--mp"
            onClick={handleMercadoPago}
            disabled={loading}
          >
            <MPLogo />
            {loading ? 'Redirigiendo…' : 'Pagar con Mercado Pago'}
          </button>

          {mpError && <p className="cart-mp-error">{mpError}</p>}

          <p className="cart-mp-note">
            Pagá con tarjeta, transferencia o en efectivo. Procesado por Mercado Pago — tus datos están protegidos.
          </p>

          <button className="cart-btn--text" onClick={clear}>Vaciar carrito</button>
        </div>
      </div>
    </div>
  );
}

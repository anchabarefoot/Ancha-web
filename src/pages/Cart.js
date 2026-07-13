import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './Cart.css';

export default function Cart() {
  const { items, remove, setQty, clear, total } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '', province: '', zip: '' });
  const [done, setDone] = useState(false);

  const shipping = total > 80000 ? 0 : 3500;
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  if (done) return (
    <div className="cart-page">
      <div className="cart-success container">
        <div className="cart-success__check">✓</div>
        <h2>¡Pedido confirmado!</h2>
        <p>Te escribimos a <strong>{form.email}</strong> con todos los detalles.</p>
        <p className="cart-success__note">Preparación: 3 a 5 días hábiles.</p>
        <Link to="/" className="cart-btn">Seguir comprando</Link>
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div className="cart-page">
      <div className="cart-empty container">
        <h2>Tu carrito está vacío</h2>
        <p>Todavía no agregaste ningún producto.</p>
        <Link to="/calzado" className="cart-btn">Ver calzado</Link>
        <Link to="/indumentaria" className="cart-btn cart-btn--outline">Ver indumentaria</Link>
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
            <div key={`${item.id}-${item.size}`} className="cart-row">
              <div className="cart-row__img" style={{ background: item.color }} />
              <div className="cart-row__info">
                <h3>{item.name}</h3>
                <p>Talle {item.size}</p>
              </div>
              <div className="cart-row__right">
                <div className="cart-qty">
                  <button onClick={() => item.qty > 1 ? setQty(item.id, item.size, item.qty - 1) : remove(item.id, item.size)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => setQty(item.id, item.size, item.qty + 1)}>+</button>
                </div>
                <p className="cart-row__price">{formatPrice(item.price * item.qty)}</p>
                <button className="cart-row__del" onClick={() => remove(item.id, item.size)}>×</button>
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
            <div className="line line--total"><span>Total</span><span>{formatPrice(total + shipping)}</span></div>
          </div>

          {!checkout ? (
            <button className="cart-btn" onClick={() => setCheckout(true)}>Continuar compra</button>
          ) : (
            <form className="cart-form" onSubmit={e => { e.preventDefault(); setDone(true); clear(); }}>
              <p className="cart-form__title">Datos de envío</p>
              {[
                { k: 'name', l: 'Nombre completo', ph: 'Ana García', t: 'text' },
                { k: 'email', l: 'Email', ph: 'ana@email.com', t: 'email' },
                { k: 'address', l: 'Dirección', ph: 'Av. Corrientes 1234', t: 'text' },
                { k: 'zip', l: 'Código postal', ph: '1414', t: 'text' },
              ].map(({ k, l, ph, t }) => (
                <div className="cart-field" key={k}>
                  <label>{l}</label>
                  <input type={t} required placeholder={ph} value={form[k]} onChange={e => f(k, e.target.value)} />
                </div>
              ))}
              <div className="cart-field">
                <label>Provincia</label>
                <select required value={form.province} onChange={e => f('province', e.target.value)}>
                  <option value="">Seleccionar</option>
                  {['Buenos Aires','CABA','Córdoba','Santa Fe','Mendoza','Tucumán','Salta','Neuquén','Entre Ríos','Corrientes','Misiones','Chaco','Jujuy','Río Negro','Formosa','La Rioja','San Juan','San Luis','Catamarca','La Pampa','Chubut','Santa Cruz','Tierra del Fuego'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <button type="submit" className="cart-btn">Confirmar pedido</button>
              <button type="button" className="cart-btn--text" onClick={() => setCheckout(false)}>← Volver</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

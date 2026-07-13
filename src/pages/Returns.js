import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Returns.css';

const REASONS = [
  'Talle incorrecto',
  'No era lo que esperaba',
  'Defecto de fabricación',
  'Cambio de opinión',
  'Regalo duplicado',
  'Otro',
];

export default function Returns() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ order: '', email: '', name: '', reason: '', comments: '' });
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  if (step === 3) return (
    <div className="returns-page">
      <div className="returns-success container">
        <div className="returns-success__icon">✓</div>
        <p className="returns-success__eyebrow">Solicitud recibida</p>
        <h2>Tu cambio está en camino</h2>
        <p>En las próximas 24 horas hábiles te escribimos a <strong>{form.email}</strong> con las instrucciones para enviar tu paquete.</p>
        <p className="returns-success__note">Número de solicitud: <strong>ACH-{Math.floor(10000 + Math.random() * 90000)}</strong></p>
        <div className="returns-success__actions">
          <Link to="/" className="returns-btn">Volver al inicio</Link>
          <Link to="/calzado" className="returns-btn returns-btn--outline">Seguir comprando</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="returns-page">
      <div className="returns-hero">
        <div className="container">
          <p className="returns-eye">Posventa · anCHA</p>
          <h1 className="returns-title">Portal de cambios</h1>
          <p className="returns-sub">Cambios y devoluciones sin costo dentro de los 30 días de recibido tu pedido.</p>
        </div>
      </div>

      <div className="returns-body container">
        <div className="returns-steps">
          {['Identificá tu pedido', 'Motivo del cambio', 'Confirmación'].map((label, i) => (
            <div key={i} className={`returns-step ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`}>
              <span className="returns-step__num">{step > i + 1 ? '✓' : i + 1}</span>
              <span className="returns-step__label">{label}</span>
            </div>
          ))}
        </div>

        <div className="returns-card">
          {step === 1 && (
            <form onSubmit={e => { e.preventDefault(); setStep(2); }}>
              <h2 className="returns-card__title">Identificá tu pedido</h2>
              <p className="returns-card__desc">Ingresá los datos del pedido que querés cambiar o devolver.</p>
              <div className="returns-fields">
                <div className="returns-field">
                  <label>Número de pedido</label>
                  <input type="text" required placeholder="ACH-XXXXX" value={form.order} onChange={e => f('order', e.target.value)} />
                </div>
                <div className="returns-field">
                  <label>Email de la compra</label>
                  <input type="email" required placeholder="tu@email.com" value={form.email} onChange={e => f('email', e.target.value)} />
                </div>
                <div className="returns-field">
                  <label>Nombre completo</label>
                  <input type="text" required placeholder="Ana García" value={form.name} onChange={e => f('name', e.target.value)} />
                </div>
              </div>
              <button type="submit" className="returns-btn">Continuar →</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={e => { e.preventDefault(); setStep(3); }}>
              <h2 className="returns-card__title">Motivo del cambio</h2>
              <p className="returns-card__desc">Contanos por qué querés hacer el cambio para poder ayudarte mejor.</p>
              <div className="returns-fields">
                <div className="returns-field">
                  <label>Motivo</label>
                  <div className="returns-reasons">
                    {REASONS.map(r => (
                      <button
                        type="button"
                        key={r}
                        className={`returns-reason ${form.reason === r ? 'active' : ''}`}
                        onClick={() => f('reason', r)}
                      >{r}</button>
                    ))}
                  </div>
                </div>
                <div className="returns-field">
                  <label>Comentarios adicionales (opcional)</label>
                  <textarea
                    placeholder="Contanos más detalles si lo necesitás…"
                    value={form.comments}
                    onChange={e => f('comments', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <div className="returns-card__actions">
                <button type="button" className="returns-btn--ghost" onClick={() => setStep(1)}>← Volver</button>
                <button type="submit" className="returns-btn" disabled={!form.reason}>Confirmar solicitud</button>
              </div>
            </form>
          )}
        </div>

        <div className="returns-info">
          <div className="returns-info__block">
            <h3>Política de cambios</h3>
            <ul>
              <li>30 días desde la recepción del pedido</li>
              <li>El producto debe estar sin uso y con etiquetas</li>
              <li>Un cambio por pedido</li>
              <li>Devoluciones con crédito en tienda</li>
            </ul>
          </div>
          <div className="returns-info__block">
            <h3>¿Tenés dudas?</h3>
            <p>Escribinos a <a href="mailto:hola@ancha.com.ar">hola@ancha.com.ar</a> o por Instagram <a href="https://instagram.com/ancha.ar" target="_blank" rel="noreferrer">@ancha.ar</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

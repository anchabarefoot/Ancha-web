import React, { useState, useRef, useEffect } from 'react';
import './GiftCard.css';

const VALUES = [
  { id: 1, amount: 50000,  label: '$50.000' },
  { id: 2, amount: 85000,  label: '$85.000' },
  { id: 3, amount: 150000, label: '$150.000' },
  { id: 4, amount: 200000, label: '$200.000' },
];

function randomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 12 }, (_, i) => (i > 0 && i % 4 === 0 ? '-' : chars[Math.floor(Math.random() * chars.length)])).join('');
}

function drawCard(canvas, { amount, from, to, message, code }) {
  const W = 1200, H = 680;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Background gradient warm
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#2a1e12');
  grad.addColorStop(1, '#3d2b18');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle texture lines
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let y = 0; y < H; y += 24) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Gold border
  ctx.strokeStyle = '#b8922a';
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, W - 56, H - 56);

  // Inner subtle border
  ctx.strokeStyle = 'rgba(184,146,42,0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(38, 38, W - 76, H - 76);

  // anCHA logotype
  ctx.fillStyle = '#b8922a';
  ctx.font = '300 52px "Georgia", serif';
  ctx.letterSpacing = '0.3em';
  ctx.fillText('an', 80, 108);
  ctx.font = '600 52px "Georgia", serif';
  ctx.fillText('CHA', 80 + ctx.measureText('an').width + 2, 108);

  // "Gift Card" label
  ctx.font = '300 16px "Georgia", serif';
  ctx.fillStyle = 'rgba(240,232,210,0.55)';
  ctx.letterSpacing = '0.25em';
  ctx.fillText('GIFT CARD', 82, 138);

  // Value — big
  ctx.font = '200 130px "Georgia", serif';
  ctx.fillStyle = '#f0e8d2';
  ctx.letterSpacing = '0.02em';
  const valLabel = VALUES.find(v => v.amount === amount)?.label || `$${amount.toLocaleString('es-AR')}`;
  ctx.fillText(valLabel, 80, 320);

  // Decorative gold rule
  ctx.strokeStyle = '#b8922a';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(80, 345); ctx.lineTo(520, 345); ctx.stroke();

  // Para / De
  ctx.font = '300 14px "Georgia", serif';
  ctx.fillStyle = 'rgba(240,232,210,0.5)';
  ctx.letterSpacing = '0.2em';
  ctx.fillText('PARA', 80, 390);
  ctx.font = '400 30px "Georgia", serif';
  ctx.fillStyle = '#f0e8d2';
  ctx.letterSpacing = '0.04em';
  ctx.fillText(to || '—', 80, 425);

  ctx.font = '300 14px "Georgia", serif';
  ctx.fillStyle = 'rgba(240,232,210,0.5)';
  ctx.letterSpacing = '0.2em';
  ctx.fillText('DE', 80, 480);
  ctx.font = '400 24px "Georgia", serif';
  ctx.fillStyle = 'rgba(240,232,210,0.8)';
  ctx.letterSpacing = '0.04em';
  ctx.fillText(from || '—', 80, 510);

  // Message
  if (message) {
    ctx.font = 'italic 300 18px "Georgia", serif';
    ctx.fillStyle = 'rgba(240,232,210,0.55)';
    ctx.letterSpacing = '0.01em';
    const words = message.split(' ');
    let line = '', y = 565;
    for (const word of words) {
      const test = line + word + ' ';
      if (ctx.measureText(test).width > 500 && line) { ctx.fillText('"' + line.trim() + '"', 80, y); line = word + ' '; y += 26; }
      else line = test;
    }
    if (line) ctx.fillText('"' + line.trim() + '"', 80, y);
  }

  // Right side — decorative circle
  ctx.beginPath();
  ctx.arc(920, 340, 180, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(184,146,42,0.15)';
  ctx.lineWidth = 60;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(920, 340, 120, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(184,146,42,0.08)';
  ctx.lineWidth = 40;
  ctx.stroke();

  // Code
  ctx.font = '300 13px "Courier New", monospace';
  ctx.fillStyle = 'rgba(240,232,210,0.4)';
  ctx.letterSpacing = '0.15em';
  ctx.fillText('CÓDIGO · ' + code, W - 80 - ctx.measureText('CÓDIGO · ' + code).width, H - 55);

  // Website
  ctx.font = '300 13px "Georgia", serif';
  ctx.fillStyle = 'rgba(184,146,42,0.7)';
  ctx.letterSpacing = '0.12em';
  ctx.fillText('ancha.com.ar', 80, H - 55);
}

export default function GiftCard() {
  const [selected, setSelected] = useState(null);
  const [form, setForm]         = useState({ from: '', to: '', message: '' });
  const [code, setCode]         = useState('');
  const [done, setDone]         = useState(false);
  const canvasRef = useRef(null);

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleGenerate = (e) => {
    e.preventDefault();
    const newCode = randomCode();
    setCode(newCode);
    setDone(true);
  };

  useEffect(() => {
    if (done && canvasRef.current && selected) {
      drawCard(canvasRef.current, { amount: selected, from: form.from, to: form.to, message: form.message, code });
    }
  }, [done, selected, form, code]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `anCHA-gift-card-${code}.png`;
    a.click();
  };

  const handlePrint = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`<html><head><title>anCHA Gift Card</title><style>body{margin:0;background:#fff;}img{max-width:100%;display:block;}@media print{body{margin:0;}}</style></head><body><img src="${url}" /></body></html>`);
      win.document.close();
      win.focus();
      win.print();
    }
  };

  if (done) return (
    <div className="gc-page">
      <div className="gc-done container">
        <p className="gc-done__eye">anCHA · Gift Card</p>
        <h2 className="gc-done__title">¡Lista para regalar!</h2>
        <p className="gc-done__sub">Guardá o imprimí la imagen. El código es único para esta tarjeta.</p>

        <div className="gc-canvas-wrap">
          <canvas ref={canvasRef} className="gc-canvas" />
        </div>

        <p className="gc-done__code">Código: <strong>{code}</strong></p>

        <div className="gc-done__actions">
          <button className="gc-btn" onClick={handleDownload}>Descargar imagen</button>
          <button className="gc-btn gc-btn--outline" onClick={handlePrint}>Imprimir</button>
          <button className="gc-btn--text" onClick={() => { setDone(false); setSelected(null); setForm({ from: '', to: '', message: '' }); }}>
            Crear otra
          </button>
        </div>

        <p className="gc-done__note">
          Para activar la gift card enviá el comprobante de pago a <a href="mailto:viviancha.ar@gmail.com">viviancha.ar@gmail.com</a> junto con el código <strong>{code}</strong>.
        </p>
      </div>
    </div>
  );

  return (
    <div className="gc-page">
      <div className="gc-hero">
        <div className="container">
          <p className="gc-eye">anCHA</p>
          <h1 className="gc-title">Gift Card</h1>
          <p className="gc-sub">Regalá libertad. Que quien querés elija su pieza favorita.</p>
        </div>
      </div>

      <div className="gc-body container">
        {/* Step 1 — Valor */}
        <div className="gc-section">
          <p className="gc-label">1 · Elegí el valor</p>
          <div className="gc-values">
            {VALUES.map(v => (
              <button
                key={v.id}
                className={`gc-val ${selected === v.amount ? 'active' : ''}`}
                onClick={() => setSelected(v.amount)}
              >
                <span className="gc-val__amount">{v.label}</span>
                <span className="gc-val__ars">ARS</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Datos */}
        {selected && (
          <form className="gc-form" onSubmit={handleGenerate}>
            <p className="gc-label">2 · Personalizá la tarjeta</p>

            <div className="gc-row">
              <div className="gc-field">
                <label>Para</label>
                <input
                  type="text"
                  placeholder="Nombre de quien recibe"
                  value={form.to}
                  onChange={e => f('to', e.target.value)}
                  required
                />
              </div>
              <div className="gc-field">
                <label>De parte de</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={form.from}
                  onChange={e => f('from', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="gc-field">
              <label>Mensaje (opcional)</label>
              <textarea
                placeholder="Escribí algo especial…"
                rows={3}
                value={form.message}
                onChange={e => f('message', e.target.value)}
              />
            </div>

            <div className="gc-summary">
              <span>Gift Card</span>
              <strong>{VALUES.find(v => v.amount === selected)?.label} ARS</strong>
            </div>

            <button type="submit" className="gc-btn">
              Generar tarjeta →
            </button>

            <p className="gc-form__note">
              Después de generar la tarjeta vas a poder descargarla o imprimirla. El pago se coordina por separado enviando el comprobante a <a href="mailto:viviancha.ar@gmail.com">viviancha.ar@gmail.com</a>.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

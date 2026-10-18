import React, { useState } from 'react';
import './SizeGuide.css';

const S = 8;

function makePath(cx, yb, L, Wt, Wh) {
  const Lp = L * S, Wtp = Wt * S, Whp = Wh * S;
  const yt = yb - Lp;
  const r = n => +n.toFixed(1);
  return (
    `M${r(cx)},${r(yb)} ` +
    `C${r(cx+Whp/2)},${r(yb)} ${r(cx+Wtp/2)},${r(yb-Lp*.40)} ${r(cx+Wtp/2)},${r(yb-Lp*.55)} ` +
    `C${r(cx+Wtp/2)},${r(yb-Lp*.82)} ${r(cx+Wtp*.30)},${r(yt+Lp*.04)} ${r(cx)},${r(yt)} ` +
    `C${r(cx-Wtp*.30)},${r(yt+Lp*.04)} ${r(cx-Wtp/2)},${r(yb-Lp*.82)} ${r(cx-Wtp/2)},${r(yb-Lp*.55)} ` +
    `C${r(cx-Wtp/2)},${r(yb-Lp*.40)} ${r(cx-Whp/2)},${r(yb)} ${r(cx)},${r(yb)} Z`
  );
}

const GUIDES = {
  barefoot: {
    vw: 140, vh: 280, cx: 72, yb: 272,
    sizes: [
      { label: '46', L: 30.5, Wt: 11.6, Wh: 7.4 },
      { label: '45', L: 30.0, Wt: 11.4, Wh: 7.3 },
      { label: '44', L: 29.3, Wt: 11.1, Wh: 7.1 },
      { label: '43', L: 28.5, Wt: 10.8, Wh: 6.9 },
      { label: '42', L: 27.8, Wt: 10.5, Wh: 6.8 },
      { label: '41', L: 27.2, Wt: 10.3, Wh: 6.7 },
      { label: '40', L: 26.8, Wt: 10.1, Wh: 6.6 },
      { label: '39', L: 26.0, Wt:  9.8, Wh: 6.4 },
      { label: '38', L: 25.4, Wt:  9.7, Wh: 6.3 },
      { label: '37', L: 24.7, Wt:  9.5, Wh: 6.1 },
      { label: '36', L: 24.0, Wt:  9.3, Wh: 6.0 },
      { label: '35', L: 22.7, Wt:  9.1, Wh: 5.8 },
    ],
  },
  zonda: {
    vw: 140, vh: 256, cx: 68, yb: 248,
    sizes: [
      { label: '45/46', L: 28.5, Wt: 10.6, Wh: 8.2 },
      { label: '43/44', L: 27.5, Wt: 10.2, Wh: 8.0 },
      { label: '41/42', L: 26.5, Wt:  9.9, Wh: 7.7 },
      { label: '39/40', L: 25.5, Wt:  9.5, Wh: 7.4 },
      { label: '37/38', L: 24.5, Wt:  9.1, Wh: 7.1 },
      { label: '35/36', L: 23.5, Wt:  8.7, Wh: 6.8 },
    ],
  },
  delta: {
    vw: 140, vh: 268, cx: 68, yb: 260,
    sizes: [
      { label: '45/46', L: 30.4, Wt: 11.3, Wh: 8.8 },
      { label: '43/44', L: 29.2, Wt: 10.9, Wh: 8.4 },
      { label: '41/42', L: 27.9, Wt: 10.4, Wh: 8.1 },
      { label: '39/40', L: 26.7, Wt:  9.9, Wh: 7.7 },
      { label: '37/38', L: 25.4, Wt:  9.4, Wh: 7.3 },
      { label: '35/36', L: 24.2, Wt:  9.0, Wh: 7.0 },
    ],
  },
};

export default function SizeGuide({ type = 'barefoot' }) {
  const [open, setOpen] = useState(false);
  const guide = GUIDES[type] || GUIDES.barefoot;
  const { vw, vh, cx, yb, sizes } = guide;
  const n = sizes.length;

  return (
    <div className="sg">
      <button className="sg__toggle" onClick={() => setOpen(v => !v)}>
        Guía de talles <span className="sg__arrow">{open ? '↑' : '↓'}</span>
      </button>

      {open && (
        <div className="sg__body">
          <p className="sg__note">
            Imprimí al 100% (sin ajustar a página) en hoja oficio y compará con tu pie descalzo sobre la plantilla.
          </p>
          <svg viewBox={`0 0 ${vw} ${vh}`} className="sg__svg" xmlns="http://www.w3.org/2000/svg">
            {sizes.map((sz, i) => {
              const yt = yb - sz.L * S;
              return (
                <g key={sz.label}>
                  <path
                    d={makePath(cx, yb, sz.L, sz.Wt, sz.Wh)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={i === 0 ? 1.4 : 0.8}
                    opacity={0.35 + (n - 1 - i) / (n - 1) * 0.65}
                  />
                  <text
                    x="6" y={yt + 5}
                    fontSize="6.5"
                    fontFamily="'Jost', sans-serif"
                    fontWeight="400"
                    fill="currentColor"
                    opacity="0.65"
                  >
                    {sz.label}
                  </text>
                </g>
              );
            })}
            {/* Ruler */}
            <line x1={vw - 8} y1={yb} x2={vw - 8} y2={yb - 10 * S} stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
            {[0, 5, 10].map(cm => (
              <g key={cm}>
                <line x1={vw - 12} y1={yb - cm * S} x2={vw - 8} y2={yb - cm * S} stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
                <text x={vw - 14} y={yb - cm * S + 2.5} fontSize="5.5" textAnchor="end" fontFamily="'Jost', sans-serif" fill="currentColor" opacity="0.4">{cm}</text>
              </g>
            ))}
            <text x={vw - 8} y={yb - 10 * S - 4} fontSize="5" textAnchor="middle" fontFamily="'Jost', sans-serif" fill="currentColor" opacity="0.35">cm</text>
          </svg>
        </div>
      )}
    </div>
  );
}

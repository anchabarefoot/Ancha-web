import React, { useState } from 'react';
import { indumentaria } from '../data/products';
import ProductCard from '../components/ProductCard';
import './ShopPage.css';

const SUBS = ['Todos', 'Sweaters', 'Camisas', 'Pantalones', 'Vestidos', 'Tops', 'Sacos'];
const SORTS = [
  { v: '', l: 'Destacados' },
  { v: 'asc', l: 'Menor precio' },
  { v: 'desc', l: 'Mayor precio' },
  { v: 'az', l: 'A–Z' },
];

export default function Indumentaria() {
  const [filter, setFilter] = useState('Todos');
  const [sort, setSort] = useState('');

  const items = indumentaria
    .filter(p => filter === 'Todos' || p.sub === filter)
    .sort((a, b) => {
      if (sort === 'asc')  return a.price - b.price;
      if (sort === 'desc') return b.price - a.price;
      if (sort === 'az')   return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <div className="container">
          <p className="shop-eye">Otoño · Invierno 2025</p>
          <h1 className="shop-title">Indumentaria</h1>
          <p className="shop-count">{items.length} piezas</p>
        </div>
      </div>

      <div className="shop-toolbar container">
        <div className="shop-filters">
          {SUBS.map(s => (
            <button
              key={s}
              className={`filter-pill ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >{s}</button>
          ))}
        </div>
        <select className="shop-sort" value={sort} onChange={e => setSort(e.target.value)}>
          {SORTS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
        </select>
      </div>

      <div className="shop-grid container">
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

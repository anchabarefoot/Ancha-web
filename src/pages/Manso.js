import React from 'react';
import { calzado } from '../data/products';
import ProductPage from './ProductPage';

export default function Manso() {
  const product = calzado.find(p => p.id === 'manso');
  return <ProductPage product={product} />;
}

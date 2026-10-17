import React from 'react';
import { calzado } from '../data/products';
import ProductPage from './ProductPage';

export default function Mara() {
  const product = calzado.find(p => p.id === 'mara');
  return <ProductPage product={product} />;
}

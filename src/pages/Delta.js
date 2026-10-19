import React from 'react';
import { calzado } from '../data/products';
import ProductPage from './ProductPage';

export default function Delta() {
  const product = calzado.find(p => p.id === 'delta');
  return <ProductPage product={product} />;
}

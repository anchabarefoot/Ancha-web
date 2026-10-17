import React from 'react';
import { calzado } from '../data/products';
import ProductPage from './ProductPage';

export default function Zonda() {
  const product = calzado.find(p => p.id === 'zonda');
  return <ProductPage product={product} />;
}

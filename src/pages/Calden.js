import React from 'react';
import { calzado } from '../data/products';
import ProductPage from './ProductPage';

export default function Calden() {
  const product = calzado.find(p => p.id === 'calden');
  return <ProductPage product={product} />;
}

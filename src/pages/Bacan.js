import React from 'react';
import { calzado } from '../data/products';
import ProductPage from './ProductPage';

export default function Bacan() {
  const product = calzado.find(p => p.id === 'bacan');
  return <ProductPage product={product} />;
}

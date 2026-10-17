import React from 'react';
import { calzado } from '../data/products';
import ProductPage from './ProductPage';

export default function Maiten() {
  const product = calzado.find(p => p.id === 'maiten');
  return <ProductPage product={product} />;
}

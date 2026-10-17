import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Calzado from './pages/Calzado';
import Indumentaria from './pages/Indumentaria';
import Returns from './pages/Returns';
import Cart from './pages/Cart';
import GiftCard from './pages/GiftCard';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calzado" element={<Calzado />} />
          <Route path="/indumentaria" element={<Indumentaria />} />
          <Route path="/cambios" element={<Returns />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/gift-card" element={<GiftCard />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

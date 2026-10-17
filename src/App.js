import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ViviAncha from './pages/ViviAncha';
import Maiten from './pages/Maiten';
import Mara from './pages/Mara';
import Calden from './pages/Calden';
import Zonda from './pages/Zonda';
import Anchitas from './pages/Anchitas';
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
          <Route path="/vivi-ancha" element={<ViviAncha />} />
          <Route path="/maiten" element={<Maiten />} />
          <Route path="/mara" element={<Mara />} />
          <Route path="/calden" element={<Calden />} />
          <Route path="/zonda" element={<Zonda />} />
          <Route path="/anchitas" element={<Anchitas />} />
          <Route path="/cambios" element={<Returns />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/gift-card" element={<GiftCard />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

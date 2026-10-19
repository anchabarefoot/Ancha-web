import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import FloatingCTA from './components/FloatingCTA';
import Home from './pages/Home';
import ViviAncha from './pages/ViviAncha';
import Maiten from './pages/Maiten';
import Manso from './pages/Manso';
import Mara from './pages/Mara';
import Calden from './pages/Calden';
import Bacan from './pages/Bacan';
import Zonda from './pages/Zonda';
import Delta from './pages/Delta';
import Anchitas from './pages/Anchitas';
import Returns from './pages/Returns';
import Cart from './pages/Cart';
import GiftCard from './pages/GiftCard';

// Google Client ID: crear en https://console.cloud.google.com
// Credenciales > ID de cliente OAuth > Aplicación web
// Agregar en Vercel: Settings > Environment Variables > REACT_APP_GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <FloatingCTA />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vivi-ancha" element={<ViviAncha />} />
            <Route path="/maiten" element={<Maiten />} />
            <Route path="/manso" element={<Manso />} />
            <Route path="/mara" element={<Mara />} />
            <Route path="/calden" element={<Calden />} />
            <Route path="/bacan" element={<Bacan />} />
            <Route path="/zonda" element={<Zonda />} />
            <Route path="/delta" element={<Delta />} />
            <Route path="/anchitas" element={<Anchitas />} />
            <Route path="/cambios" element={<Returns />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/gift-card" element={<GiftCard />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

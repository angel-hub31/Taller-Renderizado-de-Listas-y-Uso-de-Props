// src/App.jsx

import { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { data } from './data/videojuegos';
import { TablaVideojuegos } from './components/TablaVideojuegos';
import { FormularioVideojuego } from './components/FormularioVideojuego';
import { Navbar } from './components/Navbar';
import { PaginaNoEncontrada } from './components/PaginaNoEncontrada';
import './App.css';


function App() {
  const [videojuegos, setVideojuegos] = useState(() => {

    const guardados = localStorage.getItem('lista_videojuegos');
    return guardados ? JSON.parse(guardados) : data;
  });

  useEffect(() => {
    localStorage.setItem('lista_videojuegos', JSON.stringify(videojuegos));
  }, [videojuegos]);

  const handleGuardar = (juegoForm) => {
    if (juegoForm.id) {
      setVideojuegos(
        videojuegos.map((juego) => (juego.id === juegoForm.id ? juegoForm : juego))
      );
    } else {
      const nuevoJuego = {
        ...juegoForm,
        id: Date.now()
      };
      setVideojuegos([...videojuegos, nuevoJuego]);
    }
  };

  const handleEliminar = (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar este videojuego?');
    if (confirmar) {
      setVideojuegos(videojuegos.filter((juego) => juego.id !== id));
    }
  };

  return (
    <BrowserRouter>
      <div style={{
        backgroundColor: '#3b477d',
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: 'sans-serif'
      }}>
        <Toaster position="top-right" reverseOrder={false} />

        <Navbar />

        <h1 style={{
          textAlign: 'center',
          color: '#04fa83',
          fontSize: '2.5rem',
          fontWeight: '800',
          letterSpacing: '1px',
          marginBottom: '30px',
          textShadow: '0 0 15px rgba(99, 102, 241, 0.3)'
        }}>
          🕹️ Tienda de Videojuegos
        </h1>

        <Routes>
          <Route
            path="/"
            element={<TablaVideojuegos listaVideojuegos={videojuegos} onEliminar={handleEliminar} />}
          />

          <Route
            path="/nuevo"
            element={<FormularioVideojuego onGuardar={handleGuardar} />}
          />

          <Route
            path="/editar"
            element={<FormularioVideojuego onGuardar={handleGuardar} />}
          />

          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
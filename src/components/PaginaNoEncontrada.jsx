// src/components/PaginaNoEncontrada.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const PaginaNoEncontrada = () => {
    return (
        <div>
            <h1>404</h1>
            <h2>¡Ups! Página No Encontrada</h2>
            <p>La ruta a la que intentas acceder no existe.</p>
            <Link to="/">Volver al Inventario</Link>
        </div>
    );
};
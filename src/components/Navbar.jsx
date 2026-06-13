// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 

export const Navbar = () => {
    return (
        <nav>
            <div>
                <strong>🎮 Tienda de Videojuegos</strong>
            </div>
            
            <ul>
                <li>
                    <Link to="/">Inventario</Link>
                </li>
                <li>
                    <Link to="/nuevo">Nuevo Juego</Link>
                </li>
            </ul>
        </nav>
    );
};
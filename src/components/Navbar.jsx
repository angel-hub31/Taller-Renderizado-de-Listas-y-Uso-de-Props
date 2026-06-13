// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css';

export const Navbar = () => {
    return (
        <nav className="navbar-container">
            <div>
                <strong>🎮 Tienda de Videojuegos</strong>
            </div>
            
            <ul className="navbar-menu">
                <li>
                    <Link to="/" className="navbar-link">Inventario</Link>
                </li>
                <li>
                    <Link to="/nuevo" className="navbar-link">Nuevo Juego</Link>
                </li>
            </ul>
        </nav>
    );
};
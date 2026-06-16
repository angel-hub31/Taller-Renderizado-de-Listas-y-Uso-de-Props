// src/components/TablaVideojuegos.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TablaVideojuegos.css';

export const TablaVideojuegos = ({ listaVideojuegos, onEliminar }) => {

    const navigate = useNavigate();

    return (
        <div className="table-container">
            <div className="table-header-actions">
                <span className="total-badge">
                    Total: {listaVideojuegos.length} juegos
                </span>
            </div>

            <table className="videojuegos-table">
                <thead>
                    <tr>
                        <th className="column-img">Portada</th>
                        <th>Título</th>
                        <th>Género</th>
                        <th>Sinopsis</th>      {/* Nueva Columna */}
                        <th>Calificación</th>  {/* Nueva Columna */}
                        <th>Plataforma</th>
                        <th>Año</th>
                        <th>Precio</th>
                        <th>Disponibilidad</th>
                        <th>Progreso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaVideojuegos.map((juego) => (
                        <tr key={juego.id}>
                            <td className="cell-img">
                                <img
                                    src={juego.imagen}
                                    alt={juego.titulo}
                                    className="game-thumbnail"
                                    onError={(e) => {
                                        e.target.src = '/placeholder.png'; 
                                        e.target.style.opacity = '0.5';
                                    }}
                                />
                            </td>

                            <td><strong>{juego.titulo}</strong></td>
                            <td>{juego.genero}</td>
                            
                            {/* Visualización de los nuevos campos */}
                            <td>{juego.sinopsis ? juego.sinopsis.substring(0, 30) + '...' : 'N/A'}</td>
                            <td>{juego.calificacion ? `${juego.calificacion}/100` : 'N/A'}</td>
                            
                            <td>{juego.plataforma}</td>
                            <td>{juego.lanzamiento}</td>
                            <td>${parseFloat(juego.precio).toFixed(2)}</td>
                            <td>
                                <span className={`status ${juego.disponible ? 'available' : 'unavailable'}`}>
                                    {juego.disponible ? 'Disponible' : 'Agotado'}
                                </span>
                            </td>
                            <td>
                                <div className="progress-container">
                                    <progress value={juego.progreso} max="1"></progress>
                                    <span className="progress-text">{Math.round(juego.progreso * 100)}%</span>
                                </div>
                            </td>
                            <td>
                                <button onClick={() => navigate('/editar', { state: { videojuego: juego } })}>
                                    Editar
                                </button>
                                <button onClick={() => onEliminar(juego.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
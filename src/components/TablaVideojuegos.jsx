import React from 'react';
import './TablaVideojuegos.css'; 

export const TablaVideojuegos = ({ listaVideojuegos }) => {
    return (
        <div className="table-container">
            {/* Cabecera interna de la tabla con el contador dinámico */}
            <div className="table-header-actions">
                <span className="total-badge">
                    Total: {listaVideojuegos.length} juegos
                </span>
            </div>

            <table className="videojuegos-table">
                <thead>
                    <tr>
                        <th className="column-id">ID</th> {/* <-- Nueva columna ID */}
                        <th>Título</th>
                        <th>Género</th>
                        <th>Plataforma</th>
                        <th>Año</th>
                        <th>Precio</th>
                        <th>Disponibilidad</th>
                        <th>Progreso Descarga</th>
                    </tr>
                </thead>
                <tbody>
                    {listaVideojuegos.map((juego, index) => (
                        <tr key={juego.id}>
                            <td className="cell-id">{index + 1}</td> {/* <-- Numeración automática */}
                            <td><strong>{juego.titulo}</strong></td>
                            <td>{juego.genero}</td>
                            <td>{juego.plataforma}</td>
                            <td>{juego.lanzamiento}</td>
                            <td>${juego.precio.toFixed(2)}</td>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
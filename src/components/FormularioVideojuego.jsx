// src/components/FormularioVideojuego.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const FormularioVideojuego = ({ onGuardar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const juegoAEditar = location.state?.videojuego;

    const [formData, setFormData] = useState({
        id: '',
        titulo: '',
        genero: '',
        plataforma: '',
        lanzamiento: '',
        precio: '',
        disponible: false,
        progreso: 0 
    });

    useEffect(() => {
        if (juegoAEditar) {
            setFormData(juegoAEditar);
        }
    }, [juegoAEditar]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.titulo || !formData.genero || !formData.plataforma || !formData.lanzamiento || !formData.precio) {
            alert('Por favor, llena todos los campos.');
            return;
        }

        const juegoGuardar = {
            ...formData,
            lanzamiento: parseInt(formData.lanzamiento),
            precio: parseFloat(formData.precio),
            progreso: parseFloat(formData.progreso)
        };

        onGuardar(juegoGuardar);
        
        navigate('/');
    };

    return (
        <div>
            <h2>{juegoAEditar ? 'Editar Videojuego' : 'Registrar Nuevo Videojuego'}</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input 
                        type="text" 
                        name="titulo" 
                        value={formData.titulo} 
                        onChange={handleChange} 
                    />
                </div>

                <div>
                    <label>Género:</label>
                    <select name="genero" value={formData.genero} onChange={handleChange}>
                        <option value="">-- Selecciona --</option>
                        <option value="Acción">Acción</option>
                        <option value="RPG">RPG</option>
                        <option value="Deportes">Deportes</option>
                        <option value="Estrategia">Estrategia</option>
                        <option value="Aventura">Aventura</option>
                    </select>
                </div>

                <div>
                    <label>Plataforma:</label>
                    <select name="plataforma" value={formData.plataforma} onChange={handleChange}>
                        <option value="">-- Selecciona --</option>
                        <option value="PC">PC</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="Xbox Series X">Xbox Series X</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                    </select>
                </div>

                <div>
                    <label>Año de Lanzamiento:</label>
                    <input 
                        type="number" 
                        name="lanzamiento" 
                        value={formData.lanzamiento} 
                        onChange={handleChange} 
                    />
                </div>

                <div>
                    <label>Precio ($):</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        name="precio" 
                        value={formData.precio} 
                        onChange={handleChange} 
                    />
                </div>

                <div>
                    <label>Progreso de Descarga (0 a 1):</label>
                    <input 
                        type="number" 
                        step="0.1" 
                        min="0" 
                        max="1" 
                        name="progreso" 
                        value={formData.progreso} 
                        onChange={handleChange} 
                    />
                </div>

                <div>
                    <label>
                        <input 
                            type="checkbox" 
                            name="disponible" 
                            checked={formData.disponible} 
                            onChange={handleChange} 
                        />
                        ¿Disponible?
                    </label>
                </div>

                <button type="submit">
                    {juegoAEditar ? 'Actualizar' : 'Guardar'}
                </button>
            </form>
        </div>
    );
};
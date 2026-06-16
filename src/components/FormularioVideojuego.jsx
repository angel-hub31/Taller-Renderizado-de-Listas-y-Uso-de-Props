// src/components/FormularioVideojuego.jsx
import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FormularioVideojuego.css';

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
        progreso: 0,
        sinopsis: '',
        calificacion: ''
    });

    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (juegoAEditar) { 
            setFormData(juegoAEditar); 
        }
    }, [juegoAEditar]);

    const validarFormulario = () => {
        let nuevosErrores = {};
        
        if (!formData.titulo || formData.titulo.trim().length === 0) {
            nuevosErrores.titulo = "El título es obligatorio";
        }
        
        if (!formData.sinopsis || formData.sinopsis.length < 10) {
            nuevosErrores.sinopsis = "La sinopsis debe tener al menos 10 caracteres";
        }

        if (!formData.genero) nuevosErrores.genero = "Selecciona un género";
        if (!formData.plataforma) nuevosErrores.plataforma = "Selecciona una plataforma";
        if (!formData.lanzamiento) nuevosErrores.lanzamiento = "La fecha es obligatoria";
        
        if (!formData.precio || parseFloat(formData.precio) <= 0) {
            nuevosErrores.precio = "El precio debe ser mayor a 0";
        }
        
        const calif = parseInt(formData.calificacion);
        if (isNaN(calif) || calif < 1 || calif > 100) {
            nuevosErrores.calificacion = "La calificación debe ser entre 1 y 100";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validarFormulario()) {
            onGuardar({
                ...formData,
                precio: parseFloat(formData.precio),
                progreso: parseFloat(formData.progreso),
                calificacion: parseInt(formData.calificacion)
            });

            toast.success('¡Videojuego guardado exitosamente!');
            navigate('/');
        }
    };

    return (
        <div className="form-container-screen">
            <div className="form-card">
                <h2>{juegoAEditar ? 'Editar Videojuego' : 'Registrar Nuevo Videojuego'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Título:</label>
                        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
                        {errores.titulo && <span className="error-text">{errores.titulo}</span>}
                    </div>

                    <div className="form-group">
                        <label>Fecha de Lanzamiento:</label>
                        <input type="date" name="lanzamiento" value={formData.lanzamiento} onChange={handleChange} max={new Date().toISOString().split("T")[0]} />
                        {errores.lanzamiento && <span className="error-text">{errores.lanzamiento}</span>}
                    </div>

                    <div className="form-group">
                        <label>Sinopsis:</label>
                        <textarea name="sinopsis" value={formData.sinopsis} onChange={handleChange} />
                        {errores.sinopsis && <span className="error-text">{errores.sinopsis}</span>}
                    </div>

                    <div className="form-group">
                        <label>Calificación (1-100):</label>
                        <input type="number" name="calificacion" value={formData.calificacion} onChange={handleChange} />
                        {errores.calificacion && <span className="error-text">{errores.calificacion}</span>}
                    </div>

                    <div className="form-group">
                        <label>Género:</label>
                        <select name="genero" value={formData.genero} onChange={handleChange}>
                            <option value="">-- Selecciona --</option>
                            <option value="Acción">Acción</option>
                            <option value="RPG">RPG</option>
                            <option value="Aventura">Aventura</option>
                        </select>
                        {errores.genero && <span className="error-text">{errores.genero}</span>}
                    </div>

                    <div className="form-group">
                        <label>Precio ($):</label>
                        <input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} />
                        {errores.precio && <span className="error-text">{errores.precio}</span>}
                    </div>

                    <button type="submit">{juegoAEditar ? 'Actualizar' : 'Guardar'}</button>
                </form>
            </div>
        </div>
    );
};
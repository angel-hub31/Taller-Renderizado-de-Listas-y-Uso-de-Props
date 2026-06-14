// src/components/FormularioVideojuego.jsx
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
        //cambio paso 1
        sinopsis: '',
        calificacion: ''
    });
    //paso 2 : estado para almacenar errores
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (juegoAEditar) { setFormData(juegoAEditar); }
    }, [juegoAEditar]);
    // paso 2 Funcion para validar campos
    const validarFormulario = () => {
        let nuevosErrores = {};
        if (!formData.titulo.trim()) nuevosErrores.titulo = "El título es obligatorio";
        if (!formData.genero) nuevosErrores.genero = "Selecciona un género";
        if (!formData.plataforma) nuevosErrores.plataforma = "Selecciona una plataforma";
        if (!formData.lanzamiento) nuevosErrores.lanzamiento = "La fecha es obligatoria";
        if (formData.precio <= 0 || !formData.precio) nuevosErrores.precio = "El precio debe ser mayor a 0";
        if (formData.calificacion < 1 || formData.calificacion > 100) nuevosErrores.calificacion = "Debe ser entre 1 y 100";

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0; // Devuelve true si no hay errores
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

        //paso 2 : validamos antes de guardar


        if (validarFormulario()) {
            onGuardar({
                ...formData,
                precio: parseFloat(formData.precio),
                progreso: parseFloat(formData.progreso),
                calificacion: parseInt(formData.calificacion)
            });
            navigate('/')
        }
};

return (
    <div className="form-container-screen">
        <div className="form-card">
            <h2>{juegoAEditar ? 'Editar Videojuego' : 'Registrar Nuevo Videojuego'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Título:</label>
                    <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}/>
                        {errores.titulo && <span className="error-text">{errores.titulo}</span>}
                </div>


                <div className="form-group">
                    <label>Fecha de Lanzamiento:</label>
                    <input
                        type="date"
                        name="lanzamiento"
                        value={formData.lanzamiento}
                        onChange={handleChange}
                        max={new Date().toISOString().split("T")[0]} // Validacion: no fechas futuras
                    />
                </div>


                <div className="form-group">
                    <label>Sinopsis:</label>
                    <textarea
                        name="sinopsis"
                        value={formData.sinopsis}
                        onChange={handleChange}
                    />
                </div>


                <div className="form-group">
                    <label>Calificación de la Crítica (1-100):</label>
                    <input
                        type="number"
                        name="calificacion"
                        value={formData.calificacion}
                        onChange={handleChange}
                        min="1"
                        max="100"
                    />
                    {errores.calificacion && <span className="error-text">{errores.calificacion}</span>}
                </div>



                <div className="form-group">
                    <label>Género:</label>
                    <select name="genero" value={formData.genero} onChange={handleChange}>
                        <option value="">-- Selecciona --</option>
                        <option value="Acción">Acción</option>
                        <option value="RPG">RPG</option>
                        <option value="Deportes">Deportes</option>
                        <option value="Estrategia">Estrategia</option>
                        <option value="Aventura">Aventura</option>
                    </select>
                    {errores.genero && <span className="error-text">{errores.genero}</span>}
                </div>

                <div className="form-group">
                    <label>Plataforma:</label>
                    <select name="plataforma" value={formData.plataforma} onChange={handleChange}>
                        <option value="">-- Selecciona --</option>
                        <option value="PC">PC</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="Xbox Series X">Xbox Series X</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                    </select>
                    {errores.plataforma && <span className="error-text">{errores.plataforma}</span>}
                </div>



                <div className="form-group">
                    <label>Precio ($):</label>
                    <input
                        type="number"
                        step="0.01"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                    />
                    {errores.precio && <span className="error-text">{errores.precio}</span>}
                </div>

                <div className="form-group">
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

                <div className="form-group-checkbox">
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
    </div>
);
};

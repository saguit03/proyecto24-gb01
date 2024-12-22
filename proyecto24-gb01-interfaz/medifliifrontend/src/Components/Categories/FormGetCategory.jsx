import React, { useState } from 'react';
import categoriesService from '../../Controller/categoryController';

export default function GetCategoryById () {
    const [idCategory, setIdCategory] = useState('');
    const [category, setCategory] = useState(null);
    const [error, setError] = useState('');

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError(''); // Limpia errores previos
            const response = await categoriesService.getCategoryById(idCategory);
            if (response && response.length > 0) {
                setCategory(response[0]); // Asigna la primera categoría encontrada
            } else {
                setCategory(null);
                setError('No se encontró ninguna categoría con el ID proporcionado.');
            }
        } catch (err) {
            console.error('Error al buscar la categoría:', err);
            setCategory(null);
            setError('Hubo un error al intentar obtener la categoría.');
        }
    };

    return (
        <div className="card-header">
            <h3 className="text-center">Obtener categoría por identificador</h3>
            <form onSubmit={handleSubmit}>
                <p>¿Qué categoría deseas buscar?</p>
                <span>ID</span>
                <input
                    type="number"
                    className="form-control mb-3"
                    min="1"
                    name="idCategory"
                    value={idCategory}
                    onChange={(e) => setIdCategory(e.target.value)}
                    required
                    placeholder="idCategory 1"
                />
                <button className="btn btn-primary" type="submit">
                    Buscar
                </button>
            </form>

            {/* Mensajes y resultados */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {category && (
                <div className="alert alert-success mt-3">
                    <h4>Categoría encontrada:</h4>
                    <p><strong>ID:</strong> {category.idCategory}</p>
                    <p><strong>Nombre:</strong> {category.name}</p>
                </div>
            )}
        </div>
    );
};

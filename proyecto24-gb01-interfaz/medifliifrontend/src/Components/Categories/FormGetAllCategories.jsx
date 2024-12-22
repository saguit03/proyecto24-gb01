import React, { useState } from 'react';
import categoriesService from '../../Controller/categoryController';

export default function FormGetAllCategories () {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError(''); // Limpia errores previos
            const response = await categoriesService.getAllCategories();
            if (response && response.length > 0) {
                setCategories(response); // Asigna la lista de categorías al estado
            } else {
                setCategories([]);
                setError('No se encontraron categorías.');
            }
        } catch (err) {
            console.error('Error al obtener las categorías:', err);
            setCategories([]);
            setError('Hubo un error al intentar obtener las categorías.');
        }
    };

    return (
        <div className="card-header">
            <h3 className="text-center">Obtener todas las categorías</h3>
            <form onSubmit={handleSubmit}>
                <button className="btn btn-primary" type="submit">
                    Buscar
                </button>
            </form>

            {/* Mensajes y resultados */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {categories.length > 0 && (
                <div className="mt-3">
                    <h4>Categorías encontradas:</h4>
                    <ul className="list-group">
                        {categories.map((category) => (
                            <li key={category.idCategory} className="list-group-item">
                                <strong>ID:</strong> {category.idCategory} - <strong>Nombre:</strong> {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

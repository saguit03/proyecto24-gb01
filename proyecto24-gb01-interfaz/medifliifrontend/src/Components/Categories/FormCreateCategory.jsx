import React, { useState } from 'react';
import categoriesService from '../../Controller/categoryController';

export default function FormCreateCategory () {
    const [name, setName] = useState('');

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newCategory = { name };
            const response = await categoriesService.addCategory(newCategory);
            if (response) {
                alert('Categoría añadida con éxito');
                setName(''); // Resetea el formulario
            }
        } catch (error) {
            console.error('Error al añadir la categoría:', error);
            alert('Hubo un error al intentar añadir la categoría.');
        }
    };

    return (
        <div className="card-header">
            <h3 className="text-center">Añadir categoría</h3>
            <form onSubmit={handleSubmit}>
                <span>Nombre de la categoría</span>
                <input
                    type="text"
                    className="form-control mb-3"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br/>
                <button className="btn btn-primary" type="submit">
                    Añadir
                </button>
            </form>
        </div>
    );
};

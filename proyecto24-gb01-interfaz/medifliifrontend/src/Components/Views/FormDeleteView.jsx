import React, { useState } from 'react';
import viewsService from '../../Controller/viewController';

export default function DeleteViewForm () {
    const [idView, setIdView] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setIdView(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llamada al servicio para eliminar la vista
            const response = await viewsService.deleteViewForm(idView);
            if (response) {
                setMessage('¡Vista eliminada con éxito!');
                setIdView(''); // Limpiar el campo de ID
            }
        } catch (error) {
            setMessage('Error al eliminar la vista. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="text-center">Borrar View</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="method" value="DELETE" />

                    <div className="mb-3">
                        <label>¿Qué id tiene la View que deseas borrar?</label>
                        <input
                            type="number"
                            id="idView"
                            className="form-control"
                            name="idView"
                            value={idView}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Borrar
                    </button>
                </form>
                {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
        </div>
    );
};

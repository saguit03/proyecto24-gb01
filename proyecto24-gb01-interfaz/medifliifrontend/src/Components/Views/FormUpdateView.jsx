import React, { useState } from 'react';
import viewsService from '../../Controller/viewController';

export default function UpdateViewForm () {
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        idView: '',
        dateFinish: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llamada al servicio para actualizar la vista
            const response = await viewsService.putViewForm(formData);
            if (response) {
                setMessage('¡Vista actualizada con éxito!');
                setFormData({
                    idView: '',
                    dateFinish: ''
                });
            }
        } catch (error) {
            setMessage('Error al actualizar la vista. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="text-center">Modificar View</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="method" value="PUT" />

                    <div className="mb-3">
                        <label htmlFor="idView">¿Qué id tiene la View que quieres modificar?</label>
                        <input
                            type="number"
                            id="idView"
                            name="idView"
                            className="form-control"
                            value={formData.idView}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>¿Cuándo has terminado de ver el contenido? (Opcional)</label>
                        <input
                            type="date"
                            id="dateFinish"
                            name="dateFinish"
                            className="form-control"
                            value={formData.dateFinish}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Guardar
                    </button>
                </form>
                {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
        </div>
    );
};

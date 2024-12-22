import React, { useState } from 'react';
import viewsService from '../../Controller/viewController';

export default function AddViewForm () {
    const [formData, setFormData] = useState({
        idProfile: '',
        idContent: '',
        dateInit: '',
        dateFinish: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await viewsService.addView(formData);
            if (response) {
                setMessage('¡Vista añadida con éxito!');
                setFormData({
                    idProfile: '',
                    idContent: '',
                    dateInit: '',
                    dateFinish: '',
                });
            }
        } catch (error) {
            setMessage('Error al añadir la vista. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="text-center">Insertar Views</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>¿Desde qué perfil estás creando la View?</label>
                        <input
                            type="number"
                            className="form-control"
                            name="idProfile"
                            value={formData.idProfile}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>¿De qué contenido quieres hacer la View?</label>
                        <input
                            type="number"
                            className="form-control"
                            name="idContent"
                            value={formData.idContent}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>¿Cuándo has empezado a verlo?</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dateInit"
                            value={formData.dateInit}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>¿Cuándo has terminado de verlo? (Opcional)</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dateFinish"
                            value={formData.dateFinish}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Añadir
                    </button>
                </form>
                {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
        </div>
    );
};

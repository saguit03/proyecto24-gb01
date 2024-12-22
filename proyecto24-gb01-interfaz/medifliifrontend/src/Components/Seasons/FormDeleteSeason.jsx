import React, { useState } from 'react';
import seasonsService from '../../Controller/seasonController';

export default function DeleteSeasonForm () {
    const [idSeason, setIdSeason] = useState('');
    const [message, setMessage] = useState('');

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "idSeason") setIdSeason(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await seasonsService.deleteSeason(idSeason);
            setMessage('Temporada eliminada correctamente');
        } catch (err) {
            setMessage('Hubo un error al eliminar la temporada');
        }
    };

    return (
        <div className="card">
            <h3 className="text-center">Eliminar temporada</h3>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    
                    <span>ID</span>
                    <input
                        type="text"
                        min="1"
                        className="form-control mb-3"
                        name="idSeason"
                        required
                        value={idSeason}
                        placeholder="idSeason 1"
                        onChange={handleChange}
                    />
                    <button className="btn btn-primary" type="submit">Eliminar</button>
                </form>

                {message && <div className="alert mt-3">{message}</div>}
            </div>
        </div>
    );
};

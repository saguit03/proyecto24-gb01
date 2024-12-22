import React, { useState } from 'react';
import seasonsService from '../../Controller/seasonController';

export default function GetSeasonParticipantsForm () {
    const [idSeason, setIdSeason] = useState('');
    const [participants, setParticipants] = useState([]);
    const [message, setMessage] = useState('');

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "idSeason") setIdSeason(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idSeason) {
            setMessage('Por favor, ingresa un ID de temporada.');
            return;
        }

        try {
            const data = await seasonsService.getSeasonParticipants(idSeason);
            setParticipants(data.participants);  // Supone que la respuesta tiene una propiedad 'participants'
            setMessage('');
        } catch (err) {
            setMessage('Hubo un error al obtener los participantes.');
            setParticipants([]);
        }
    };

    return (
        <div className="card">
            <h3 className="text-center">Obtener participantes de una temporada</h3>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <span>ID</span>
                    <input
                        type="text"
                        min="1"
                        className="form-control mb-3"
                        name="idSeason"
                        required
                        placeholder="idSeason 1"
                        value={idSeason}
                        onChange={handleChange}
                    />
                    <button className="btn btn-primary" type="submit">Buscar</button>
                </form>

                {message && <div className="alert mt-3">{message}</div>}

                {/* Mostrar los participantes obtenidos si hay resultados */}
                {participants.length > 0 && (
                    <div className="mt-4">
                        <h5>Participantes de la temporada:</h5>
                        <ul>
                            {participants.map((participant) => (
                                <li key={participant.id}>{participant.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

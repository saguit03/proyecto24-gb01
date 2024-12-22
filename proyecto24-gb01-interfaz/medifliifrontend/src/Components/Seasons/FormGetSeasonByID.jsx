import React, { useState } from 'react';
import seasonsService from '../../Controller/seasonController';

export default function GetSeasonByIdForm () {
    const [idSeason, setIdSeason] = useState('');
    const [seasonData, setSeasonData] = useState(null);
    const [error, setError] = useState('');

    // Maneja el cambio en el campo del formulario
    const handleChange = (e) => {
        setIdSeason(e.target.value);
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await seasonsService.getSeasonById(idSeason);
            setSeasonData(data);
            setError('');
        } catch (err) {
            setError('No se pudo obtener la temporada');
            setSeasonData(null);
        }
    };

    return (
        <div className="card-body">
            <h3 className="text-center">Obtener temporada por identificador</h3>
            <form onSubmit={handleSubmit}>
                <p>¿Qué temporada deseas buscar?</p>
                <span>ID</span>
                <input
                    type="number"
                    min="1"
                    className="form-control mb-3"
                    name="idSeason"
                    value={idSeason}
                    required
                    placeholder="idSeason 1"
                    onChange={handleChange}
                />
                <button className="btn btn-primary" type="submit">Buscar</button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {seasonData && (
                <div className="mt-3">
                    <h4>Detalles de la Temporada</h4>
                    <ul>
                        <li><strong>ID Temporada:</strong> {seasonData.idSeason}</li>
                        <li><strong>Título:</strong> {seasonData.title}</li>
                        <li><strong>Número de Temporada:</strong> {seasonData.seasonNumber}</li>
                        <li><strong>Total de Capítulos:</strong> {seasonData.totalChapters}</li>
                        <li><strong>Capítulos:</strong> {seasonData.chapterList.join(', ')}</li>
                        <li><strong>Tráiler:</strong> {seasonData.trailer}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

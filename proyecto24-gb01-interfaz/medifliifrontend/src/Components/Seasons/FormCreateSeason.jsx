import React, { useState } from 'react';
import seasonsService from '../../Controller/seasonController';
import { useNavigate, useParams } from 'react-router-dom';
import seriesService from '../../Controller/seriesController';

export default function AddSeasonForm () {
    const params = useParams()
    // const idSerie = params.idSerie
    const [formData, setFormData] = useState({
        idSeries: '',
        title: '',
        seasonNumber: '',
        totalChapters: '',
        chapterList: ['', '', ''],
        trailer: ''
    });
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Maneja el cambio de valor en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Maneja el cambio en los campos de la lista de capítulos
    const handleChapterListChange = (index, value) => {
        const updatedChapterList = [...formData.chapterList];
        updatedChapterList[index] = value;
        setFormData(prevState => ({
            ...prevState,
            chapterList: updatedChapterList
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            // formData.idSeries = idSerie
            const response = await seasonsService.addSeason(formData).then(response => {
                setSuccessMessage('Temporada añadida correctamente');
                seriesService.putSeasonIntoSerie(formData.idSeries,response.idSeason).then(response =>{
                    navigate(`/app/serie/${formData.idSeries}`)
                })
            })
            
            

            
        } catch (err) {
            setError('Error al añadir la temporada');
            setSuccessMessage('');
        }
    };

    return (
        <div className="card">
            <h3 className="text-center">Añadir temporada</h3>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <p>Nota: Los parámetros con * son obligatorios</p>

                    <span>¿A qué serie pertenece?*</span>
                    <input
                        type="number"
                        min="1"
                        name="idSeries"
                        value={formData.idSeries}
                        required
                        onChange={handleChange}
                        placeholder="idSeries 1"
                    />
                    <br /><br />

                    <span>¿Cuál es el título de la temporada?*</span>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="title"
                        value={formData.title}
                        required
                        onChange={handleChange}
                    />
                    <br /><br />

                    <span>¿Cuál es el número de la temporada en la serie?*</span>
                    <input
                        type="number"
                        min="0"
                        className="form-control mb-3"
                        name="seasonNumber"
                        value={formData.seasonNumber}
                        required
                        onChange={handleChange}
                    />
                    <br /><br />

                    {/* <span>¿Cuántos capítulos tiene la temporada?*</span>
                    <input
                        type="number"
                        min="0"
                        className="form-control mb-3"
                        name="totalChapters"
                        value={formData.totalChapters}
                        required
                        onChange={handleChange}
                    /> */}

                    
                    <br />

                    <span>¿Qué tráiler se adjunta?</span>
                    <input
                        type="number"
                        min="1"
                        name="trailer"
                        value={formData.trailer}
                        placeholder="idTrailer 1"
                        onChange={handleChange}
                    />
                    <br />

                    <button className="btn btn-primary" type="submit">Añadir</button>
                </form>

                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            </div>
        </div>
    );
};

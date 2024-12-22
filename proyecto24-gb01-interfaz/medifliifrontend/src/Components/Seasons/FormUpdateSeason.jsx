import React, { useState } from 'react';
import seasonsService from '../../Controller/seasonController';
import { useNavigate } from 'react-router-dom';

export default function UpdateSeasonForm () {
    const [idSeason, setIdSeason] = useState('');
    const [idSeries, setIdSeries] = useState('');
    const [title, setTitle] = useState('');
    const [seasonNumber, setSeasonNumber] = useState('');
    const [totalChapters, setTotalChapters] = useState('');
    const [chapterList, setChapterList] = useState([]);
    const [trailer, setTrailer] = useState('');
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
          const [error, setError] = useState(''); // Estado para manejar errores
          const [loading, setLoading] = useState(false); // Estado para manejar la carga de la página

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleChapterChange = (e, index) => {
        const newChapterList = [...chapterList];
        newChapterList[index] = e.target.value;
        setChapterList(newChapterList);
    };

    const handleChangeIdSerie = (e) => {
        setLoading(true)
        seasonsService.getSeasonById(e.target.value).then((response)=>{
            setFormData(response[0])
            console.log(response)
        }).catch((err) => {
            setFormData({})
        })
        .finally(()=> {
            setLoading(false)
            
            })
        setIdSeason(e.target.value)
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(formData)
        
        
        try {
            const data = await seasonsService.updateSeasonForm(idSeason, formData);
            setMessage('Temporada actualizada correctamente');
        } catch (err) {
            setMessage('Hubo un error al actualizar la temporada');
        }
    };

    return (
        <div className="card">
            <h3 className="text-center">Modificar temporada</h3>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    
                    <label>ID</label>
                    <p>Nota: Los parámetros con * son obligatorios</p>

                    <span>ID*</span>
                    <input
                        type="text"
                        className="form-control mb-3"
                        required
                        name="idSeason"
                        value={idSeason}
                        placeholder="idSeason 1"
                        onChange={handleChangeIdSerie}
                    />
                    <br />

                    <span>¿A qué serie pertenece?</span>
                    <input
                        type="number"
                        name="idSeries"
                        value={formData.idSeries}
                        placeholder="idSeries 1"
                        onChange={handleChange}
                    />
                    <br />

                    <span>¿Cuál es el título de la temporada?</span>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <br />

                    <span>¿Cuál es el número de la temporada en la serie?</span>
                    <input
                        type="number"
                        min="0"
                        className="form-control mb-3"
                        name="seasonNumber"
                        value={formData.seasonNumber}
                        onChange={handleChange}
                    />
                    <br />

                    <span>¿Cuántos capítulos tiene la temporada?</span>
                    <input
                        type="number"
                        min="0"
                        className="form-control mb-3"
                        name="totalChapters"
                        value={formData.totalChapters}
                        onChange={handleChange}
                    />

                    <p>¿Cuáles son los capítulos de la temporada?</p>
                    {Array.from({ length: totalChapters }).map((_, index) => (
                        <input
                            key={index}
                            type="number"
                            min="1"
                            name="chapterList[]"
                            placeholder={`idChapter ${index + 1}`}
                            value={chapterList[index] || ''}
                            onChange={(e) => handleChapterChange(e, index)}
                        />
                    ))}
                    <br />

                    <span>¿Qué tráiler se adjunta?</span>
                    <input
                        type="number"
                        min="1"
                        name="trailer"
                        placeholder="idTrailer 1"
                        value={formData.trailer}
                        onChange={handleChange}
                    />
                    <br />

                    <button className="btn btn-primary" type="submit">Modificar</button>
                </form>

                {message && <div className="alert mt-3">{message}</div>}
            </div>
        </div>
    );
};

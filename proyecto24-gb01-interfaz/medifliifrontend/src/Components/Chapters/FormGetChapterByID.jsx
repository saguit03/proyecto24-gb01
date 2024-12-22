import React, { useState } from 'react';
import chaptersService from '../../Controller/chapterController';

export default function FormGetChapterById () {
    const [idChapter, setIdChapter] = useState('');
    const [chapter, setChapter] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setIdChapter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setChapter(null);

        try {
            if (!idChapter) {
                setMessage('Por favor, ingrese un ID válido.');
                return;
            }

            const data = await chaptersService.getChapterById(idChapter);
            if (data.length > 0) {
                setChapter(data[0]); // Asumimos que se devuelve un array con el capítulo encontrado.
                setMessage('');
            } else {
                setMessage('No se encontró ningún capítulo con ese ID.');
            }
        } catch (error) {
            setMessage('Error al obtener el capítulo. Por favor, inténtelo de nuevo.');
            console.error(error);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="text-center">Obtener capítulo por identificador</h3>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <p>¿Qué capítulo deseas buscar?</p>

                    <div className="form-group">
                        <label>ID</label>
                        <input
                            type="number"
                            className="form-control mb-3"
                            name="idChapter"
                            value={idChapter}
                            onChange={handleChange}
                            required
                            placeholder="idChapter 1"
                        />
                    </div>

                    <button className="btn btn-primary" type="submit">
                        Buscar
                    </button>
                </form>

                {chapter && (
                    <div className="mt-4">
                        <h5>Detalles del capítulo:</h5>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>ID:</strong> {chapter.idChapter}
                            </li>
                            <li className="list-group-item">
                                <strong>Título:</strong> {chapter.title}
                            </li>
                            <li className="list-group-item">
                                <strong>Número del capítulo:</strong> {chapter.chapterNumber}
                            </li>
                            <li className="list-group-item">
                                <strong>Duración:</strong> {chapter.duration} minutos
                            </li>
                            <li className="list-group-item">
                                <strong>URL del video:</strong>{' '}
                                <a href={chapter.urlVideo} target="_blank" rel="noopener noreferrer">
                                    {chapter.urlVideo}
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

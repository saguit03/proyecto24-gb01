import React, { useState } from 'react';
import chaptersService from '../../Controller/chapterController';

export default function  FormDeleteChapter () {
    const [idChapter, setIdChapter] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setIdChapter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!idChapter) {
                setMessage('El ID del capítulo es obligatorio.');
                return;
            }
            await chaptersService.deleteChapter(idChapter);
            setMessage('Capítulo eliminado exitosamente.');
            setIdChapter(''); // Limpiar el campo después de eliminar
        } catch (error) {
            setMessage('Error al eliminar el capítulo. Por favor, inténtelo de nuevo.');
            console.error(error);
        }
    };

    return (
        <div className="card">
            <h3 className="text-center">Eliminar capítulo</h3>
            <div className="card-body">
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="_method" value="DELETE" />

                    <div className="form-group">
                        <label>ID</label>
                        <input
                            type="number"
                            min="1"
                            className="form-control mb-3"
                            name="idChapter"
                            value={idChapter}
                            onChange={handleChange}
                            placeholder="idChapter 1"
                            required
                        />
                    </div>

                    <button className="btn btn-primary" type="submit">
                        Eliminar
                    </button>
                </form>
            </div>
        </div>
    );
};

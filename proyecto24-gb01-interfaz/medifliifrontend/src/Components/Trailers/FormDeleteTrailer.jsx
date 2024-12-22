import React, { useState } from 'react';
import trailersService from '../../Controller/trailerController';

export default function  DeleteTrailer () {
    const [idTrailer, setIdTrailer] = useState('');

    const handleChange = (e) => {
        setIdTrailer(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await trailersService.deleteTrailer(idTrailer);
            console.log('Tráiler eliminado:', response);
            alert('¡Tráiler eliminado con éxito!');
            setIdTrailer(''); // Limpiar el campo después de eliminar
        } catch (error) {
            console.error('Error al eliminar el tráiler:', error);
            alert('Hubo un error al intentar eliminar el tráiler.');
        }
    };

    return (
        <div className="card">
            <h3 className="text-center">Eliminar tráiler</h3>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="_method" value="DELETE" />

                    <span>ID</span>
                    <input
                        type="number"
                        min="1"
                        className="form-control mb-3"
                        name="idTrailer"
                        required
                        placeholder="idTrailer 1"
                        value={idTrailer}
                        onChange={handleChange}
                    />

                    <button className="btn btn-primary" type="submit">
                        Eliminar
                    </button>
                </form>
            </div>
        </div>
    );
};

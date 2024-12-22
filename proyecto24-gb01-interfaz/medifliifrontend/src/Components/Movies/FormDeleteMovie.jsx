import React, { useState } from 'react';
import moviesServices from '../../Controller/movieController';

export default function FormDeleteMovie () {
    const [idMovie, setIdMovie] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setIdMovie(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        
            
            // Llamada a la función deleteMovie con el ID de la película
            moviesServices.deleteMovie(idMovie).then((response)=>{
                setMessage('Película eliminada exitosamente.');
            }).catch((err)=>{
                if(err.status === 404){
                    setError('No se ha encontrado la pelicula a eliminar.');
                }
                else{
                    setError('Error al eliminar la película.');
                }
            }).finally(()=> setLoading(false))

          
    };

    return (
        <div className="card">
            <h3 className="text-center">Eliminar película</h3>
            <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                    
                    <label>ID</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="idMovie"
                        min="1"
                        required
                        placeholder="idMovie 1"
                        value={idMovie}
                        onChange={(e)=> setIdMovie(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </form>

                {message && <div className="alert alert-success mt-3">{message}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
        </div>
    );
};

import axios from 'axios';
import { constantesComunes } from '../Config/constantesComunes';

const API_URL = constantesComunes.URLContenido; // URL base de tu API
const path = "movies"; // Endpoint principal

const moviesService = {
  // Crear una nueva película
  addMovie: async (movieData) => {
    const response = await axios.post(`${API_URL}${path}`, movieData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },

  // Eliminar una película por ID
  deleteMovie: async (idMovie) => {
    console.log(idMovie)
    const response = await axios.delete(`${API_URL}${path}/${idMovie}`, {
      
    });
    return response.data;
  },

  // Actualizar una película por ID
  updateMovie: async (idMovie, updatedData) => {
    const response = await axios.put(`${API_URL}${path}/${idMovie}`, updatedData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },

  // Obtener todas las películas
  getAllMovies: async () => {
    const response = await axios.get(`${API_URL}${path}/all`);
    return response.data;
  },

  // Obtener una película por ID
  getMovieById: async (idMovie) => {
    const response = await axios.get(`${API_URL}${path}/${idMovie}`);
    return response.data;
  },

  // Obtener películas por título
  getMovieByTitle: async (title) => {
    const response = await axios.get(`${API_URL}${path}/title`,  {
      headers: { 'Content-Type': 'application/json' },
      params: { title },
    });
    return response.data;
  },

  // Obtener películas por fecha de lanzamiento
  getMovieByReleaseDate: async (releaseDate) => {
    const response = await axios.get(`${API_URL}${path}/release`, {
      params: { releaseDate },
    });
    return response.data;
  },

  // Obtener los personajes de una película
  getMovieCharacters: async (idMovie) => {
    const response = await axios.get(`${API_URL}${path}/characters`, {
      params: { idMovie },
    });
    return response.data;
  },

  // Obtener los participantes de una película
  getMovieParticipants: async (idMovie) => {
    const response = await axios.get(`${API_URL}${path}/participants`, {
      params: { idMovie },
    });
    return response.data;
  },

  // Asociar un trailer a una película
  putTrailerIntoMovie: async (idMovie, trailerData) => {
    const response = await axios.put(`${API_URL}${path}/${idMovie}/trailer`, trailerData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  },

  // Eliminar un trailer asociado a una película
  deleteTrailerFromMovie: async (idMovie) => {
    const response = await axios.delete(`${API_URL}${path}/${idMovie}/trailer`);
    return response.data;
  },

  // Asociar una categoría a una película
  putCategoryIntoMovie: async (idMovie, categoryData) => {
    const response = await axios.put(`${API_URL}/${path}/${idMovie}/categories`, categoryData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  },

  // Eliminar una categoría asociada a una película
  deleteCategoryFromMovie: async (idMovie) => {
    const response = await axios.delete(`${API_URL}/${path}/${idMovie}/categories`);
    return response.data;
  },
};

export default moviesService;

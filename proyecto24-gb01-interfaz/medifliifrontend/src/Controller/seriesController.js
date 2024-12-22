import axios from 'axios';
import { constantesComunes } from '../Config/constantesComunes';

const API_URL = constantesComunes.URLContenido; // URL base de tu API
const path = "series"; // Ruta específica para series

const seriesService = {
  // Crear una nueva serie
  addSeries: async (seriesData) => {
    const formData = new URLSearchParams();
     formData.append("title", seriesData.title);
        formData.append("duration", seriesData.duration);
        formData.append("urlTitlePage", seriesData.urlTitlePage);
        formData.append("releaseDate", seriesData.releaseDate);
        formData.append("synopsis", seriesData.synopsis);
        formData.append("description", seriesData.description);
        formData.append("language", seriesData.language.join(","));
        formData.append("category", seriesData.category.join(","));
        formData.append("character", seriesData.character.join(","));
        formData.append("participant", seriesData.participant.join(","));
        formData.append("seasons", seriesData.seasons.join(","));
        formData.append("trailer", seriesData.trailer);
        formData.append("isSuscription", seriesData.isSuscription);
    const response = await axios.post(`${API_URL}${path}`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },

  // Obtener todas las series
  getAllSeries: async () => {
    const response = await axios.get(`${API_URL}${path}/all`);
    return response.data;
  },

  // Obtener una serie por ID
  getSeriesById: async (idSeries) => {
    const response = await axios.get(`${API_URL}${path}/${idSeries}`);
    return response.data;
  },

  // Obtener series por título
  getSeriesByTitle: async (title) => {
    const response = await axios.get(`${API_URL}${path}/title`, {
      headers: { 'Content-Type': 'application/json' },
      params: { title }
    });
    return response.data;
  },

  // Obtener capítulos de una serie
  getSeriesChapters: async (idSeries) => {
    const response = await axios.get(`${API_URL}${path}/chapters`, {
      params: { idSeries },
    });
    return response.data;
  },

  // Obtener personajes de una serie
  getSeriesCharacters: async (idSeries) => {
    const response = await axios.get(`${API_URL}${path}/characters`, {
      params: { idSeries },
    });
    return response.data;
  },

  // Obtener participantes de una serie
  getSeriesParticipants: async (idSeries) => {
    const response = await axios.get(`${API_URL}${path}/participants`, {
      params: { idSeries },
    });
    return response.data;
  },

  // Actualizar información de una serie
  updateSeries: async (seriesData) => {
    const formData = new URLSearchParams();
   
    formData.append("idSeries", seriesData.idSeries);
    formData.append("title", seriesData.title);
    formData.append("seasons", seriesData.seasons);
    formData.append("synopsis", seriesData.synopsis);
    formData.append("releaseDate", seriesData.releaseDate);
    formData.append("description", seriesData.description);
    formData.append("trailer", seriesData.trailer);
    formData.append("urlTitlePage", seriesData.urlTitlePage);
    formData.append("language[]", seriesData.language);
    formData.append("category[]", seriesData.category);
    formData.append("character[]", seriesData.character);
    formData.append("participant[]", seriesData.participant);

    const response = await axios.put(`${API_URL}${path}/${seriesData.idSeries}`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },

  // Eliminar una serie
  deleteSeries: async (idSeries) => {
    

    const response = await axios.delete(`${API_URL}${path}/${idSeries}`);
    return response.data;
  },
  putCategoryIntoSerie: async(idSeries, idCategory)=>{
    const response = await axios.put(`${API_URL}${path}/${idSeries}/categories`, null, {
                params: { idCategory }
            });
            return response.data;
  },
  putCharacterIntoSerie: async(idSeries, idCharacter)=>{
    const response = await axios.put(`${API_URL}${path}/${idSeries}/characters`, null, {
      params: { idCharacter }
      });
    return response.data
    },
    putParticipantIntoSerie: async(idSeries, idParticipant)=>{
      const response = await axios.put(`${API_URL}${path}/${idSeries}/participants`, null, {
        params: { idParticipant }
        });
        return response.data
        },
  putSeasonIntoSerie: async(idSeries, idSeason)=>{
    const response = await axios.put(`${API_URL}${path}/${idSeries}/seasons`, {
                params: { idSeason }
            });
            return response.data;
            },
  deleteSeasonIntoSerie: async (idSeries, idSeason) =>{
    const response = await axios.delete(`${API_URL}${path}/${idSeries}/seasons`, {
                params: { idSeason }
            });
      return response.data;
  }
};

export default seriesService;

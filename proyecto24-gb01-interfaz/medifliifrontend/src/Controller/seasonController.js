import axios from "axios";
import { constantesComunes } from "../Config/constantesComunes";

const API_URL = constantesComunes.URLContenido; // URL base del microservicio
const path = "seasons"; // Ruta específica para temporadas

const seasonsService = {

  // Añadir una temporada
  addSeason: async (seasonData) => {
    const formData = new URLSearchParams();
    formData.append("idSeries", seasonData.idSeries);
    formData.append("title", seasonData.title);
    formData.append("seasonNumber", seasonData.seasonNumber);

    const response = await axios.post(`${API_URL}${path}`, formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data;
  },

  // Actualizar una temporada por formulario
  updateSeasonForm: async (idSeason,seasonData) => {
    const formData = new URLSearchParams();
    
    formData.append("idSeason", idSeason);
    formData.append("idSeries", seasonData.idSeries);
    formData.append("title", seasonData.title);
    formData.append("seasonNumber", seasonData.seasonNumber);

    const response = await axios.post(`${API_URL}${path}`, formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data;
  },

  // Actualizar una temporada directamente
  updateSeason: async (idSeason, updateData) => {
    const response = await axios.put(`${API_URL}${path}/${idSeason}`, updateData,{
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });
    return response.data;
  },

  // Eliminar una temporada
  deleteSeason: async (idSeason) => {
    const formData = new URLSearchParams();
    formData.append("idSeason", idSeason);

    const response = await axios.delete(`${API_URL}${path}/${idSeason}`,
      // headers: { "Content-Type": "application/x-www-form-urlencoded" },
    );
    return response.data;
  },

  // Obtener temporada por ID
  getSeasonById: async (idSeason) => {
    const response = await axios.get(`${API_URL}${path}/${idSeason}`);
    return response.data;
  },

  // Obtener capítulos de una temporada
  getSeasonChapters: async (idSeason) => {
    const response = await axios.get(`${API_URL}${path}/chapters`, {
      params: { idSeason },
    });
    return response.data;
  },

  // Obtener personajes de una temporada
  getSeasonCharacters: async (idSeason) => {
    const response = await axios.get(`${API_URL}${path}/characters`, {
      params: { idSeason },
    });
    return response.data;
  },

  // Obtener participantes de una temporada
  getSeasonParticipants: async (idSeason) => {
    const response = await axios.get(`${API_URL}${path}/participants`, {
      params: { idSeason },
    });
    return response.data;
  },

  // Asociar un tráiler a una temporada
  addTrailerToSeason: async (idSeason, idTrailer) => {
    const response = await axios.put(`${API_URL}${path}/${idSeason}/trailer`, {
      idTrailer,
    });
    return response.data;
  },

  // Eliminar un tráiler de una temporada
  removeTrailerFromSeason: async (idSeason) => {
    const response = await axios.delete(`${API_URL}${path}/${idSeason}/trailer`);
    return response.data;
  },

  // Asociar una categoría a una temporada
  addCategoryToSeason: async (idSeason, idCategory) => {
    const response = await axios.put(`${API_URL}${path}/${idSeason}/category`, {
      idCategory,
    });
    return response.data;
  },

  // Eliminar una categoría de una temporada
  removeCategoryFromSeason: async (idSeason, idCategory) => {
    const response = await axios.delete(`${API_URL}${path}/${idSeason}/category`, {
      data: { idCategory },
    });
    return response.data;
  },

  // Asociar un capítulo a una temporada
  addChapterToSeason: async (idSeason, idChapter) => {
    const response = await axios.put(`${API_URL}${path}/${idSeason}/chapter`, {
      idChapter,
    });
    return response.data;
  },

  // Eliminar un capítulo de una temporada
  removeChapterFromSeason: async (idSeason, idChapter) => {
    const response = await axios.delete(`${API_URL}${path}/${idSeason}/chapter`, {
      data: { idChapter },
    });
    return response.data;
  },

  // Actualizar la serie asociada a una temporada
  updateSeasonSeries: async (idSeason, idSeries) => {
    const response = await axios.put(`${API_URL}${path}/${idSeason}/series`, {
      idSeries,
    });
    return response.data;
  },
};

export default seasonsService;

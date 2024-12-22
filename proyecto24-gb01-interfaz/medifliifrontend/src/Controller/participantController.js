import axios from 'axios';
import { constantesComunes } from '../Config/constantesComunes';

const API_URL = constantesComunes.URLContenido;
const path = 'participants';

const participantsService = {
  // Añadir un participante
  addParticipant: async (participant) => {
    const formData = new URLSearchParams();
    formData.append('name', participant.name);
    formData.append('surname', participant.surname);
    formData.append('age', participant.age);
    formData.append('nationality', participant.nationality);

    const response = await axios.post(`${API_URL}${path}/addParticipant`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },

  // Actualizar un participante
  updateParticipant: async (participant) => {
    const formData = new URLSearchParams();
    formData.append('_method', 'PUT');
    formData.append('idParticipant', participant.idParticipant);
    if (participant.name) formData.append('name', participant.name);
    if (participant.surname) formData.append('surname', participant.surname);
    if (participant.age) formData.append('age', participant.age);
    if (participant.nationality) formData.append('nationality', participant.nationality);

    const response = await axios.post(`${API_URL}${path}/updateParticipant`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },

  // Eliminar un participante
  deleteParticipant: async (idParticipant) => {
    const formData = new URLSearchParams();
    formData.append('_method', 'DELETE');
    formData.append('idParticipant', idParticipant);

    const response = await axios.post(`${API_URL}${path}/deleteParticipant`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },

  // Obtener participante por nombre
  getParticipantByName: async (name) => {
    const response = await axios.get(`${API_URL}${path}/getParticipantByName`, {
      params: { name },
    });
    return response.data;
  },

  // Obtener participante por apellido
  getParticipantBySurname: async (surname) => {
    const response = await axios.get(`${API_URL}${path}/getParticipantBySurname`, {
      params: { surname },
    });
    return response.data;
  },

  // Obtener participante por edad
  getParticipantByAge: async (age) => {
    const response = await axios.get(`${API_URL}${path}/getParticipantByAge`, {
      params: { age },
    });
    return response.data;
  },

  // Obtener participante por nacionalidad
  getParticipantByNationality: async (nationality) => {
    const response = await axios.get(`${API_URL}${path}/getParticipantByNationality`, {
      params: { nationality },
    });
    return response.data;
  },

  // Obtener participante por ID
  getParticipantById: async (idParticipant) => {
    const response = await axios.get(`${API_URL}${path}/getParticipantById`, {
      params: { idParticipant },
    });
    return response.data;
  },

  // Obtener contenido relacionado con un participante
  getContentByParticipant: async (idParticipant) => {
    const response = await axios.get(`${API_URL}${path}/content`, {
      params: { idParticipant },
    });
    return response.data;
  },

  // Obtener todos los participantes
  getAllParticipants: async () => {
    const response = await axios.get(`${API_URL}${path}/getAllParticipants`);
    return response.data;
  },
};

export default participantsService;

import axios from 'axios';
import { constantesComunes } from '../Config/constantesComunes';

const API_URL = constantesComunes.URL_Usuarios; // Define la URL base para los endpoints
const path = "creditcards";

const creditCardService = {
    // Añadir una nueva tarjeta de crédito
    addCreditCard: async (creditCard) => {
        const response = await axios.post(`${API_URL}${path}`, creditCard, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    },

    // Obtener tarjeta de crédito por IBAN
    getCreditCardByIBAN: async (IBAN) => {
        const response = await axios.get(`${API_URL}${path}/${IBAN}`);
        return response.data;
    },

    // Actualizar una tarjeta de crédito por IBAN
    updateCreditCardByIBAN: async (IBAN, updatedCreditCard) => {
        const response = await axios.put(`${API_URL}${path}/${IBAN}`, updatedCreditCard, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    },

    // Eliminar una tarjeta de crédito por IBAN
    deleteCreditCardByIBAN: async (IBAN) => {
        const response = await axios.delete(`${API_URL}${path}/${IBAN}`);
        return response.data;
    },

    // Obtener todas las tarjetas de crédito del usuario actual
    getMyCreditCards: async () => {
        const response = await axios.get(`${API_URL}${path}/my`); // Considera que el endpoint '/my' devuelve las tarjetas del usuario actual
        return response.data;
    }
};

export default creditCardService;

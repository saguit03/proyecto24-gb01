import axios from 'axios';
import { constantesComunes } from '../Config/constantesComunes';
import { createContext } from 'react';

const API_URL = constantesComunes.URL_Usuarios;
const path = "users";


const usersService = {
    // Crear un nuevo usuario
    addUser: async (user) => {
        
        const response = await axios.post(`${API_URL}${path}`, user, {
    headers: { 'Content-Type': 'application/json' },
    });
        return response;
    },
    addUserForm: async (name, surname, username, email, password) => {
        const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    
        const response = await axios.post(`${API_URL}${path}`, formData,{
            
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
        console.log(formData.toString())
    // let href = usersService.createSearchURL(`${API_URL}${path}`, formData.toString())
    // const response = await axios.post(href, {
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //     });
    return response;
    },
    createSearchURL: (path, queryParams)=>{
        return `${path}?${queryParams}`
    },
    // Iniciar sesión
    userLogin: async (userCredentials) => {
    const response = await axios.post(`${API_URL}${path}/login`, userCredentials, {
        
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  },

    // Actualizar un usuario
    putProfile: async (idUser, username, email, password) => {
        const formData = new URLSearchParams();
        formData.append("idUser", idUser);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);

        const response = await axios.put(`${API_URL}${path}/${idUser}`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        });
        return response.data;
    },
    // Actualizar usuario por ID
    actualizarUsuario: async (id, usuario) => {
        const response = await axios.put(`${API_URL}${path}/${id}`, usuario, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    },

    deleteUser: async (idUser) => {
        const response = await axios.delete(`${API_URL}${path}/${idUser}`);
        return response.data;
    },

    deleteUserForm: async (idUser) => {
        const formData = new URLSearchParams();
        formData.append("idUser", idUser);
        

        const response = await axios.delete(`${API_URL}${path}`, {
            data: formData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        });
        return response.data;
    },
    getAllUsers: async()=>{
        const response = await axios.get(`${API_URL}${path}`)
        return response.data;
    }
};

export default usersService;
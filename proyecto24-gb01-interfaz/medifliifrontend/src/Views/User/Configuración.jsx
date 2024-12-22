import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Configuración() {
   return (
        <main>
            <h1 className="titulo-configuracion">CONFIGURACIÓN DE LA CUENTA</h1>
            <div className="contenedor-perfil">
                <section className="card-perfil">
                    <h2>Información del usuario</h2>
                    <p>Actualiza tus datos personales.</p>
                    <NavLink to="editUser">Modificar usuario</NavLink>
                </section>
                
                <section className="card-perfil">
                    <h2>Ver mi perfil</h2>
                    <p>Mira la información que tienes configurada.</p>
                    <NavLink to="myProfile">Ver perfil</NavLink>
                </section>

                <section className="card-perfil">
                    <h2>Modificar mi perfil</h2>
                    <p>Configura la información que tienes de tu perfil.</p>
                    <NavLink to="editProfile">Editar perfil</NavLink>
                </section>

                <section className="card-perfil">
                    <h2>Ver mi perfil</h2>
                    <p>Mira la información que tienes configurada.</p>
                    <NavLink to="/app/profiles/selectProfile">Cambiar de perfil</NavLink>
                </section>

                <section className="card-perfil">
                    <h2>Eliminar mi perfil</h2>
                    <p>Mira la información que tienes configurada.</p>
                    <NavLink to="/app/user/config/profiles/deleteProfile">Eliminar perfil</NavLink>
                </section>

                <section className="card-perfil">
                    <h2>Añadir película</h2>
                    <p>Añade una nueva película al catálogo.</p>
                    <NavLink to="/app/user/config/movies/createMovie">Añadir película</NavLink>
                </section>

                <section className="card-perfil">
                    <h2>Ver película</h2>
                    <p>Busca todas las películas del catálogo.</p>
                    <NavLink to="/app/search">Buscar películas</NavLink>
                </section>

                <section className="card-perfil">
                    <h2>Eliminar película</h2>
                    <p>Eliminar las películas del catálogo.</p>
                    <NavLink to="/app/movies/delete">Eliminar películas</NavLink>
                </section>

                <section className="card-perfil">
                    <h2>Actualizar información de películas</h2>
                    <p>Modificar las series del catálogo.</p>
                    <NavLink to="/app/movies/update">Modificar películas</NavLink>
                </section>

                <section className="card-perfil">
                    <h2>Añadir serie</h2>
                    <p>Añade una nueva serie al catálogo.</p>
                    <NavLink to="/app/series/create">Añadir película</NavLink>
                </section>

                <section className="card-perfil">
                    <h2>Ver serie</h2>
                    <p>Busca todas las series del catálogo.</p>
                    <NavLink to="/app/search">Buscar serie</NavLink>
                </section>

                <section className="card-perfil">
                    <h2>Eliminar serie</h2>
                    <p>Eliminar las series del catálogo.</p>
                    <NavLink to="/app/series/delete">Eliminar serie</NavLink>
                </section>

                <section className="card-perfil">
                    <h2>Actualizar información de serie</h2>
                    <p>Modificar las serie del catálogo.</p>
                    <NavLink to="/app/series/update">Modificar serie</NavLink>
                </section>

                <section className="card-perfil">
                    <h2>Mis reviews</h2>
                    <p>Mira las reviews que has creado.</p>
                    <NavLink to="/app/user/mis-reviews">Mis reviews</NavLink>
                </section>
                <section className="card-perfil">
                    <h2>Eliminar season</h2>
                    <p>Elimina las seasons que quieras.</p>
                    <NavLink to="/app/seasons/delete">Eliminar seasons</NavLink>
                </section>
                <section className="card-perfil">
                    <h2>Modificar season</h2>
                    <p>Modificar las seasons que quieras.</p>
                    <NavLink to="/app/seasons/update">Modificar seasons</NavLink>
                </section>
                <section className="card-perfil">
                    <h2>Crear season</h2>
                    <p>Crear las seasons que quieras.</p>
                    <NavLink to="/app/seasons/add">Crear seasons</NavLink>
                </section>


                <section className="card-perfil">
                    <h2>Eliminar capitulos</h2>
                    <p>Elimina las capitulos que quieras.</p>
                    <NavLink to="/app/chapters/delete">Eliminar capitulos</NavLink>
                </section>
                <section className="card-perfil">
                    <h2>Modificar capitulos</h2>
                    <p>Modificar las capitulos que quieras.</p>
                    <NavLink to="/app/chapters/update">Modificar capitulos</NavLink>
                </section>
                <section className="card-perfil">
                    <h2>Crear capitulos</h2>
                    <p>Crear las capitulos que quieras.</p>
                    <NavLink to="/app/chapters/create">Crear capitulos</NavLink>
                </section>

                
                
                <section className="card-perfil">
                    <h2>ELIMINAR CUENTA</h2>
                    <p>¡¡¡¡CUIDADO!!!</p>
                    <NavLink to="deleteUser">Eliminar cuenta</NavLink>
                </section>

                

            </div>

        </main>
    );

}

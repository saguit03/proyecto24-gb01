import React, { useContext, useEffect, useState } from 'react'
import ListCardProfile from '../Profiles/ListCardProfile'
import CardProfile from '../Profiles/CardProfile'
import ListCreditCard from '../CreditsCards/ListCreditCard'
import profilesService from '../../Controller/profileController'
import Loading from '../Loading'
import ProfileContext from '../../context/ProfileContext'

export default function CardUser({user}) {
    const [listProfiles, setListProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const {profile, setProfile} = useContext(ProfileContext)
    

  useEffect(()=>{
    profilesService.getProfilesByUserId(user.idUser).then((response)=>{
      setListProfiles(response)
      console.log(response)
    })
    console.log(profile)
    setTimeout(()=>setLoading(false),2000)
  },[user.idUser])

  return (
    <>
    {loading? <Loading />: 
    <div>

        <section className='card-content'>
            <h2>Información personal</h2>
            <img src={user.profilePicture} alt="Imagen de perfil" />
            <p>Nombre y apellidos: {user.Name} {user.Surname}</p>
            <p>Email: {user.Email}</p>
            
        </section>

        <section className='card-content'>
            <h2>Mis perfiles</h2>
            <ListCardProfile listProfiles={listProfiles}/>
        </section>

        <section className="card-content">
            <h2>Información de mi perfil</h2>
            <CardProfile profile={profile}/>
        </section>

        <section className="card-content">
            <h2>Mis método de pago</h2>
            <ListCreditCard listCreditCard={user.creditCards}/>
        </section>
    </div>
    }
    </>
  )
}

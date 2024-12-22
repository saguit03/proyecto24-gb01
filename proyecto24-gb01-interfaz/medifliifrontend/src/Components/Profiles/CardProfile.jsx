import React from 'react'

export default function CardProfile({profile}) {
  return (
    <div className = "card-profile" >
      <p>Nombre perfil: {profile.profileName}</p>
    </div>
  )
}

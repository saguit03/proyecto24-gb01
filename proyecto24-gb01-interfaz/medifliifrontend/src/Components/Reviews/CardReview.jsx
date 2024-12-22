import React, { useEffect, useState } from 'react'
import usersService from '../../Controller/userController'
import profilesService from '../../Controller/profileController'
import Loading from '../Loading'

export default function CardReview({review}) {
  const [loading, setLoading] = useState(true)
  const [profileName, setProfileName] = useState('')
  useEffect(()=>{
    console.log(review.idProfile)
    profilesService.getProfileById(review.idProfile).then(response=>{
      setProfileName(response.profileName)
      console.log(response)
    }).catch(err=>{
      console.log(err)
    })
    .finally(()=> setLoading(false))
  },[])
  return (
    <>
      {loading? <Loading/> : 
      <> 
        <div className = "card-review" >
          <p>Usuario: {profileName}</p>
          <p>Rating: {review.rating}</p>
          <p>Comentario: {review.commentary}</p>
        </div>
      </>}
    </>
    
  )
}

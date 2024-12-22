import React, { useContext, useEffect, useState } from 'react'
import profilesService from '../../Controller/profileController'
import ProfileContext from '../../context/ProfileContext'
import Loading from '../Loading'
import UpdateButton from '../Buttons/UpdateButton'
import { useNavigate } from 'react-router-dom'
import DeleteButton from '../Buttons/DeleteButton'
import reviewsService from '../../Controller/reviewController'

export default function CardConfigReview({review}) {
    const {profile, setProfile} = useContext(ProfileContext)
    const [loading, setLoading] = useState(false)
  const [profileName, setProfileName] = useState('')
  const navigate = useNavigate()
  const handleUpdate = ()=>{
    navigate(`/app/reviews/update/${review.idReview}`)
  }
  const handleDelete = ()=>{
    reviewsService.deleteReview(review.idReview).then(response =>{
      if(response.status === 200){
        alert('Review deleted')
        navigate("/app/user/mis-reviews")
      }

    })
  }
  return (
    <>
      {loading? <Loading/> : 
      <> 
        <div className = "card-review" >
          <p>Usuario: {profile.profileName}</p>
          <p>Rating: {review.rating}</p>
          <p>Comentario: {review.commentary}</p>

          <UpdateButton handleFunction={handleUpdate} componentName={"review"}/>
          <DeleteButton handleFunction={handleDelete} componentName={"review"} />
        </div>
      </>}
    </>
    
  )
}

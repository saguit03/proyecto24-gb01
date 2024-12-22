import React, { useContext, useEffect, useState } from 'react'
import ProfileContext from '../../context/ProfileContext'
import reviewsService from '../../Controller/reviewController'
import Loading from '../../Components/Loading'
import ListCardConfigReviews from '../../Components/Reviews/ListCardConfigReviews'

export default function MisReviews() {
    const {profile, setProfile} = useContext(ProfileContext)
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(()=>{
        reviewsService.getReviewsByProfileId(profile['id-profile']).then(response=>
        {
            setReviews(response)
        }).catch(err=>{
            console.log(err)
            setError(err)
        }).finally(()=> {
            setLoading(false)
            console.log(reviews)
            })
    },[])
  return (
        <>
            {loading? <Loading/> :
            <>
            <ListCardConfigReviews listReviews={reviews}/>
            </>}
        </>
  )
}

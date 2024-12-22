import React, { useContext, useState } from 'react'
import ProfileContext from '../../context/ProfileContext'
import { useNavigate } from 'react-router-dom'

export default function PopOverPinProfile({tryProfile}) {
    const navigate = useNavigate()
    const [pin, setPin] = useState(0)
  const {profile, setProfile} = useContext(ProfileContext)
  const handlePin = (event)=>{
    event.preventDefault()

    if(pin === tryProfile.Pin){
      setProfile(tryProfile)
      setTimeout(()=>console.log(profile),2000)
      navigate("/app/user/config")
    }
    else{
      alert('Pin is incorrect')
    }
  }

  return (
    <div popover="auto" id={`profileID${tryProfile['id-profile']}`}>
        <form action="" onSubmit={handlePin}>
          <label htmlFor="pin">Introduce el pin: </label>
          <input type="number" name="pin" id="pin" maxLength={4} onInput={(e)=> setPin(e.target.value)} />
        </form>
    </div>
  )
}

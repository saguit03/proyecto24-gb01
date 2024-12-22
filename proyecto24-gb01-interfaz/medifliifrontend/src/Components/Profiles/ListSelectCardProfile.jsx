import React from 'react'
import SelectCardProfile from './SelectCardProfile'

export default function ListSelectCardProfile({listProfiles}) {
  return (
    <>
    {listProfiles.map((profile,index)=>{
      return (<SelectCardProfile key={index} prof={profile}/>)
    })}
    </>
  )
}

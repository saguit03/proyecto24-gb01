import React from 'react'
import CardProfile from './CardProfile'

export default function ListCardProfile({listProfiles}) {
  return (
    <div className="list-profile">
    {listProfiles.map((profile,index)=>{
      return (<CardProfile key={index} profile={profile}/>)
    })}
    </div>
  )
}

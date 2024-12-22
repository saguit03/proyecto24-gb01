import React from 'react'
import { useNavigate } from 'react-router-dom'
import funcionesComunes from '../../Config/funcionesComunes'

export default function SearchSimpleContentForm() {
    const navigate = useNavigate()
    const handleSearch = (e)=>{
    e.preventDefault()
    const {name, value} = e.target.search
    const searchParam = new URLSearchParams()
    searchParam.append("title", value)
    const query = funcionesComunes.search(e.target)
    
    navigate(`/app/search?${searchParam.toString()}`)
  }
  return (
    <>
    <form action="" method="get" className='search-header' onSubmit={handleSearch}>
            <input type="text" name="search" id="search" className='button-redondeado'/>
    </form>
    </>
  )
}

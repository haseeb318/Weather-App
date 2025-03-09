import React from 'react'

const Search = ({setSearch,handleSearch}) => {
  return (
    <>
    <div className='search'>
        <input type='text' 
        placeholder='Enter Country Name'
        onChange={()=>setSearch(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
    </div>
    </>
  )
}

export default Search
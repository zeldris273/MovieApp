import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const SearchPage = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const respone = await axios.get("/search/multi", {
        params: {
          query: location?.search?.slice(3),
          page: 1
        }
      })
      setData((prev) => {
        return [
          ...prev,
          ...respone.data.results
        ]
      })
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    setPage(1)
    setData([])
    fetchData()
  }, [location?.search])

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        setPage(prev => prev + 1)
    }
}

useEffect(() => {
      fetchData()
}, [page])

useEffect(() => {
  window.addEventListener('scroll', handleScroll)
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [])


  return (
    <div className='pt-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input 
        type='text'
        placeholder='Search here...'
        onChange={(e) => navigate(`/search?q=${e.target.value}`)}
        className='px-4 py-1 text-lg w-full bg-white rounded-full'
        />
      </div>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>
        <div className='grid grid-cols-[repeat(auto-fit,260px)] gap-6 justify-center lg:justify-start text-neutral-900'>
          {
            data.map((searchData, index) => {
              return (
                <Card data={searchData} key={data.id + "search"} media_type={searchData.media_type} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage

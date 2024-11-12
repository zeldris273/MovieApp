import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBannerData } from './store/movieSlice';

function App() {

  const dispatch = useDispatch()

  const fetchTrendingData = async() => {
    try {
      const respone = await axios.get('/trending/all/week')

      dispatch(setBannerData())

      console.log("respone: ", respone.data)
    } catch (error) {
      console.log("error: ", error)
    }
  }

  useEffect(() => {
    fetchTrendingData()
  },[])

  return (
    <main className='pb-14 lg:bg-0'>
      <Header />
      <div className='pt-16'>
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation/>
    </main>
  );
}

export default App;

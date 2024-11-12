import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios';
import { useEffect } from 'react';

function App() {


  const fetchTrendingData = async() => {
    try {
      const respone = await axios.get('/trending/all/week')


      console.log("respone: ", respone)
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

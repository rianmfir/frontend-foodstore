import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components'
import { Account, Dashboard, Home, Login, Register } from './pages';
import './App.css'
import Routing from './router';
import { useEffect } from 'react';
import { listen } from './app/listener';

const App = () => {

  // useEffect(() => {
  //   listen();
  // }, [])



  return (
    <div>

      <Routing />

    </div >
  )
}
export default App;

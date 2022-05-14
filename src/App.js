import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components'
import { Account, Dashboard, Home, Login, Register } from './pages';
import './App.css'
import Routing from './router';


const App = () => {
  return (
    <div>

      <Routing />
      {/* 
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/" element={<Account />} />
        <Route exact path="/" element={<TesSideBar />}>
        </Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes> */}
    </div >
  )
}
export default App;

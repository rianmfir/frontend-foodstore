import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components'
import { Account, Home, Login, Register } from './pages';
import './App.css'

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/" element={<Account />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
export default App;

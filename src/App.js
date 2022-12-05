import Routing from './router';
import axios from 'axios';

const App = () => {

  // axios.defaults.baseURL = "http://localhost:3000/";
  // axios.defaults.baseURL = "https://backend--foodstore.herokuapp.com/";
  axios.defaults.baseURL = "https://api-foodstore.up.railway.app/";
  return (
    <div>
      <Routing />
    </div >
  )
}
export default App;

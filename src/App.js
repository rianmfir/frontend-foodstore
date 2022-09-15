import Routing from './router';
import axios from 'axios';

const App = () => {

  // axios.defaults.baseURL = "http://localhost:3000/";
  axios.defaults.baseURL = "https://backend--foodstore.herokuapp.com/";
  return (
    <div>
      <Routing />
    </div >
  )
}
export default App;

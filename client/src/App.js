import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import Created from './Components/Created';
import Details from './Components/Details';


function App() {
  return (
  <div className="App">
    <BrowserRouter>
    
      <Routes>
        <Route exact path='/' element= { <LandingPage/> }/>
        <Route path ='/home' element = { <Home/> }/>
        <Route path = '/create' element = { <Created/>} />
        <Route path= '/pokemon/:id' element = {<Details/>} />
      </Routes>
    
    </BrowserRouter>
    </div>
  );
}

export default App;

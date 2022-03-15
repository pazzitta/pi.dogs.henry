import { Route } from 'react-router-dom';
import './App.css';
//import Cards from './components/Cards.jsx';
import LandingPage from './Components/LandingPage/LandingPage';
import Homepage from './Components/Home/Home/Home';
import NewRace from './Components/RutaCreacion/NewRace';
import DetailRace from './Components/RutaDetalle/DetailRace'



function App() {
  return (
    <div className="App">
     <Route exact path= '/' component={LandingPage}/>
     <Route path= '/home' component={Homepage} />
     <Route path= '/create' component={NewRace} />
     <Route path='/detail/:id' component={DetailRace} />
    </div>
  );
}

export default App;

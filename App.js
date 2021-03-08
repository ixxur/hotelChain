import React from 'react';
import './App.css';
import Nav from './Nav';
import Home from './Home';
import Hotel from './Hotel';
import Client from './Client';
import Angajat from './Angajat';
import Camera from './Camera';
import Tip_camera from './Tip_camera';
import Rezervare from './Rezervare';
import Regim_cazare from './Regim_cazare';
import Plata from './Plata';
import Subd from './Subd';
import Subc from './Subc';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/hotel" component={Hotel}/>
        <Route path="/angajat" component={Angajat}/>
        <Route path="/client" component={Client}/>
        <Route path="/camera" component={Camera}/>
        <Route path="/tip_camera" component={Tip_camera}/>
        <Route path="/rezervare" component={Rezervare}/>
        <Route path="/regim_cazare" component={Regim_cazare}/>
        <Route path="/plata" component={Plata}/>
        <Route path="/subd" component={Subd}/>
        <Route path="/subc" component={Subc}/>
        </Switch>
      </div>
    </Router>
  );
}


export default App;

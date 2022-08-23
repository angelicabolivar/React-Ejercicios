import React from 'react';
import CrudApp from "./Components/CrudApp";
import CrudApi from './Components/CrudApi';
import SongSearch from './Components/SongSearch';
import Transiciones from './Components/Transiciones';


function App() {
  return (
    <>
      <h1>Ejercicios React</h1>
      <hr/>
      <Transiciones/>
      <hr/>
      <SongSearch/>
      <hr/>
      <CrudApi/>
      <hr/>
      <CrudApp/>
    </>
  );
}

export default App;

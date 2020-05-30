import React from 'react';
import './App.css';
import CardsContainer from './containers/CardsContainer';
import { Title } from './components';

function App() {
  return (
    <div className="App">
      <Title title="Movie Database" />
      <CardsContainer />
    </div>
  );
}

export default App;

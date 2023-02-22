import React from 'react';
import './App.css';
import InputForm from './components/InputForm';

function App() {
  return (
    <div className="App container">
      <header className="App-header m-5">
         <h3>Delivery Price Calculator</h3>
      </header>
    
      <InputForm></InputForm>

    </div>
  );
}

export default App;

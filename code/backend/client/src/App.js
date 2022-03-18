import React from 'react';
import './App.css';
import Menus from './components/Menus/index';

function App() {
  return (
    <div className="app">
      <header className='header'>头部</header>
      <footer className='footer'>
        <Menus />
        <div className='container'>内容部分</div>
      </footer>
    </div>
  );
}

export default App;

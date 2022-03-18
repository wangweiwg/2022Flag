import React from 'react';
import styles from './App.module.css';
import Menus from './components/Menus/index';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>头部</header>
      <footer className={styles.footer}>
        <Menus />
        <div className={styles.container}>内容部分</div>
      </footer>
    </div>
  );
}

export default App;

import React from 'react';
import styles from './App.module.scss';
import Menus from './components/Menus/index';
import logo from './statics/images/logo.svg'

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img className={styles.logo} src={logo} alt="logo" />
      </header>
      <footer className={styles.footer}>
        <Menus />
        <div className={styles.container}>内容部分</div>
      </footer>
    </div>
  );
}

export default App;

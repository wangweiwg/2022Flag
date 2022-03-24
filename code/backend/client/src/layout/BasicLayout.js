
import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import styles from './index.module.scss';
import Menus from '../components/Menus/index';
import logo from '../statics/images/logo.svg'
import MenusConfig from '../router/index';

const BaiscLayout = () => {
    return (
        <div className={styles.app}>
        <header className={styles.header}>
        <img className={styles.logo} src={logo} alt="logo" />
        </header>
        <footer className={styles.footer}>
        <Menus />
        <div className={styles.container}>
            <Routes>
            {
                MenusConfig.map(item => (
                <Route key={item.path} path={ item.path } element={ item.component } />
                ))
            }
            </Routes>
        </div>
        </footer>
    </div>
    )
}

export default BaiscLayout;
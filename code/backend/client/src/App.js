import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import BaiscLayout from './layout/BasicLayout'
import Login from './containers/Login/index'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login />} />
        <Route path="/*" element={ <BaiscLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

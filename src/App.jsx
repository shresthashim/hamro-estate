import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/Signin";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path='/sign-in' element = {<SignIn/>} />
          <Route path='/sign-up' element = {<SignUp/>} />
          <Route path='/about' element = {<About/>} />
          <Route path='/profile' element = {<Profile/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
};

export default App;

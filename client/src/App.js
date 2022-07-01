import React from "react";
import "./App.css";
import "./output.css";
import "./components/SignUp";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import SignUp from './components/SignUp';
import Login from   './components/Login';
import Converter from './components/Converter';
import About from './components/About';
import MyDocuments from './components/MyDocuments';
import SavedDocConverter from './components/SavedDocConverter';
import Homepage from './components/Homepage';

function App() {

  
  return (
    <>     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/convert" element={<Converter />} />
          <Route path="/about" element={<About />} />
          <Route path="/documents" element={<MyDocuments />} />
          <Route path="/convert/saved" element={<SavedDocConverter />} />
        </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;

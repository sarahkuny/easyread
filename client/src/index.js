import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import SignUp from './components/SignUp';
import Login from   './components/Login';
import Converter from './components/Converter';
import About from './components/About';
import MyDocuments from './components/MyDocuments';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/convert" element={<Converter />} />
      <Route path="/about" element={<About />} />
      <Route path="/documents" element={<MyDocuments />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


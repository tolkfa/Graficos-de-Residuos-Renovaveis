import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Teste2 from './pages/Teste2';
import Teste3 from './pages/Teste3';
import CriarConta from './pages/CriarConta';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teste2" element={<Teste2 />} />
      <Route path="/teste3" element={<Teste3 />} />
      <Route path="/criarconta" element={<CriarConta />} />
    </Routes>
  );
}

export default App;
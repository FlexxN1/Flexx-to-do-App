import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Home/HomePage';


function App() {
  
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<p>NotFound</p>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
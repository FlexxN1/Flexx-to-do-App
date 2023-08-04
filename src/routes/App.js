import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import {HomePage} from './Home/HomePage';
import {NewTodoPage} from './new/newTodoPage';
import {EditTodoPage} from './edit/EditTodoPage';


function App() {
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewTodoPage />} />
        <Route path="/edit/:id" element={<EditTodoPage />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </HashRouter>
  );
}

export {App};
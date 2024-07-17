import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AddUser from './components/Add';
import UpdateUser from './components/Update';
import Notfound from './components/Notfound';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/add' element={<PrivateRoute element={<AddUser />} />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
        <Route path='/update/:id' element={<PrivateRoute element={<UpdateUser/>} />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default App;
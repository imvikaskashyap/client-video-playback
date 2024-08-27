import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFoundPage';
import Videos from './pages/Videos';
import Upload from './pages/Upload';
import HomePage from './pages/Home';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/videos" element={<ProtectedRoute element={<Videos />} />} />
        <Route path="/upload" element={<ProtectedRoute element={<Upload />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Videos from './components/Videos';
import Upload from './components/Upload';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFoundPage';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Videos />} />} />
        <Route path="/upload" element={<ProtectedRoute element={<Upload />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

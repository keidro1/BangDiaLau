import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MusicPage from '../pages/MusicPage';
import FavoritePage from '../pages/FavoritePage';
import ProfilePage from '../pages/ProfilePage';
import LoadingLoginPage from '../pages/LoadingLoginPage';

const App = () => {
  console.log(import.meta.env.CLIENT_ID);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/music/:id" element={<MusicPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/callback" element={<LoadingLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MusicPage from './pages/MusicPage';
import FavoritePage from './pages/FavoritePage';
import ProfilePage from './pages/ProfilePage';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/music/:id" element={<MusicPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;

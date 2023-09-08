import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MusicPage from '../pages/MusicPage';
import FavoritePage from '../pages/FavoritePage';
import ProfilePage from '../pages/ProfilePage';
import LoadingLoginPage from '../pages/LoadingLoginPage';
import { useAppDispatch, useAppSelector } from './store';
import { checkLogin, getAuthInfo } from '../services/auth';
import { fetchAuthInfo, fetchUserInfo } from './authReducers';

const App = () => {
  const isLogin = useAppSelector(state => state.authReducers.isLogin);
  const dispatch = useAppDispatch();
  const [retryCheckLogin, setRetryCheckLogin] = useState(false);
  if (!retryCheckLogin && !isLogin) {
      setRetryCheckLogin(_ => {
        dispatch(fetchAuthInfo(""));
        return true;
      });
  }
  useEffect(() => {
    if (isLogin) {
      dispatch(fetchUserInfo());
    }
  }, [isLogin]);
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

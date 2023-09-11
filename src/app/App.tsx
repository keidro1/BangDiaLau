import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MusicPage from '../pages/MusicPage';
import FavoritePage from '../pages/FavoritePage';
import ProfilePage from '../pages/ProfilePage';
import LoadingLoginPage from '../pages/LoadingLoginPage';
import { useAppDispatch, useAppSelector } from './store';
import { fetchAuthInfo, fetchUserInfo } from './authReducers';
import { getCurrentUserPlaylist } from '../services/playlist';
import { getUserPlaylistWithQuery } from './playlistReducers';
import { getTrackById } from './trackReducers';
import { getCurrentUserPlayingTrack, setTrack } from './appReducers';

const App = () => {
  const isLogin = useAppSelector(state => state.authReducers.isLogin);
  const track = useAppSelector(state => state.trackReducers.track);

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
      dispatch(getUserPlaylistWithQuery({offset: 0}));
      dispatch(getCurrentUserPlayingTrack());
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

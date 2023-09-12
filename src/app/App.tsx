import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoadingLoginPage from '../pages/LoadingLoginPage';
import { useAppDispatch, useAppSelector } from './store';
import { fetchAuthInfo, fetchUserInfo } from './authReducers';
import { getUserPlaylistWithQuery } from './playlistReducers';
import { getCurrentUserPlayingTrack, setCurrentPlayingPlaylistItem, setCurrentPlayingTrackId, setTrack } from './appReducers';

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
      dispatch(getUserPlaylistWithQuery({offset: 0}));
      dispatch(getCurrentUserPlayingTrack());
    } else {
      dispatch(setCurrentPlayingTrackId(null));
      dispatch(setTrack(null));
      dispatch(setCurrentPlayingPlaylistItem(-1));

    }
  }, [isLogin]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/callback" element={<LoadingLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

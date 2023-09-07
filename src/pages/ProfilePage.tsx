import React, { useEffect } from 'react';
import { getCurrentUserInfo } from '../services/user';

const ProfilePage = () => {
  useEffect(() => {
    getCurrentUserInfo();
  }, []);
  return (
    <div>
      <h2>Trang cá nhân</h2>

    </div>
  );
}

export default ProfilePage;

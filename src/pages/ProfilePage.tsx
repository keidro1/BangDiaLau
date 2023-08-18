import React, { useEffect } from 'react';
import { getCurrentUserInfo } from '../services/user';

const ProfilePage = () => {
  useEffect(() => {
    getCurrentUserInfo();
  }, []);
  return (
    <div>
      <h2>Trang cá nhân</h2>
      {/* Hiển thị thông tin cá nhân và danh sách bài hát đã nghe/yêu thích */}
    </div>
  );
}

export default ProfilePage;

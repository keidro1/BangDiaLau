import React from 'react';
import { useParams } from 'react-router-dom';

const MusicPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Thông tin bài hát {id}</h2>
    
    </div>
  );
}

export default MusicPage;

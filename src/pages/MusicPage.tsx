import { useParams } from 'react-router-dom';

const MusicPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Thông tin bài hát {id}</h2>
      {/* Hiển thị thông tin và điều khiển nhạc */}
    </div>
  );
}

export default MusicPage;

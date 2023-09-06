import React from 'react';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import Center from '../components/Center';

function HomePage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main className="flex">
        <Center />
      </main>
      <div className="sticky bottom-0 text-white">
        <Player />
      </div>
    </div>
  );
}

export default HomePage;

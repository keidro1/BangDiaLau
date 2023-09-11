import React from 'react';
import Song from '../components/Song'
import { useAppSelector } from '../app/store';


function Center() {
	
	const userPlaylists = useAppSelector(state => state.playlistReducers.userPlaylist); // Lấy thông tin danh sách playlists từ Redux

	return (
		<div className='bg-gradient-to-b from-green-600 flex-grow text-white relative h-screen overflow-y-scroll scrollbar-hidden'>
			
		<h1 className="ml-10 max-w-md h-50 text-green-400 leading-loose tracking-wider md:text-4xl lg:text-6xl x1:text-6xl p-8">Welcome to Bang Dia Lau </h1>
			
			<section className='flex items-end space-x-7 h-80 p-8'>
        
				<img src={userPlaylists?.items[0]?.images[0]?.url} alt="Playlist Image" className='h-40 w-40 shadow-xl' />

        		<div className="playlists">
          			<p>PLAYLIST</p>
          			<h1 className='text-2xl font-bold md:text-3xl xl:text-5xl cursor-pointer'>
					  {userPlaylists?.items[0]?.name}
          			</h1>
        		</div>
      		</section>

			<div>
				<Song/>
				<Song/>
				<Song/>	
			</div>

		</div>
	)
}

export default Center
import React from 'react';
import { useAppSelector } from '../app/store';
import { FaSmile } from 'react-icons/fa';

function Song() {
const searchResults = useAppSelector(state => state.searchReducers.searchTrack);

	return (
		<div
			className='grid grid-cols-2 text-gray-500 px-5 py-4 hover:bg-gray-800 rounded-lg cursor-pointer'
		>

			<div className='flex items-center space-x-4'>
							<p>No. 1</p>
							<div>
								<img
									src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoHUjJV3UiI7rsFU9WPciOsJUF7Xz9dR5SUA&usqp=CAU"|| ''}
									alt='track cover'
									height='40px'
									width='40px'
								/>
							</div>
							<div>
								<p className='w-36 lg:w-72 truncate text-white'>Track Name</p>
								<p className='w-40'>Artist Name</p>
							</div>
			</div>

			<div className='flex justify-between items-center ml-auto md:ml-0'>
				<p className='hidden md:block w-40'>Album Name</p>
				<FaSmile className='icon-playback' /*onClick={handlePlayPause}*/ />
			</div>

			{/* {searchResults ? (
  				<div>
    				{searchResults.tracks.map((track) => (
						<div className="">
							<div key={track.id} className="flex items-center space-x-4">
        						<img
          						src={track.images[0]?.url || ''}
          						alt={`Image of ${track.name}`}
          						className="h-12 w-12 rounded-full object-cover object-center"
        						/>
        						<p className='w-36 lg:w-72 truncate text-white'>{track?.name}</p>
        						<p className='w-40'>{track?.artists[0].name}</p>
      						</div>
						</div>
      					
    				))}
  				</div>
				
			) : (
  			<p>No results found</p>
			)} */}
		</div>
	)
}

export default Song;
import React from 'react';
import { useAppSelector } from '../app/store';

function Song() {
const searchResults = useAppSelector(state => state.searchReducers.searchTrack);

	return (
		<div
			className='grid grid-cols-2 text-gray-500 px-5 py-4 hover:bg-gray-900 rounded-lg cursor-pointer'
		>
			{searchResults ? (
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
			)}
		</div>
	)
}

export default Song;
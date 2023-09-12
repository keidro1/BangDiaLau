import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { FaSmile } from 'react-icons/fa';
import { Track } from '../services/track';
import { setTrack } from '../app/appReducers';

const Song = (props: {track: Track}) => {
	const track = props.track;
	const dispatch = useAppDispatch();
	console.log(track);
	return (
		<div
			className='grid grid-cols-2 text-gray-500 px-5 py-4 hover:bg-gray-800 rounded-lg cursor-pointer'
			onClick={() => dispatch(setTrack(track))}
		>
			<div className='flex items-center space-x-4'>
				<div>
					<img
						src={track.album.images[0].url}
						alt='track cover'
						height='40px'
						width='40px'
					/>
				</div>
				<div>
					<p className='w-36 lg:w-72 truncate text-white'>{track.name}</p>
					<p className='w-40'>{track.artists.map(e => e.name).join(', ')}</p>
				</div>
			</div>

			<div className='flex justify-between items-center ml-auto md:ml-0'>
				<p className='hidden md:block w-40'>{track.album.name}</p>
			</div>

		</div>
	)
}

export default Song;
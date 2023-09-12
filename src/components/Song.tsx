import React, { useEffect, useState, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { Track } from '../services/track';
import { setTrack } from '../app/appReducers';
import { FaPlay } from 'react-icons/fa';

const Song = (props: {track: Track, index: number}) => {
	const track = props.track;
	const dispatch = useAppDispatch();
	const currentTrackId = useAppSelector(state => state.appReducers.currentPlayingTrackId)
	const [isPlaying, setIsPlaying] = useState(false);
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => setIsPlaying(currentTrackId == track.id), [currentTrackId]);
	const handleMouseOverEvent = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsHovering(true);
	};
	const handleMouseOutEvent = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsHovering(false);
	  };
	return (
		<div
			className='grid grid-cols-2 text-gray-500 px-5 py-4 hover:bg-gray-800 rounded-lg cursor-pointer'
		>
			<div className='flex items-center space-x-4'>
				<button className='items-center' onMouseOver={handleMouseOverEvent} onMouseOut={handleMouseOutEvent}>
					{
						isPlaying ?
						<FaPlay className='icon-playback' fill='green'/>
						: isHovering ?
						<FaPlay className='icon-playback' onClick={() => dispatch(setTrack(track))}/>
						:
						<p>{props.index}</p>
					}
				</button>
				<div >
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
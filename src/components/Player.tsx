 // @ts-nocheck
 import React, { useEffect, useState } from 'react'
import {
	FaForward,
	FaPlay,
	FaReply,
	FaVolumeUp,
	FaBackward,
	FaDice,
	FaPause,
	FaVolumeDown,
	FaVolumeMute
} from 'react-icons/fa';
import { getAuthInfo } from '../services/auth';
import { useAppDispatch, useAppSelector } from '../app/store';
import { setPlaybackRepeatMode, startPlayback, togglePlaybackShuffle } from '../services/track';
import { setVolume } from '../app/appReducers';



const msToHMS = (ms: number) => {
    let seconds = ms / 1000;
    let minutes = parseInt( seconds / 60 );
    seconds = Math.ceil(seconds % 60);
	if (seconds >= 60) {
		seconds -= 60;
		minutes++;
	}
    return minutes +":"+  (seconds >= 10 ? seconds : `0${seconds}`);
}

const Player = () => {
	const dispatch = useAppDispatch();
	const [player, setPlayer] = useState(null)
	const currentTrack = useAppSelector(state => state.appReducers.currentTrack);
	const volume = useAppSelector(state => state.appReducers.volume);
	const isLogin = useAppSelector(state => state.authReducers.isLogin);

	const [isPaused, setPaused] = useState(true);
	const [repeatMode, setRepeatMode] = useState(0);
	const [shuffle, setShuffle] = useState(false);
	const [prevVolume, setPrevVolume] = useState(0);
	const [mute, setMute] = useState(false);

    const [isActive, setActive] = useState(false);
	const [isSeeking, setIsSeeking] = useState(null);
	const [deviceId, setDeviceId] = useState(null);
	const [duration, setDuration] = useState(0);
	const [position, setPosition] = useState(0);
	const [songName, setSongName] = useState('');
	const [artistName, setArtistName] = useState('');
	const [image, setImage] = useState('');
	const [_, setCurrentTimeout] = useState(null);
	useEffect(() => {
		if (!isLogin) return;
	
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;
	
		document.body.appendChild(script);
	
		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'Băng đĩa lậu',
				getOAuthToken: cb => cb(getAuthInfo()?.access_token),
				volume: 0.5,
			});
	
			setPlayer(player);
	
			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
				setActive(true);
				setDeviceId(device_id);
			});
	
			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }
                setPaused(state.paused);
				setDuration(state.duration);
				setShuffle(state.shuffle);
				setRepeatMode(state.repeat_mode);
				if (!isSeeking) setPosition(state.position);
				setSongName(state.track_window.current_track.name);
				setArtistName(state.track_window.current_track.artists.map(e => e.name).join(', '));
				setImage(state.track_window.current_track.album.images[0].url);
                player.getCurrentState().then(st => { 
                    (!st) ? setActive(false) : setActive(true) 
                });
            }));

			player.connect();
		};
	}, [isLogin]);
	
	useEffect(() => {
		if (player && isActive) {
			player.getVolume().then(v => dispatch(setVolume(v)));
		}
	}, [player, isActive]);

	useEffect(() => {
		if (currentTrack && player && isActive) {
			if (currentTrack.item) {
				if (currentTrack.context) {
					startPlayback({device_id: deviceId, context_uri: currentTrack.context.uri});
					return;
				}
				startPlayback({device_id: deviceId, uris: [currentTrack.item.uri], position_ms: currentTrack.position_ms});
				return;
			}
			startPlayback({device_id: deviceId, uris: [currentTrack.uri] });
		}
	}, [currentTrack, player, isActive]);


	useEffect(() => {
		if (!player) return;
		if (isPaused || isSeeking) return;
		setCurrentTimeout(setTimeout(() => player.getCurrentState().then(st => { 
			if (!st) return;
			setPosition(st.position);
		}), 1000));
	}, [isPaused, position, player, isSeeking]);

	const changePlaybackState = () => {
		player.togglePlay();
	}
  
	const handleVolumeChange = (newVolume) => {
		if (newVolume) {
			dispatch(setVolume(newVolume.target.value));
			player.setVolume(newVolume.target.value).then(() => {
				if (newVolume.target.value > 0) setMute(false);
			});
		}
	}

	const handleSeek = (newSeek) => {
		if (newSeek) {
			setIsSeeking(newSeek.target.value);
		}
	}

	useEffect(() => {
		if (isSeeking) {
			setCurrentTimeout(null);
			player.seek(isSeeking).then(() => setIsSeeking(null));
		}
	}, [isSeeking]);

	const skipToNext = () => {
		if (!player) return;
		player.nextTrack();
	}
	
	const skipToPrev = () => {
		if (!player) return;
		player.previousTrack();
	}
	
	const toggleShuffle = () => {
		if (!player) return;
		togglePlaybackShuffle(!shuffle, deviceId);
	}

	const changeRepeatMode = () => {
		if (!player) return;
		setPlaybackRepeatMode(repeatMode === 0 ? 'context' : 'off', deviceId);
	}

	const unMute = () => {
		dispatch(setVolume(prevVolume));
		player.setVolume(prevVolume).then(() => setMute(false));
	}
	const toggleMute = () => {
		setPrevVolume(volume);
		dispatch(setVolume(0));
		player.setVolume(0).then(() => setMute(true));
	}

	return (
		<div className='h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
			{/* Left */}
			<div className='flex items-center space-x-4'>
				<div className=' hidden md:block'>
					<img src={image} alt="Album cover" className="h-10 w-10" />
				</div>
				<div>
					<h3 className='font-bold'>{songName}</h3>
					<p className='font-light'>{artistName}</p>
				</div>
			</div>

			{/* Center */}
			<div className='flex flex-col h-full'>
				<div className='h-3/5 flex justify-evenly items-center'>

					<FaDice className='icon-playback' fill={shuffle ? 'green' : 'white'} onClick={toggleShuffle}/>
				
					<FaBackward className='icon-playback' onClick={skipToPrev}/>
			
					{ !isPaused ?
					<FaPause className='icon-playback' onClick={changePlaybackState}/>
					: <FaPlay className='icon-playback' onClick={changePlaybackState}/>
					}

					<FaForward className='icon-playback' onClick={skipToNext}/>
					
					<FaReply className='icon-playback' fill={repeatMode === 0 ? 'white' : 'green'} onClick={changeRepeatMode}/>

				</div>
				

				<div className='h-2/5 w-full flex justify-between items-center'>
       				 <span className='text-xs text-gray-300 w-10 text-left'>{msToHMS(position)}</span>
        			 <input type="range" className='w-full h-1' min={0} max={duration} step={1} value={position} onChange={handleSeek}/>
        			 <span className='text-xs text-gray-300 w-10 text-right'>{msToHMS(duration)}</span>
      			</div>
			</div>

			{/* Right */}
			<div className='flex justify-end items-center pr-5 space-x-3 md:space-x-4'>
				{
					mute ?
					<FaVolumeMute className='icon-playback' onClick={unMute}/>
					: volume >= 0.5 ?
					<FaVolumeUp className='icon-playback' onClick={toggleMute}/>
					:
					<FaVolumeDown className='icon-playback' onClick={toggleMute}/>
				}
				<input
					type='range'
					min={0}
					max={1}
					step={0.01}
					className='w-20 md:w-auto'
					value={volume}
					onChange={handleVolumeChange}
				/>
			</div>
		</div>
	)
}

export default Player
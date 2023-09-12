import React, { useEffect, useRef, useState } from 'react';
import Song from '../components/Song'
import { useAppDispatch, useAppSelector } from '../app/store';
import { Playlist } from '../services/playlist';
import { getEveryTrackFromSearchItems, loadMore, setIsLoading } from '../app/searchReducers';
import { getPlaylistWithId, loadMorePlaylistItems } from '../app/playlistReducers';


const Center = () => {
	
	const searchTrack = useAppSelector(state => state.searchReducers.searchTrack);
	const isSearching = useAppSelector(state => state.searchReducers.isSearching);
	const isLoading = useAppSelector(state => state.searchReducers.isLoading);
	const tracks = useAppSelector(state => state.searchReducers.tracks);
	const offset = useAppSelector(state => state.searchReducers.offset);
	const hasReachMax = useAppSelector(state => state.searchReducers.hasReachMax);
	const q = useAppSelector(state => state.searchReducers.q);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (searchTrack)
			dispatch(getEveryTrackFromSearchItems(searchTrack));
	}, [searchTrack]);

	useEffect(() => {
		if (tracks.length != 0) {
			dispatch(setIsLoading(false));
		}
	}, [tracks]);

	const divRef = useRef();

	const onScroll = () => {
		if (isLoading || (isSearching && hasReachMax) || (selectedPlaylistItems && playlistHasReachMax)) return;
		if (divRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = divRef.current;
			const isNearBottom = scrollTop + clientHeight >= scrollHeight;

			if (isNearBottom) {
				dispatch(setIsLoading(true));
			}
		}
	};

	useEffect(() => {
		if (isLoading) {
			if (selectedPlaylist) {
				dispatch(loadMorePlaylistItems({
					id: selectedPlaylist.id,
					offset: playlistOffset
				}));	
				return;
			}
			dispatch(loadMore({
				q: q,
				offset: offset
			}));
		}
	}, [isLoading]);

	useEffect(() => {
		const listInnerElement = divRef.current;
		if (listInnerElement) {
		listInnerElement.addEventListener("scroll", onScroll);
			return () => {
				listInnerElement.removeEventListener("scroll", onScroll);
			};
		}
	}, []);


	const selectedPlaylist = useAppSelector(state => state.playlistReducers.selectedPlaylist);
	const selectedPlaylistItems = useAppSelector(state => state.playlistReducers.selectedPlaylistItems);
	const playlistOffset = useAppSelector(state => state.playlistReducers.offset);
	const playlistHasReachMax = useAppSelector(state => state.playlistReducers.hasReachMax);
	const playlistTracks = useAppSelector(state => state.playlistReducers.tracks);

	useEffect(() => {
		if (selectedPlaylist) {
			dispatch(getPlaylistWithId({
				id: selectedPlaylist.id,
				offset: 0,
			}));
		}
	}, [selectedPlaylist]);

	useEffect(() => {
		console.log(selectedPlaylistItems);
	}, [selectedPlaylistItems]);


	return (
		<div className='bg-gradient-to-b from-green-600 flex-grow text-white relative h-screen overflow-y-scroll scrollbar-hidden' ref={divRef}>
			
		<h1 className="ml-10 max-w-md h-50 text-green-400 leading-loose tracking-wider md:text-4xl lg:text-6xl x1:text-6xl p-8">Welcome to Bang Dia Lau </h1>
			
			{
			isSearching ?
				(tracks.length != 0 ? 
				<>
				<p>Showing {tracks.length} in {searchTrack?.tracks.total}</p>
				{tracks.map((track, index) => 
				<div key={track.id}>
					<Song track={track} index={index + 1}/>
				</div>
				)}
				</>
				: isLoading ?
				<p>Loading...</p> :
				<p>No results</p>
				)
			:
			<section className='flex items-end space-x-7 h-80 p-8'>
				{
				selectedPlaylist ? (
				<>
					<img src={selectedPlaylist?.images[0]?.url || ''} alt="Playlist Image" className='h-40 w-40 shadow-xl' />
					<div className="playlists">
						<p>PLAYLIST</p>
						<h1 className='text-2xl font-bold md:text-3xl xl:text-5xl cursor-pointer'>
						{selectedPlaylist?.name || ''}
						</h1>
					</div>
					
				</>
				): (
    			<p>No playlist selected</p>
				)}
      		</section>
			}
				{ 
					playlistTracks.map((item, index) => 
						<div key={item.id}>
							<Song track={item} index={index + 1}/>
						</div>
					)
				}
			
		</div>
	)
}

export default Center
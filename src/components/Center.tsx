import React from 'react';
import { useEffect, useState } from 'react'
import Song from '../components/Song'


function Center() {
	return (
		<div className='bg-gradient-to-b from-green-600 flex-grow text-white relative h-screen overflow-y-scroll scrollbar-hidden'>
			
				<h1 className="ml-10 max-w-md h-50 text-green-400 leading-loose tracking-wider md:text-4xl lg:text-6xl x1:text-6xl p-8">Welcome to Bang Dia Lau </h1>
		
			
			<section className='flex items-end space-x-7  h-80 p-8'>

					<p>Playlist</p>

					<h1 className='text-2xl font-bold md:text-3xl xl:text-5xl cursor-pointer'>

								Long oc luoc

					</h1>
			</section>

			<div>
				<Song/>
				<Song/>
				<Song/>	
				<Song/>
				<Song/>
				<Song/>
				<Song/>
			</div>

		</div>
	)
}

export default Center
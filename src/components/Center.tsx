import React from 'react';

const colours = [
	'from-indigo-500',
	'from-blue-500',
	'from-green-500',
	'from-red-500',
	'from-yellow-500',
	'from-pink-500',
	'from-purple-500'
]

function Center() {

	return (
		<div className='flex-grow text-white relative h-screen overflow-y-scroll scrollbar-hidden'>
			<header className='absolute top-5 right-8'>
				<div className='flex  bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full py-1 pl-1 pr-2'>
                        USER
				</div>
			</header>
		</div>
	)
}

export default Center
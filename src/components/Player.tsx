import React from 'react'
import {
	FaForward,
	FaPlay,
	FaReply,
	FaVolumeUp,
	FaBackward,
	FaDice
} from 'react-icons/fa';


function Player() {

	return (
		<div className='h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
			{/* Left */}
			<div className='flex items-center space-x-4'>
				
						<div className=' hidden md:block'>
							<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGt5W12VUWxe67G_SWETZsgrtGooemwKGzRUMIQyp9ZBHjszpN8w_GD7ywAEFI-AfE00&usqp=CAU" alt="Album cover" className="h-10 w-10" />
						</div>
						<div>
							<h3 className='font-bold'>Song Name</h3>
							<p className='font-light'>Artist Name</p>
						</div>
		
			
			</div>

			{/* Center */}
			<div className='flex flex-col h-full'>
				<div className='h-3/5 flex justify-evenly items-center'>

					<FaDice className='icon-playback'/>
				
					<FaBackward className='icon-playback'/>
			
					<FaPlay className='icon-playback' /*onClick={handlePlayPause}*/ />
				
					<FaForward className='icon-playback'/>
					
					<FaReply className='icon-playback' />

				</div>
				

				<div className='h-2/5 w-full flex justify-between items-center'>
       				 <span className='text-xs text-gray-300 w-10 text-left'>12:29</span>
        			 <input type="range" className='w-full h-1' />
        			 <span className='text-xs text-gray-300 w-10 text-right'>13:50</span>
      			</div>
			</div>

			{/* Right */}
			<div className='flex justify-end items-center pr-5 space-x-3 md:space-x-4'>
				<FaVolumeUp className='icon-playback' />
				<input
					type='range'
					min={0}
					max={100}
					className='w-20 md:w-auto'
					/*value={volume}*/
					/*onChange={handleVolumeChange}*/
				/>
			</div>
		</div>
	)
}

export default Player
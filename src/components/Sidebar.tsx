import React from 'react';
import { FaHome, FaSearch, FaBook, FaPlus, FaGratipay, FaLayerGroup  } from 'react-icons/fa';
import IconSidebar from './IconSidebar';
import LoginButton from './LoginButton';
import { useAppSelector } from '../app/store';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  const userInfo = useAppSelector(state => state.authReducers.user);

  return (
    <div className='text-gray-500 px-5 pt-5 pb-36 text-xs lg:text-sm border-r border-gray-900 h-screen overflow-y-scroll scrollbar-hidden sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block'>
      <div className='space-y-4'>
        {userInfo ? 
        <>
        <p>{userInfo.display_name}</p> 
        <LogoutButton/>
        </>
        :<LoginButton/>}
          <hr className='border-t-[0.1px] border-gray-900' />

        <IconSidebar icon={FaHome} label='Home' />
				<IconSidebar icon={FaSearch} label='Search' />
				<IconSidebar icon={FaBook} label='Your Library' />

				  <hr className='border-t-[0.1px] border-gray-900' />

				<IconSidebar icon={FaPlus} label='Create Playlist' />
				<IconSidebar icon={FaGratipay} label='Liked Songs' />
				<IconSidebar icon={FaLayerGroup} label='Your episodes' />

				  <hr className='border-t-[0.1px] border-gray-900' />

        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
        <p className="cursor-pointer hover:text-white"> PLAYLIST </p>
      </div>
    </div>
  );
}

export default Sidebar;

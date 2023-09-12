import React, { useState } from 'react';
import { FaHome, FaSearch, FaBook, FaPlus, FaGratipay, FaLayerGroup  } from 'react-icons/fa';
import IconSidebar from './IconSidebar';
import LoginButton from './LoginButton';
import { useAppDispatch, useAppSelector } from '../app/store';
import LogoutButton from './LogoutButton';
import { searchTrackWithQuery, setIsSearching, setQuery } from '../app/searchReducers';


const Sidebar = () => {
  const userInfo = useAppSelector(state => state.authReducers.user);

  // const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useAppDispatch();
  const isSearching = useAppSelector(state => state.searchReducers.isSearching);
  const q = useAppSelector(state => state.searchReducers.q);

  const handleSearchIconClick = () => {
    dispatch(setIsSearching(true));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(searchTrackWithQuery({q: q, offset: 0}));
    }
  };

  const handleSearchCancel = () => {
    dispatch(setIsSearching(false));
    dispatch(setQuery(''));
  };

    // Lấy danh sách playlist từ Redux state
    const userPlaylists = useAppSelector(state => state.playlistReducers.userPlaylist);

    const handlePlaylistClick = (playlist) => {
      setIsSearching(false);
      dispatch(searchTrackWithQuery({ q: '', offset: 0 })); // Xóa kết quả tìm kiếm nếu có
      // Gọi hàm handlePlaylistClick để cập nhật playlist được chọn
      handlePlaylistClick(playlist);
    };

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
    
          {isSearching ? (
          <div className="Searching">

          <div className='relative mb-3' data-te-input-wrapper-init>
            <input
              type='text'
              className=' peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-300 dark:placeholder:text-neutral-300 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
              placeholder='Search'
              value={q}
              onChange={handleSearchChange}
              onKeyDown={handleSearchEnter}
            />
            <label
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-600 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Search
            </label>
            </div>
            <button onClick={handleSearchCancel}>Cancel</button>
          
          </div>
        ) : (
        <>  

        <IconSidebar icon={FaHome} label='Home' />
        <IconSidebar icon={FaSearch} label='Search' onClick={handleSearchIconClick}/>
				<IconSidebar icon={FaBook} label='Your Library' />

				  <hr className='border-t-[0.1px] border-gray-900' />

				<IconSidebar icon={FaPlus} label='Create Playlist' />
				<IconSidebar icon={FaGratipay} label='Liked Songs' />
				<IconSidebar icon={FaLayerGroup} label='Your episodes' />

				  <hr className='border-t-[0.1px] border-gray-900' />

          {userPlaylists?.items.map((playlist, index) => (
            <p key={index} className="cursor-pointer hover:text-white" onClick={() => handlePlaylistClick(playlist)}>
              
              {playlist.name}
              
            </p>
          ))}

        </>
         )}
      </div>
    </div>
  );
}

export default Sidebar;
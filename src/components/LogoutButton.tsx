import React from 'react';
import { useAppDispatch } from '../app/store';
import { logout } from '../services/auth';
import { logoutUser } from '../app/authReducers';

const LogoutButton = () => {
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        logout();
        dispatch(logoutUser());
    }
    return (
        <button onClick={handleLogout}>Log Out</button>
    );
}

export default LogoutButton;
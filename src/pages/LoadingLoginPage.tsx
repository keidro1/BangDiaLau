import React, { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { fetchAuthInfo } from '../app/authReducers';
import { useAppDispatch, useAppSelector } from '../app/store';

const LoadingLoginPage = () => {
    const [searchParams, _] = useSearchParams();
    let isLogin = useAppSelector(state => state.authReducers.isLogin);
    let code = searchParams.get("code");
    let dispatch = useAppDispatch();

    useEffect(() => {
        if (code) {
            dispatch(fetchAuthInfo(code));
        }
    }, []);

    return isLogin ? <Navigate to={"/"}/>:(
        <div>
        <h2>Loading...</h2>
        </div>
    );
}

export default LoadingLoginPage;

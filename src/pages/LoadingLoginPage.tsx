import React, { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { getToken, saveAuthInfo } from '../services/auth';

const LoadingLoginPage = () => {
    const [searchParams, _] = useSearchParams();
    const [isLogin, setIsLogin] = useState(false);

    let code = searchParams.get("code");

    useEffect(() => {
        if (code) {
            getToken(code).then(authInfo => {
                if (authInfo) {
                    saveAuthInfo(authInfo);
                    setIsLogin(true);
                }
            });
        }
    }, []);

    return isLogin ? <Navigate to={"/"}/>:(
        <div>
        <h2>Loading...</h2>
        </div>
    );
}

export default LoadingLoginPage;

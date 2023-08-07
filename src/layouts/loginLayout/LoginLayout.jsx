import React from 'react';
import Header from '../../pages/shared/header/Header';
import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
        </>
    );
};

export default LoginLayout;
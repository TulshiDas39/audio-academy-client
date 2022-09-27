import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UiRoutes } from '../../../lib';

const Login = React.lazy(()=>import('../../login/login'));
const Signup = React.lazy(()=>import('../../signup/signup'));
const NotFound = React.lazy(()=>import('../../notfound/notFound'));

function UnAuthenticatedLayoutComponent(){
    console.log('rendering');
    return (
        <Suspense fallback={null}>
            <Routes>
                <Route path={UiRoutes.Login} element={<Login />} />
                <Route path={UiRoutes.SingUp} element={<Signup />} />
                <Route element={<NotFound />}/>
            </Routes>
        </Suspense>
    )
}

export const UnAuthenticatedLayout = React.memo(UnAuthenticatedLayoutComponent);
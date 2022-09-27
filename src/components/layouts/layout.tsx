import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LayoutRoutes, UiRoutes } from '../../lib';
import { AuthenticatedLayout,PublicLayout } from './subComponents';
import './layout.scss'

function LayoutComponent(){
    console.log('rendering');
    return (
        <Routes>
            <Route path={LayoutRoutes.Public} element={<PublicLayout />} />
            <Route path={UiRoutes.Root} element={<AuthenticatedLayout />} />
        </Routes>
    )
    
}

export const Layout = React.memo(LayoutComponent);
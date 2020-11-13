import React from 'react';
import { AuthStorage } from '../../lib';
import { PrivateLayout, PublicLayout } from './subComponents';

function LayoutComponent(){
    console.log('rendering');
    return  AuthStorage.isLoggedIn?<PrivateLayout />: <PublicLayout />
}

export const Layout = React.memo(LayoutComponent);
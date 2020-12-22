import React from 'react';
import { EnumUserType } from '../../../lib';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ThunkLogin } from '../../login/thunk';
import { AdminLayout } from './adminLayout';
import { ContributorLayout } from './contributorLayout';
import { UnAuthenticatedLayout } from './unAuthenticatedLayout';


function AuthenticatedLayoutComponent() {
    const store = useSelectorTyped((state)=> ({
        isLogin: state.login.isLoggedIn,
        apiProfileVersion:state.api.getProfile.version
    }))
    if(!store.isLogin) return <UnAuthenticatedLayout/>;
    if(ThunkLogin.Profile.type === EnumUserType.CONTRIBUTOR) return <ContributorLayout />
    if(ThunkLogin.Profile.type === EnumUserType.ADMIN) return <AdminLayout />
    return null;
}

export const AuthenticatedLayout = React.memo(AuthenticatedLayoutComponent);
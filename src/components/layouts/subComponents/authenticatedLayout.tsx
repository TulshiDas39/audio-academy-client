import React from 'react';
import { EnumUserType } from '../../../lib';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ThunkLogin } from '../../login/thunk';
import { ContributorLayout } from './contributorLayout';
import { UnAuthenticatedLayout } from './unAuthenticatedLayout';


function AuthenticatedLayoutComponent() {
    const store = useSelectorTyped((state)=> ({
        isLogin: state.login.isLoggedIn,
        apiProfileVersion:state.api.getProfile.version
    }))
    console.log('rendering');
    console.log(store);
    if(!store.isLogin) return <UnAuthenticatedLayout/>;
    if(ThunkLogin.Profile.type === EnumUserType.CONTRIBUTOR) return <ContributorLayout />
    return null;
}

export const AuthenticatedLayout = React.memo(AuthenticatedLayoutComponent);
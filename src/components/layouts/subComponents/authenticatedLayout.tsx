import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { AuthStorage, EnumUserType, UiRoutes } from '../../../lib';
import { ReduxState, useSelectorTyped } from '../../../store/rootReducer';
import { ThunkLogin } from '../../login/thunk';
import { ContributorLayout } from './contributorLayout';
import { UnAuthenticatedLayout } from './unAuthenticatedLayout';

const Dashboard = React.lazy(() => import('../../contributorDashboard/contributorDashboard'));
const Saved = React.lazy(() => import('../../saved/Saved'));


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
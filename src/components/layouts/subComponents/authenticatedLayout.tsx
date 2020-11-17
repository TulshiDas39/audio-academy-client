import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { AuthStorage, UiRoutes } from '../../../lib';
import { ReduxState, useSelectorTyped } from '../../../store/rootReducer';
import { UnAuthenticatedLayout } from './unAuthenticatedLayout';

const Dashboard = React.lazy(() => import('../../contributorDashboard/contributorDashboard'));
const Saved = React.lazy(() => import('../../saved/Saved'));


function AuthenticatedLayoutComponent() {
    const store = useSelectorTyped((state)=> ({isLogin: state.login.isLoggedIn}))
    console.log('rendering');
    console.log(store);
    if(!store.isLogin) return <UnAuthenticatedLayout/>;
    return (
        <Suspense fallback={null}>
            <Switch>
                <Route path={UiRoutes.ContributorDashBoard} exact component={Dashboard} />
                <Route path={UiRoutes.Saved} exact component={Saved} />
            </Switch>
        </Suspense>
    )
}

export const AuthenticatedLayout = React.memo(AuthenticatedLayoutComponent);
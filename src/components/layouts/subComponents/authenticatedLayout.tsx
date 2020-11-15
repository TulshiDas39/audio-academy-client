import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthStorage, UiRoutes } from '../../../lib';
import { UnAuthenticatedLayout } from './unAuthenticatedLayout';

const Dashboard = React.lazy(() => import('../../dashboard/dashboard'));
const Saved = React.lazy(() => import('../../saved/Saved'));


function AuthenticatedLayoutComponent() {
    console.log('rendering');
    if(!AuthStorage.isLoggedIn) return <UnAuthenticatedLayout/>;
    return (
        <Suspense fallback={null}>
            <Switch>
                <Route path={UiRoutes.DashBoard} exact component={Dashboard} />
                <Route path={UiRoutes.Saved} exact component={Saved} />
            </Switch>
        </Suspense>
    )
}

export const AuthenticatedLayout = React.memo(AuthenticatedLayoutComponent);
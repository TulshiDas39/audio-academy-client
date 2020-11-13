import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from '../../../lib';

const Dashboard = React.lazy(() => import('../../dashboard/dashboard'));
const Saved = React.lazy(() => import('../../saved/Saved'));


function PrivateLayoutComponent() {
    console.log('rendering');
    return (
        <Suspense fallback={null}>
            <Switch>
                <Route path={Routes.Root} exact component={Dashboard} />
                <Route path={Routes.Saved} exact component={Saved} />
            </Switch>
        </Suspense>
    )
}

export const PrivateLayout = React.memo(PrivateLayoutComponent);
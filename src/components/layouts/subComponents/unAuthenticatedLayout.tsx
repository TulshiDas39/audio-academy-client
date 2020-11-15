import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UiRoutes } from '../../../lib';

const Login = React.lazy(()=>import('../../login/login'));

function UnAuthenticatedLayoutComponent(){
    console.log('rendering');
    return (
        <Suspense fallback={null}>
            <Switch>
                <Route path={UiRoutes.Login} exact component={Login} />
            </Switch>
        </Suspense>
    )
}

export const UnAuthenticatedLayout = React.memo(UnAuthenticatedLayoutComponent);
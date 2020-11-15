import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UiRoutes } from '../../../lib';

const Login = React.lazy(()=>import('../../login/login'));
const Signup = React.lazy(()=>import('../../signup/signup'));

function UnAuthenticatedLayoutComponent(){
    console.log('rendering');
    return (
        <Suspense fallback={null}>
            <Switch>
                <Route path={UiRoutes.Login} exact component={Login} />
                <Route path={UiRoutes.SingUp} exact component={Signup} />
            </Switch>
        </Suspense>
    )
}

export const UnAuthenticatedLayout = React.memo(UnAuthenticatedLayoutComponent);
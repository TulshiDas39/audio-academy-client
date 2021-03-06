import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UiRoutes } from '../../../lib';

const PrivacyPolicy = React.lazy(()=>import('../../privacyPolicy/privacyPolicy'));

function PublicLayoutComponent(){
    console.log('rendering');
    return (
        <Suspense fallback={null}>
            <Switch>
                <Route path={UiRoutes.Privacy} exact component={PrivacyPolicy} />
            </Switch>
        </Suspense>
    )
}

export const PublicLayout = React.memo(PublicLayoutComponent);
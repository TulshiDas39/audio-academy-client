import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import { LayoutRoutes, UiRoutes } from '../../lib';
import { AuthenticatedLayout,PublicLayout } from './subComponents';

function LayoutComponent(){
    console.log('rendering');
    return (
        <Switch className="h-100">
            <Route path={LayoutRoutes.Public} component={PublicLayout} />
            <Route path={UiRoutes.Root} component={AuthenticatedLayout} />
        </Switch>
    )
    
}

export const Layout = React.memo(LayoutComponent);
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LayoutRoutes, UiRoutes } from '../../lib';
import { AuthenticatedLayout,PublicLayout } from './subComponents';
import './layout.scss'

function LayoutComponent(){
    console.log('rendering');
    return (
        <Switch>
            <Route path={LayoutRoutes.Public} component={PublicLayout} />
            <Route path={UiRoutes.Root} component={AuthenticatedLayout} />
        </Switch>
    )
    
}

export const Layout = React.memo(LayoutComponent);
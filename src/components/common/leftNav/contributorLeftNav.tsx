import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import './contributorLeftNav.scss';

function ContributorLeftNavComponent(){
    return (
        <div className="contributorLeftNav h-100">
            <NavLink to={UiRoutes.ContributorDashBoard} exact>Queue</NavLink>
            <NavLink to={UiRoutes.Saved} exact>Submitted</NavLink>
        </div>
    )
}

export const ContributorLeftNav = React.memo(ContributorLeftNavComponent);
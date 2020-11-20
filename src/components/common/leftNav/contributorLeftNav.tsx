import React from 'react';
import { NavLink } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import './contributorLeftNav.scss';

function ContributorLeftNavComponent(){
    return (
        <div className="contributorLeftNav h-100">
            <NavLink to={UiRoutes.ContributorDashBoard} exact>Queue</NavLink>
            <NavLink to={UiRoutes.Submitted} exact>Submitted</NavLink>
            <NavLink to={UiRoutes.Confirmed} exact>Confirmed</NavLink>
        </div>
    )
}

export const ContributorLeftNav = React.memo(ContributorLeftNavComponent);
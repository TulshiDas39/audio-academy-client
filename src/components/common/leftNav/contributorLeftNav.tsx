import React from 'react';
import { NavLink } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import './contributorLeftNav.scss';

function ContributorLeftNavComponent(){
    return (
        <div className="contributorLeftNav h-100">
            <NavLink to={UiRoutes.ContributorDashBoard} exact className="px-4 text-center">Tasks</NavLink>
            {/* <NavLink to={UiRoutes.Submitted} exact className="text-center">Activity</NavLink>
            <NavLink to={UiRoutes.Confirmed} exact className="text-center">Confirmed</NavLink> */}
        </div>
    )
}

export const ContributorLeftNav = React.memo(ContributorLeftNavComponent);
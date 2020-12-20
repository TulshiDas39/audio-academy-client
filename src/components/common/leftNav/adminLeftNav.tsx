import React from 'react';
import { NavLink } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import './contributorLeftNav.scss';

function AdminLeftNavComponent(){
    return (
        <div className="contributorLeftNav h-100">
            <NavLink to={UiRoutes.AdminDashBoard} exact className="px-4 text-center">Tasks</NavLink>
            <NavLink to={UiRoutes.Items} exact className="text-center">Activity</NavLink>
            <NavLink to={UiRoutes.Confirmed} exact className="text-center">Reports</NavLink>
        </div>
    )
}

export const AdminLeftNav = React.memo(AdminLeftNavComponent);
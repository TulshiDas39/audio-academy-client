import React, { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import './contributorLeftNav.scss';

function AdminLeftNavComponent(){
    const pathName = useLocation().pathname;

    return (
        <div className="contributorLeftNav h-100">
            {/* <NavLink to={UiRoutes.AdminDashBoard} exact className="px-4 text-center">Tasks</NavLink> */}
            <NavLink to={UiRoutes.AdminDashBoard} className="text-center px-2">Items</NavLink>
            {/* <NavLink to={UiRoutes.Confirmed} exact className="text-center">Reports</NavLink> */}
        </div>
    )
}

export const AdminLeftNav = React.memo(AdminLeftNavComponent);
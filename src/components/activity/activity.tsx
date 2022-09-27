import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {  UiRoutes } from '../../lib';
import './activity.scss';
import ItemsView from './subComponents/ItemsView';

function ActivityComponent() {
    const location = useLocation();

    const isActiveItems = location.pathname === UiRoutes.Items || location.pathname.startsWith(UiRoutes.Tutorials);
    const isActiveBooks = location.pathname === UiRoutes.Books ;
    const isActiveContributors = location.pathname === UiRoutes.Contributors ;



    return (
        <div className="activityComp h-100 overflow-auto border-box">
            <div className="navPart d-flex align-items-center border-bottom">
                <NavLink to={UiRoutes.Items} title="Tutorials" className={`hover-no-underline py-2 px-3 ${isActiveItems?"bg-white border-bottom-none":""}`} >Tutorials</NavLink>
                <NavLink  to={UiRoutes.Books} title="Books" className={`hover-no-underline py-2 px-3 ${isActiveBooks?"bg-white border-bottom-none":""}`}>Books</NavLink>                    
                <NavLink to={UiRoutes.Contributors} title="Contributors" className={`hover-no-underline py-2 px-3 ${isActiveBooks ?"bg-white border-bottom-none":""}`}>Contributors</NavLink>                    
            </div>
            <ItemsView />
        </div>
    )
}

const Activity = React.memo(ActivityComponent);

export default Activity;
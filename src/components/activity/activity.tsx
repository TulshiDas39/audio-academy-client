import React, { useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import {  UiRoutes } from '../../lib';
import './activity.scss';
import ItemsView from './subComponents/ItemsView';

function ActivityComponent() {

    return (
        <div className="activityComp h-100 overflow-auto border-box">
            <div className="navPart d-flex align-items-center border-bottom">
                <NavLink to={UiRoutes.Items} isActive={(_,location)=>{
                    if(location.pathname === UiRoutes.Items) return true;
                    else if(location.pathname.startsWith(UiRoutes.Tutorials)) return true;
                    return false;
                }} title="Tutorials" activeClassName="bg-white border-bottom-none" className="hover-no-underline py-2 px-3" >Tutorials</NavLink>
                <NavLink exact to={UiRoutes.Books} title="Books" activeClassName="bg-white border-bottom-none" className="hover-no-underline py-2 px-3">Books</NavLink>                    
                <NavLink exact to={UiRoutes.Contributors} title="Contributors" activeClassName="bg-white border-bottom-none" className="hover-no-underline py-2 px-3">Contributors</NavLink>                    
            </div>
            <ItemsView />
        </div>
    )
}

const Activity = React.memo(ActivityComponent);

export default Activity;
import React, { useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import {  UiRoutes } from '../../lib';
import './activity.scss';
import ItemsView from './subComponents/ItemsView';

function ActivityComponent() {
    const history = useHistory();
    const location = useLocation();
    useEffect(()=>{
       if(location.pathname === UiRoutes.Items) history.push(UiRoutes.Tutorials);
    },[location.pathname]);
    return (
        <div className="activityComp h-100 overflow-auto border-box">
            <div className="navPart d-flex align-items-center border-bottom">
                <NavLink exact to={UiRoutes.Tutorials} title="Tutorials" activeClassName="bg-white border-bottom-none" className="hover-no-underline py-2 px-3" >Tutorials</NavLink>
                <NavLink exact to={UiRoutes.Books} title="Books" activeClassName="bg-white border-bottom-none" className="hover-no-underline py-2 px-3">Books</NavLink>                    
            </div>
            <ItemsView />
        </div>
    )
}

const Activity = React.memo(ActivityComponent);

export default Activity;
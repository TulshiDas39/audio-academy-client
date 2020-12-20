import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import {  UiRoutes } from '../../lib';
import './activity.scss';

const Tutorials = React.lazy(()=>import('../Tutorials/tutorialsComponent'));
const Books = React.lazy(()=>import('../books/books'));

function ActivityComponent() {
    return (
        <div className="activityComp h-100 overflow-auto border-box">
            <div className="navPart d-flex align-items-center border-bottom">
                <NavLink to={UiRoutes.Tutorials} title="Tutorials" activeClassName="bg-white border-bottom-none" className="hover-no-underline py-2 px-3" >Tutorials</NavLink>
                <NavLink to={UiRoutes.Books} title="Books" activeClassName="bg-white border-bottom-none" className="hover-no-underline py-2 px-3">Books</NavLink>                    
            </div>
            <div className="viewPart overflow-auto">
                <Switch>
                    <Route component={Tutorials} exact path={UiRoutes.Tutorials} />
                    <Route component={Books} exact path={UiRoutes.Books} />
                </Switch> 
            </div> 
        </div>
    )
}

const Activity = React.memo(ActivityComponent);

export default Activity;
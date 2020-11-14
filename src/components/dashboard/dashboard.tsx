import React from 'react';
import { Link } from 'react-router-dom';
import { UiRoutes } from '../../lib';

function DashboardComponent(){
    return (<div>
        <h1>dashboard</h1>
        <Link to={UiRoutes.Saved} >Saved</Link>
    </div>)
}

const Dashboard = React.memo(DashboardComponent);

export default Dashboard;
import React from 'react';
import { Link } from 'react-router-dom';
import { UiRoutes } from '../../lib';

function ContributorDashboardComponent(){
    return (<div>
        <h1>dashboard</h1>
        <Link to={UiRoutes.Saved} >Saved</Link>
    </div>)
}

const ContributorDashboard = React.memo(ContributorDashboardComponent);

export default ContributorDashboard;
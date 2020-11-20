import React from 'react';

function ContributorDashboardComponent(){
    return (<div>
        <h1>dashboard</h1>
    </div>)
}

const ContributorDashboard = React.memo(ContributorDashboardComponent);

export default ContributorDashboard;
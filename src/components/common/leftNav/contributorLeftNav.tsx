import React from 'react';
import './contributorLeftNav.scss';

function ContributorLeftNavComponent(){
    return (
        <div className="contributorLeftNav">
            <div>Queue</div>
            <div>Submitted</div>
        </div>
    )
}

export const ContributorLeftNav = React.memo(ContributorLeftNavComponent);
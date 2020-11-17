import React from 'react';

function ContributorLeftNavComponent(){
    return (
        <div className="w-100">
            Contributor Left nav
        </div>
    )
}

export const ContributorLeftNav = React.memo(ContributorLeftNavComponent);
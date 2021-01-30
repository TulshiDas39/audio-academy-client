import React from 'react';
import { Link } from 'react-router-dom';
import { UiRoutes } from '../../lib';

function NotFoundComponent(){
    return (
        <div>
            <p className="text-primary text-center">Not found. </p>
            <p className="text-center"><Link to={UiRoutes.Login}>Login</Link></p>
        </div>
    )
}

const NotFound = React.memo(NotFoundComponent);

export default NotFound;
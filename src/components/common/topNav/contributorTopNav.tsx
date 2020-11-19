import React from 'react';
import { FaHeadphones } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Constants, UiRoutes } from '../../../lib';
import './contributorTopNav.scss';

function ContributorTopNavComponent(){
    return (
        <div className="contributorTopNav bg-success row align-items-center">
            <div className="col-auto">
                <Link to={UiRoutes.ContributorDashBoard} className="text-white">
                    <FaHeadphones />
                    <span className="h5">{Constants.SiteName}</span>
                </Link>
            </div>
        </div>
    )
}

export const ContributorTopNav = React.memo(ContributorTopNavComponent);
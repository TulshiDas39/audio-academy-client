import React, { Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import { ContributorLeftNav } from '../../common/leftNav';
import { ContributorTopNav } from '../../common/topNav';

const ContributorDashboard = React.lazy(() => import('../../contributorDashboard/contributorDashboard'));

function ContributorLayoutComponent() {
    return (
        <Fragment>
            <ContributorTopNav />
            <div className="row">
                <div className="col-3">
                    <ContributorLeftNav />
                </div>
                <div className="col-9">
                    <Suspense fallback={null}>
                        <Switch>
                            <Route path={UiRoutes.ContributorDashBoard} component={ContributorDashboard} />
                        </Switch>
                    </Suspense>
                </div>
            </div>

        </Fragment>
    )
}

const ContributorLayout = React.memo(ContributorLayoutComponent);
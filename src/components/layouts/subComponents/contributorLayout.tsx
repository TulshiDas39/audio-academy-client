import React, { Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import { ContributorLeftNav } from '../../common/leftNav';
import { ContributorTopNav } from '../../common/topNav';

const ContributorDashboard = React.lazy(() => import('../../contributorDashboard/contributorDashboard'));
const Saved = React.lazy(() => import('../../saved/Saved'));


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
                            <Route path={UiRoutes.ContributorDashBoard} exact component={ContributorDashboard} />
                            <Route path={UiRoutes.Saved} exact component={Saved} />
                        </Switch>
                    </Suspense>
                </div>
            </div>

        </Fragment>
    )
}

export const ContributorLayout = React.memo(ContributorLayoutComponent);
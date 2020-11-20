import React, { Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import { ContributorLeftNav } from '../../common/leftNav';
import { ContributorTopNav } from '../../common/topNav';

const ContributorDashboard = React.lazy(() => import('../../contributorDashboard/contributorDashboard'));
const Saved = React.lazy(() => import('../../saved/Saved'));


function ContributorLayoutComponent() {
    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-shrink-0">
                <ContributorTopNav />
            </div>
            <div className="flex-grow-1">
                <div className="row mx-0 h-100">
                    <div className="col-auto px-0">
                        <ContributorLeftNav />
                    </div>
                    <div className="col">
                        <Suspense fallback={null}>
                            <Switch>
                                <Route path={UiRoutes.ContributorDashBoard} exact component={ContributorDashboard} />
                                <Route path={UiRoutes.Saved} exact component={Saved} />
                            </Switch>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ContributorLayout = React.memo(ContributorLayoutComponent);
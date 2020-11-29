import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
// import AdminDashboard from '../../adminDashboard/adminDashboard';
import { ContributorLeftNav } from '../../common/leftNav';
import { TopNav } from '../../common/topNav';

const AdminDashboard = React.lazy(() => import('../../adminDashboard/adminDashboard'));
const Saved = React.lazy(() => import('../../saved/Saved'));


function AdminLayoutComponent() {
    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-shrink-0">
                <TopNav />
            </div>
            <div className="flex-grow-1">
                <div className="row mx-0 h-100">
                    <div className="col-auto px-0">
                        <ContributorLeftNav />
                    </div>
                    <div className="col">
                        <Suspense fallback={null}>
                            <Switch>
                                <Route path={UiRoutes.ContributorDashBoard} exact component={AdminDashboard} />
                                <Route path={UiRoutes.Submitted} exact component={Saved} />
                            </Switch>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const AdminLayout = React.memo(AdminLayoutComponent);
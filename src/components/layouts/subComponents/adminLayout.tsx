import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import { AdminLeftNav } from '../../common/leftNav/adminLeftNav';
import { AdminModals } from '../../common/modals';
import { TopNav } from '../../common/topNav';

const Activity = React.lazy(() => import('../../activity/activity'));


function AdminLayoutComponent() {
    return (
        <div className="h-100 d-flex flex-column">
            <AdminModals />
            <TopNav />
            <div className="pageContent">
                <div className="row mx-0 w-100 h-100">
                    <div className="col-auto px-0">
                        <AdminLeftNav />
                    </div>
                    <div className="col h-100">
                        <Suspense fallback={null}>
                            <Routes>
                                {/* <Route path={UiRoutes.AdminDashBoard} exact component={AdminDashboard} /> */}
                                <Route path={UiRoutes.AdminDashBoard} element={<Activity/>} />
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const AdminLayout = React.memo(AdminLayoutComponent);
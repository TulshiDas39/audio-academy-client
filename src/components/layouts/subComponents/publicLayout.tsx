import React, { Suspense } from 'react';
import { Route, Routes, } from 'react-router-dom';
import { UiRoutes } from '../../../lib';

const PrivacyPolicy = React.lazy(()=>import('../../privacyPolicy/privacyPolicy'));

function PublicLayoutComponent(){
    console.log('rendering');
    return (
        <Suspense fallback={null}>
            <Routes>
                <Route path={UiRoutes.Privacy} element={<PrivacyPolicy />} />
            </Routes>
        </Suspense>
    )
}

export const PublicLayout = React.memo(PublicLayoutComponent);
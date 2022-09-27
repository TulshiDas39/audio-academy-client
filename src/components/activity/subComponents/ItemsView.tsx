import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import { SingleTutorialDetails } from '../../singleTutorialDetails';

const Tutorials = React.lazy(()=>import('../../Tutorials/tutorialsComponent'));
const Books = React.lazy(()=>import('../../books/books'));
const Contributors = React.lazy(()=>import('../../contributors/contributors'));

function ItemsViewComponent() {
    return (
        <div className="viewPart overflow-auto">
            <Suspense fallback={null}>
                <Routes>
                    <Route element={<Tutorials/>} path={`(${UiRoutes.Tutorials}|${UiRoutes.Items})`} />
                    <Route element={<SingleTutorialDetails />} path={UiRoutes.SingleTutorialDetails} />
                    <Route element={<Books />} path={UiRoutes.Books} />
                    <Route element={<Contributors />} path={UiRoutes.Contributors} />
                </Routes>
            </Suspense>
        </div>
    )
}

const ItemsView = React.memo(ItemsViewComponent);
export default ItemsView;
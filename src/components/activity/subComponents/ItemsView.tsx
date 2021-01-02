import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import { SingleTutorialDetails } from '../../singleTutorialDetails';

const Tutorials = React.lazy(()=>import('../../Tutorials/tutorialsComponent'));
const Books = React.lazy(()=>import('../../books/books'));
const Contributors = React.lazy(()=>import('../../contributors/contributors'));

function ItemsViewComponent() {
    return (
        <div className="viewPart overflow-auto">
            <Suspense fallback={null}>
                <Switch>
                    <Route component={Tutorials} exact path={UiRoutes.Tutorials} />
                    <Route component={SingleTutorialDetails} exact path={UiRoutes.SingleTutorialDetails} />
                    <Route component={Books} exact path={UiRoutes.Books} />
                    <Route component={Contributors} exact path={UiRoutes.Contributors} />
                </Switch>
            </Suspense>
        </div>
    )
}

const ItemsView = React.memo(ItemsViewComponent);
export default ItemsView;
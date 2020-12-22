import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import { SingleTutorialDetails } from '../../singleTutorialDetails';

const Tutorials = React.lazy(()=>import('../../Tutorials/tutorialsComponent'));
const Books = React.lazy(()=>import('../../books/books'));

function ItemsViewComponent() {
    return (
        <div className="viewPart overflow-auto">
            <Switch>
                <Route component={Tutorials} exact path={UiRoutes.Tutorials} />
                <Route component={SingleTutorialDetails} exact path={UiRoutes.Tutorials+"/:id"} />
                <Route component={Books} exact path={UiRoutes.Books} />
            </Switch>
        </div>
    )
}

const ItemsView = React.memo(ItemsViewComponent);
export default ItemsView;
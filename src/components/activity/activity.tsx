import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import {  UiRoutes } from '../../lib';

const Tutorials = React.lazy(()=>import('../Tutorials/tutorialsComponent'));

function ActivityComponent() {
    const dispatch = useDispatch();
    return (
        <div>

        
            <div className="d-flex align-items-center mt-2 border-bottom">

                    <NavLink to={UiRoutes.Tutorials} title="Tutorials" activeClassName="bg-white border-bottom-none" className="py-2 px-3" >Tutorials</NavLink>
                    
                  
                {/* <Button className="mr-2" onClick={() => dispatch(ActionsModal.showModal(EnumModals.REGISTER_CONTRIBUTOR))}>Register Contributor</Button>
                <Button className="mr-2" onClick={() => dispatch(ActionsModal.showModal(EnumModals.CREATE_CLIP))}>Create Clip</Button>
                <Button className="mr-2" onClick={() => dispatch(ActionsModal.showModal(EnumModals.CREATE_TUTORIAL))}>Create Tutorial</Button>
                <Button className="mr-2" onClick={() => dispatch(ActionsModal.showModal(EnumModals.CREATE_BOOK))}>Create Book</Button> */}
            </div>
            <Switch>
                <Route component={Tutorials} exact path={UiRoutes.Tutorials} />
            </Switch>  
        </div>
    )
}

const Activity = React.memo(ActivityComponent);

export default Activity;
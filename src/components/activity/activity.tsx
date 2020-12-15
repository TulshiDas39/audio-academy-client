import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { EnumModals, UiRoutes } from '../../lib';
import { ActionsModal } from '../common/modals';

const Tutorials = React.lazy(()=>import('../Tutorials/tutorialsComponent'));

function ActivityComponent() {
    const dispatch = useDispatch();
    return (
        <div className="d-flex align-items-center mt-2">
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Tutorials</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Clips</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link  disabled>
                        Books
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <Switch>
                <Route component={Tutorials} exact path={UiRoutes.Tutorials} />
            </Switch>    
            <Button className="mr-2" onClick={() => dispatch(ActionsModal.showModal(EnumModals.REGISTER_CONTRIBUTOR))}>Register Contributor</Button>
            <Button className="mr-2" onClick={() => dispatch(ActionsModal.showModal(EnumModals.CREATE_CLIP))}>Create Clip</Button>
            <Button className="mr-2" onClick={() => dispatch(ActionsModal.showModal(EnumModals.CREATE_TUTORIAL))}>Create Tutorial</Button>
            <Button className="mr-2" onClick={() => dispatch(ActionsModal.showModal(EnumModals.CREATE_BOOK))}>Create Book</Button>
        </div>
    )
}

const Activity = React.memo(ActivityComponent);

export default Activity;
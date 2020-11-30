import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { EnumModals } from '../../lib';
import { ActionsModal } from '../common/modals';

function ActivityComponent(){
    const dispatch = useDispatch();
    return (
        <div className="d-flex align-items-center mt-2">
            <Button className="mx-auto" onClick={()=>dispatch(ActionsModal.showModal(EnumModals.REGISTER_CONTRIBUTOR))}>Register Contributor</Button>
        </div>
    )
}

const Activity = React.memo(ActivityComponent);

export default Activity;
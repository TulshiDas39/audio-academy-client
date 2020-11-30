import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { EnumModals } from '../../../lib';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ActionsModal } from './reducers';

function RegisterContributorModalComponent(){
    const dispatch = useDispatch();
    const store = useSelectorTyped((state)=>({
        show: state.modals.openModals.includes(EnumModals.REGISTER_CONTRIBUTOR),
    }))
    
    const closeModal=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.REGISTER_CONTRIBUTOR));
    }

    return (
    <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show = {store.show}
    >
      <Modal.Header closeButton>
        <p>Register Contributor</p>
      </Modal.Header>
      <Modal.Body>
        <Form>
            
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=> dispatch(ActionsModal.hideModal(EnumModals.REGISTER_CONTRIBUTOR))}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export const RegisterContributorModal = React.memo(RegisterContributorModalComponent);
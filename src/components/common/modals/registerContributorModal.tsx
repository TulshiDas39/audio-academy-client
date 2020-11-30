import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { EnumModals } from '../../../lib';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ActionsModal } from './reducers';

interface IFormData{
  name:string,
  email:string,
  phone:string,
}

function RegisterContributorModalComponent(){
    const dispatch = useDispatch();
    const store = useSelectorTyped((state)=>({
        show: state.modals.openModals.includes(EnumModals.REGISTER_CONTRIBUTOR),
    }))

    const {errors, register, handleSubmit} = useForm<IFormData>({
      mode:"onSubmit",
      reValidateMode:"onChange",
    })
    
    const onClose=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.REGISTER_CONTRIBUTOR));
    }

    const onSubmit=(data:IFormData)=>{
      debugger;
    }

    return (
    <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show = {store.show}
    >
      <Modal.Header closeButton onHide={onClose}>
        <p>Register Contributor</p>
      </Modal.Header>
      <Modal.Body>
        <Form id="registerContributorForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Control name="name" type="text" placeholder="Full name" ref={register({required:"Full name is required"})}/>
              <p className="text-danger">{errors.name?.message || ''}</p>
              <Form.Control name="phone" type="text" placeholder="Phone" ref={register({required:"Phone is required"})}/>
              <p className="text-danger">{errors.phone?.message || ''}</p>
              <Form.Control name="email" type="text" placeholder="Email" ref={register({required:"Email is required"})}/>
              <p className="text-danger">{errors.email?.message || ''}</p>
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" type="submit" form={"registerContributorForm"}>Submit</Button>
        <Button variant="danger" onClick={onClose} >Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export const RegisterContributorModal = React.memo(RegisterContributorModalComponent);
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { EnumModals, useMultiState } from '../../../lib';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ApiCreateContributor, ICreateContributorPayload } from './api';
import { ActionsModal } from './reducers';

interface IFormData{
  name:string,
  email:string,
  phone:string,
  password: string,
}

interface IState{
  showPassword?:boolean;
}

const initialState={} as IState;

function RegisterContributorModalComponent(){
    const dispatch = useDispatch();
    const store = useSelectorTyped((state)=>({
        show: state.modals.openModals.includes(EnumModals.REGISTER_CONTRIBUTOR),
    }))

    const [state,setState]= useMultiState(initialState);

    const {errors, register, handleSubmit} = useForm<IFormData>({
      mode:"onSubmit",
      reValidateMode:"onChange",
    })
    
    const onClose=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.REGISTER_CONTRIBUTOR));
    }

    const onSubmit=(data: IFormData)=>{
      const payload: ICreateContributorPayload={
        email: data.email,
        name: data.name,
        password: data.password,
        phone: data.phone,
      }
      ApiCreateContributor(payload).then(res=>{
        if(res.response){
          onClose();
        }
      })
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
              <Form.Control name="password" type={state.showPassword?"text":"password"} placeholder="Password for contributor" ref={register({required:"Password is required"})}/>
              <p className="py-0 text-right"> <small className="hover-primary cur-point" onClick={_ => setState({showPassword:!state.showPassword})}>{state.showPassword? 'Hide':'Show'}</small> </p>
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
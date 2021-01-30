import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { mutate } from 'swr';
import { ApiRoutes, ArrayUtil, EnumModals, useMultiState } from '../../../lib';
import { IEntityUser } from '../../../lib/types/entities';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ApiCreateContributor, ApiUpdateUser, ICreateContributorPayload } from './api';
import { ModalData } from './modalData';
import { ActionsModal } from './reducers';

interface IFormData{
  name:string,
  email:string,
  phone:string,
  password: string,
}

interface IState{
  showPassword?:boolean;
  isBusy:boolean,
}

const initialState={
  isBusy:false,
} as IState;

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

    useEffect(()=>{
      if(!store.show) ModalData.registerContributorModal.existing = undefined;
    },[store.show])
    
    const onClose=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.REGISTER_CONTRIBUTOR));
    }

    const registerContributor=(data: IFormData)=>{
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

    const updateUser=(data:IFormData)=>{
      const existingUser = ModalData.registerContributorModal.existing;
      if(!existingUser) return;
      existingUser.email = data.email;
      existingUser.name = data.name;
      existingUser.phone = data.phone;
      setState({isBusy:true});
      ApiUpdateUser(existingUser).then(res=>{
        setState({isBusy:false});
        if(res.response){
          onClose();
          mutate(ApiRoutes.AllContributors,(contr:any)=>{
              return ArrayUtil.UpdateItem(contr,res.response?.data!,"_id");
          },false);
        }
      });
      
    }

    const onSubmit=(data: IFormData)=>{
      if(ModalData.registerContributorModal.existing) updateUser(data);
      else registerContributor(data);
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
              <Form.Control name="name" defaultValue={ModalData.registerContributorModal.existing?.name} type="text" placeholder="Full name" ref={register({required:"Full name is required"})}/>
              <p className="text-danger">{errors.name?.message || ''}</p>
              <Form.Control name="phone" defaultValue={ModalData.registerContributorModal.existing?.phone} type="text" placeholder="Phone" ref={register({required:"Phone is required"})}/>
              <p className="text-danger">{errors.phone?.message || ''}</p>
              <Form.Control name="email" defaultValue={ModalData.registerContributorModal.existing?.email} type="text" placeholder="Email" ref={register({required:"Email is required"})}/>
              <p className="text-danger">{errors.email?.message || ''}</p>
              {!ModalData.registerContributorModal.existing &&
                <>
                  <Form.Control name="password" type={state.showPassword?"text":"password"} placeholder="Password for contributor" ref={register({required:"Password is required"})}/>
                  <p className="py-0 text-right"> <small className="hover-primary cur-point" onClick={_ => setState({showPassword:!state.showPassword})}>{state.showPassword? 'Hide':'Show'}</small> </p>
                  <p className="text-danger">{errors.email?.message || ''}</p>
                </>
              }
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" type="submit" form={"registerContributorForm"} disabled={state.isBusy}>Submit</Button>
        <Button variant="danger" onClick={onClose} >Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export const RegisterContributorModal = React.memo(RegisterContributorModalComponent);
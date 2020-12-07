import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { EnumModals, useMultiState } from '../../../lib';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ApiCreateClip, ApiCreateContributor, ICreateClipPayload, ICreateContributorPayload } from './api';
import { ActionsModal } from './reducers';

interface IFormData extends ICreateClipPayload{
    
}

interface IState{
}

const initialState={} as IState;

function CreateClipModalComponent(){
    const dispatch = useDispatch();
    const store = useSelectorTyped((state)=>({
        show: state.modals.openModals.includes(EnumModals.CREATE_CLIP),
    }))

    const [state,setState]= useMultiState(initialState);

    const {errors, register, handleSubmit} = useForm<IFormData>({
      mode:"onSubmit",
      reValidateMode:"onChange",
    })
    
    const onClose=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.CREATE_CLIP));
    }

    const onSubmit=(data: IFormData)=>{
      ApiCreateClip(data).then(res=>{
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
        <p>Create Clip</p>
      </Modal.Header>
      <Modal.Body>
        <Form id="registerContributorForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Control name="title" type="text" placeholder="Title" ref={register({required:"Title is required"})}/>
              <p className="text-danger">{errors.title?.message || ''}</p>
              <Form.Control name="lession" type="text" placeholder="Lesson" ref={register({required:"Lesson is required"})}/>
              <p className="text-danger">{errors.lession?.message || ''}</p>
              <Form.Control name="description" type="text" placeholder="Description" ref={register({required:"Description is required"})}/>
              <p className="text-danger">{errors.description?.message || ''}</p>
              <Form.Control name="deadline" type={"text"} placeholder="Deadline for contributor" ref={register({required:"Deadline is required"})}/>
              <p className="text-danger">{errors.deadline?.message || ''}</p>
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

export const CreateClipModal = React.memo(CreateClipModalComponent);
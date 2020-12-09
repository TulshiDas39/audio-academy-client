import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { EnumModals, useMultiState } from '../../../lib';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ApiCreateTutorial, ApiCreateContributor, ICreateTutorialPayload, ICreateContributorPayload } from './api';
import { ActionsModal } from './reducers';

interface IFormData extends ICreateTutorialPayload{
    
}

interface IState{
}

const initialState={} as IState;

function CreateTutorialModalComponent(){
    const dispatch = useDispatch();
    const store = useSelectorTyped((state)=>({
        show: state.modals.openModals.includes(EnumModals.CREATE_TUTORIAL),
    }))

    const [state,setState]= useMultiState(initialState);

    const {errors, register, handleSubmit} = useForm<IFormData>({
      mode:"onSubmit",
      reValidateMode:"onChange",
    })
    
    const onClose=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.CREATE_TUTORIAL));
    }

    const onSubmit=(data: IFormData)=>{
      ApiCreateTutorial(data).then(res=>{
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
        <p>Create Tutorial</p>
      </Modal.Header>
      <Modal.Body>
        <Form id="registerTutorialForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Control name="title" type="text" placeholder="Title" ref={register({required:"Title is required"})}/>
              <p className="text-danger">{errors.title?.message || ''}</p>
              <Form.Control name="bookId" type="text" placeholder="Description" ref={register({required:"Description is required"})}/>
              <p className="text-danger">{errors.bookId?.message || ''}</p>
              <Form.Control name="bookEdition" type={"text"} placeholder="BookEdition for contributor" ref={register({required:"BookEdition is required"})}/>
              <p className="text-danger">{errors.bookEdition?.message || ''}</p>
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" type="submit" form={"registerTutorialForm"}>Submit</Button>
        <Button variant="danger" onClick={onClose} >Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export const CreateTutorialModal = React.memo(CreateTutorialModalComponent);
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { EnumModals, useMultiState } from '../../../lib';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ApiCreateBook, ICreateBookPayload } from './api';
import { ActionsModal } from './reducers';

interface IFormData{
    name:string;
    level:string;
}

interface IState{
  editions:string[];
  edition:string;
  writers:string[];
  writer:string;
}

const initialState={
  editions:[],
  edition:"",
  writers:[],
  writer:"",
} as IState;

function CreateBookModalComponent(){
    const dispatch = useDispatch();
    const store = useSelectorTyped((state)=>({
        show: state.modals.openModals.includes(EnumModals.CREATE_BOOK),
    }))

    const [state,setState]= useMultiState(initialState);

    const {errors, register, handleSubmit} = useForm<IFormData>({
      mode:"onSubmit",
      reValidateMode:"onChange",
    })
    
    const onClose=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.CREATE_BOOK));
    }

    const onSubmit=(data: IFormData)=>{
      if(!state.editions.length) return;
      if(!state.writers.length) return;
      const payload:ICreateBookPayload={
        editions:state.editions,
        level:data.level,
        name:data.name,
        writers:state.writers,
      }
      ApiCreateBook(payload).then(res=>{
        if(res.response){
          onClose();
        }
      })
    }

    const handleEditionPress=(event: React.KeyboardEvent<HTMLInputElement>)=>{
      if(event.key === 'Enter') {
        event.preventDefault();
        if(state.editions.includes(state.edition)) return;
        setState({
          editions:[...state.editions,state.edition],
          edition:"",
        })
      }
    }

    const handleWriterPress=(event: React.KeyboardEvent<HTMLInputElement>)=>{
      if(event.key === 'Enter') {
        event.preventDefault();
        if(state.editions.includes(state.edition)) return;
        setState({
          writers:[...state.writers,state.writer],
          writer:"",
        })
      }
    }

    return (
    <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show = {store.show}
    >
      <Modal.Header closeButton onHide={onClose}>
        <p>Create Book</p>
      </Modal.Header>
      <Modal.Body>
        <Form id="createBookForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Control name="name" type="text" placeholder="Name" ref={register({required:"Name is required"})}/>
              <p className="text-danger">{errors.name?.message || ''}</p>
              <Form.Control name="level" type="text" placeholder="Level" ref={register({required:"Level is required"})}/>
              <p className="text-danger">{errors.level?.message || ''}</p>

              <div>
                <div className="row mx-0">
                  {
                    state.editions.map(edn=>(
                      <div key={edn} className="col-auto border rounded">{edn} 
                        <span className="cur-point" onClick={_=> setState({editions:state.editions.filter(x=>x !== edn)})}>&times;</span>
                      </div>
                    ))
                  }
                </div>
                <div className="py-1">
                  <Form.Control name="edition" type="text" value={state.edition} onChange={e=>setState({edition:e.target.value})} placeholder="Enter editions" onKeyPress={handleEditionPress} />
                </div>

              </div>

              <div>
                <div className="row mx-0">
                  {
                    state.writers.map(wrt=>(
                      <div key={wrt} className="col-auto border rounded">{wrt} 
                        <span className="cur-point" onClick={_=> setState({writers:state.writers.filter(x=>x !== wrt)})}>&times;</span>
                      </div>
                    ))
                  }
                </div>
                <div className="py-1">
                  <Form.Control name="writers" type="text" value={state.writer} onChange={e=>setState({writer:e.target.value})} placeholder="Enter writers" onKeyPress={handleWriterPress} />
                </div>

              </div>
              
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" type="submit" form={"createBookForm"}>Submit</Button>
        <Button variant="danger" onClick={onClose} >Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export const CreateBookModal = React.memo(CreateBookModalComponent);
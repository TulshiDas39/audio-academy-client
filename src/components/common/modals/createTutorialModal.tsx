import React, { ChangeEvent, useEffect } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { EnumModals, useMultiState } from '../../../lib';
import { IEntityBook } from '../../../lib/types/entities';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ApiCreateTutorial, ApiSearchBook, ICreateTutorialPayload } from './api';
import { ActionsModal } from './reducers';

interface IFormData {
  title: string;
  description:string;
}

interface IState{
  bookName:string;
  selectedBook:IEntityBook;
  bookSuggestions: IEntityBook[];
  selectedBookEdiion:string;
}

const initialState={
  bookName:"",
  selectedBook:null!,
  bookSuggestions:[],
  selectedBookEdiion:"",

} as IState;
let preventBlur = false;

function CreateTutorialModalComponent(){
    const dispatch = useDispatch();
    const store = useSelectorTyped((state)=>({
        show: state.modals.openModals.includes(EnumModals.CREATE_TUTORIAL),
    }))

    const [state,setState]= useMultiState(initialState);

    useEffect(()=>{
      if(!store.show) setState(initialState);
    },[store.show])

    const {errors, register, handleSubmit} = useForm<IFormData>({
      mode:"onSubmit",
      reValidateMode:"onChange",
    })
    
    const onClose=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.CREATE_TUTORIAL));
    }

    const onSubmit=(data: IFormData)=>{
      const payload:ICreateTutorialPayload={
        title:data.title,
        description:data.description,
        bookEdition:state.selectedBookEdiion,
        bookId:state.selectedBook._id,
      }
      ApiCreateTutorial(payload).then(res=>{
        if(res.response){
          onClose();
        }
      })
    }

    const handleBookSearch=(e:ChangeEvent<HTMLInputElement>)=>{
      if(state.selectedBook){
        setState({
          selectedBook:null!,
          selectedBookEdiion:"",
        })
      }
      if(!e.target.value){
        setState({
          bookSuggestions:[],
          bookName:"",
        })
        return;
      }
      setState({
        bookName:e.target.value,
      })
      ApiSearchBook({keyword:e.target.value}).then(res=>{
        if(res.response)setState({
          bookSuggestions:res.response.data,
        })
      })

    }

    const handleBookSelect=(book:IEntityBook)=>{
      preventBlur=false;
      setState({
        selectedBook:book,
        bookName:book.name,
        bookSuggestions:[],
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
              <Form.Control name="description" type="text" placeholder="Description" ref={register({required:"Description is required"})}/>
              <p className="text-danger">{errors.description?.message || ''}</p>
              <div>
                <Form.Control type="text" value={state.bookName} placeholder="Select a book" 
                  onChange={handleBookSearch} onBlur={()=> !preventBlur && setState({bookSuggestions:[]})}/> 
                {
                  state.bookSuggestions.map(b=>(
                    <div key={b._id} className="border cur-point" onMouseDown={_=> preventBlur = true} onClick={_=>handleBookSelect(b)}>
                      <span>{b.name}</span> <br/>
                      <span className="text-secondary">{b.writers.join()}</span>
                    </div>
                  ))
                }
              </div>

          {!!state.selectedBook && <Dropdown className="mt-2">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Book edition: {state.selectedBookEdiion || state.selectedBook.editions[state.selectedBook.editions.length-1]}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {state.selectedBook.editions.map(ed=>(
                <Dropdown.Item key={ed} onClick={() => setState({selectedBookEdiion:ed})}>{ed}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>}

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
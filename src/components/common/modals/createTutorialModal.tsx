import React, { ChangeEvent, useEffect } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { mutate } from 'swr';
import { ApiRoutes, ArrayUtil, EnumModals, useMultiState } from '../../../lib';
import { IEntityBook } from '../../../lib/types/entities';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ApiGetTutorials } from '../../Tutorials/api';
import { ApiCreateTutorial, ApiSearchBook, ApiUpdateTutorial, ICreateTutorialPayload } from './api';
import { ModalData } from './modalData';
import { ActionsModal } from './reducers';

interface IFormData {
  title: string;
  description:string;
}

interface IState{
  bookName:string;
  selectedBook:IEntityBook;
  bookSuggestions: IEntityBook[];
  selectedBookEdition:string;
}

const initialState={
  bookName:"",
  selectedBook:null!,
  bookSuggestions:[],
  selectedBookEdition:"",

} as IState;
let preventBlur = false;

function CreateTutorialModalComponent(){
    const dispatch = useDispatch();
    const store = useSelectorTyped((state)=>({
        show: state.modals.openModals.includes(EnumModals.CREATE_TUTORIAL),
    }))

    const {errors, register, handleSubmit,setValue} = useForm<IFormData>({
      mode:"onSubmit",
      reValidateMode:"onChange",
    })

    const [state,setState]= useMultiState(initialState);

    useEffect(()=>{
      if(!store.show) {
        ModalData.createTutorialModal.existing = undefined;
        setState(initialState);
      }
      else{
        const existing = ModalData.createTutorialModal.existing;
        if(existing){
          setValue("description",existing.description);
          setValue("title",existing.title);
          setState({selectedBook:existing.book,
            bookName:existing.book.name,
            selectedBookEdition:existing.bookEdition
          })
        }
      }
    },[store.show])
    
    const onClose=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.CREATE_TUTORIAL));
    }

    const createTutorial=(data: IFormData)=>{
      const payload:ICreateTutorialPayload={
        title:data.title,
        description:data.description,
        bookEdition:state.selectedBookEdition,
        bookId:state.selectedBook._id,
      }
      ApiCreateTutorial(payload).then(res=>{
        if(res.response){
          mutate(ApiRoutes.TutorialAll,(data:any[])=>{
            return ArrayUtil.AddItemToIndex(data,0,res.response?.data!);
          },false);
          onClose();
        }
      })
    }
    const updateTutorial=(data: IFormData)=>{

      const existing = ModalData.createTutorialModal.existing;
      if(!existing) return;
      existing.title = data.title;
      existing.description = data.description;
      if(state.selectedBook) {
        existing.bookId = state.selectedBook._id
        existing.bookEdition = state.selectedBookEdition;
      }
      ApiUpdateTutorial(existing).then(res=>{
        if(res.response){
          mutate(ApiRoutes.TutorialAll,(data:any[])=>{
            return ArrayUtil.UpdateItem(data,existing,"_id");
          });
          onClose();
        }        
      })
    }

    const onSubmit=(data: IFormData)=>{
      if(!ModalData.createTutorialModal.existing) createTutorial(data);
      else updateTutorial(data);
    }

    const handleBookSearch=(e:ChangeEvent<HTMLInputElement>)=>{
      if(state.selectedBook){
        setState({
          selectedBook:null!,
          selectedBookEdition:"",
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
        selectedBookEdition:book.editions[book.editions.length-1],
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
              Book edition: {state.selectedBookEdition}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {state.selectedBook.editions.map(ed=>(
                <Dropdown.Item key={ed} onClick={() => setState({selectedBookEdition:ed})}>{ed}</Dropdown.Item>
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
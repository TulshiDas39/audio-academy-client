import React, { ChangeEvent } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { EnumModals, useMultiState } from '../../../lib';
import { ITutorialEntity } from '../../../lib/types/entities';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ApiCreateClip, ApiSearchTutorial, ICreateClipPayload } from './api';
import { ActionsModal } from './reducers';

interface IFormData{
    title: string;
    lession: string;
    description: string;
    deadline :string;
}

interface IState{
  tutorialName:string;
  selectedTutorial: ITutorialEntity;
  tutorialSuggestions: ITutorialEntity[];
}

const initialState={
  tutorialName:"",
  tutorialSuggestions:[],
  selectedTutorial:null!,
} as IState;

let preventBlur = false;

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
      ApiCreateClip({
        ...data,
        tutorialId:state.selectedTutorial._id,
      }).then(res=>{
        if(res.response){
          onClose();
        }
      })
    }

    const handleTutorialSearch=(e:ChangeEvent<HTMLInputElement>)=>{
      if(!e.target.value) {
        setState({
          tutorialSuggestions:[],
          tutorialName: "",
        })
        return;
      }

      setState({
        tutorialName:e.target.value,
      })

      ApiSearchTutorial({
        keyword: e.target.value
      }).then(res=>{
        if(res.response) setState({tutorialSuggestions:res.response.data})
      });
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
              <div>
                <Form.Control type="text" value={state.tutorialName} placeholder="Select Tutorial" 
                  onBlur={()=>!preventBlur && setState({tutorialSuggestions:[]})}
                  onChange={handleTutorialSearch}
                />
                <div className="">
                  {
                    state.tutorialSuggestions.map(t=>(
                      <div className="border rounded py-1 cur-point"
                       onMouseDown={_ => preventBlur = true}
                       onMouseUp={_=> preventBlur = false}
                       onClick={_=>setState({selectedTutorial:t,tutorialName:t.title,tutorialSuggestions:[]})}>
                        {t.title}
                      </div>
                    ))
                  }
                </div>
              </div>
              <Form.Control name="description" 
                type="textarea" placeholder="Description" 
                as={"textarea"} rows={3} 
                ref={register({required:"Description is required"})}
                className="mt-1"
                />

              <p className="text-danger">{errors.description?.message || ''}</p>
              <Form.Control name="deadline" type={"text"} placeholder="Deadline for contributor" ref={register()}/>
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
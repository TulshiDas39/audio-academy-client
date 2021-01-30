import React, { ChangeEvent, FocusEvent, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import useSWR, { mutate } from 'swr';
import { ApiRoutes, EnumModals, useMultiState } from '../../../lib';
import { IClipEntity, IEntityUser, ITutorialEntity } from '../../../lib/types/entities';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ApiGetAllContributors } from '../../contributors/api';
import { ApiCreateClip, ApiSearchTutorial, ApiUpdateClip, ICreateClipPayload } from './api';
import { ActionsModal } from './reducers';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { ModalData } from './modalData';
import { apiGetSingleTutorialDetails } from '../../singleTutorialDetails/api';
import { fetchContributors } from '../../contributors/contributors';

interface IFormData{
    title: string;
    lession: string;
    description: string;
}

interface IState{
  contributorSearchKey:string;
  selectedContributor:IEntityUser;
  tutorialSuggestions: ITutorialEntity[];
  contributorSuggestions:IEntityUser[];
  fetchTriggerKey : string;
  selectedDeadline?: string;
}

const initialState={
  contributorSearchKey:"",
  tutorialSuggestions:[],
  selectedTutorial:null!,
  selectedContributor:null!,
  contributorSuggestions:[],
  fetchTriggerKey: Date.now()+"",
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
    
    useEffect(()=>{
      if(!store.show) {        
        setState(initialState);
        ModalData.createClipModal.existing = undefined;
      }
      else if(ModalData.createClipModal.existing){
        const existingClip = ModalData.createClipModal.existing;
        setState({
          selectedContributor:existingClip.contributor,
          selectedDeadline:existingClip.deadline,
          contributorSearchKey:existingClip.contributor?.name            
        })
      }
      
     
    },[store.show])
    const {data} = useSWR(ApiRoutes.AllContributors, fetchContributors)
    const onClose=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.CREATE_CLIP));
    }

    const onSubmit=(data: IFormData)=>{
    const tutorialId = window.location.pathname.split("/").pop();
      if(!tutorialId) return;
      if(ModalData.createClipModal.existing){
        const existingClip = ModalData.createClipModal.existing;
        const payload:IClipEntity = {
          ...existingClip,
          _id:existingClip._id,
          contributorId: state.selectedContributor?._id || null!,
          description: data.description,
          lession: data.lession,
          title: data.title,
          deadline: state.selectedDeadline,
          tutorialId: tutorialId,
        };
        ApiUpdateClip(payload).then(res=>{
          if(res.response) {
            onClose();
            mutate(tutorialId,apiGetSingleTutorialDetails(tutorialId),false)
          }
        });
      }
      else ApiCreateClip({
        ...data,
        contributorId:state.selectedContributor?._id,
        tutorialId: tutorialId,
        deadline: state.selectedDeadline,
      }).then(res=>{
        if(res.response){
          onClose();
        }
      })
    }

    const getContributorSuggestions=(searchKey:string)=>{
      return data?.filter?.(x=>x.name.startsWith(searchKey) || x.email.startsWith(searchKey));
    }
    const handleContributorSearch=(e:ChangeEvent<HTMLInputElement>)=>{
      //setState({contributorSearchKey:e.target.value});
      // if(!e.target.value) setState({contributorSuggestions:[]})
      setState({
        contributorSearchKey:e.target.value,
        contributorSuggestions: getContributorSuggestions(e.target.value),
        selectedContributor:!e.target.value?undefined:state.selectedContributor
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
              <Form.Control defaultValue={ModalData.createClipModal.existing?.title} name="title" type="text" placeholder="Title" ref={register({required:"Title is required"})}/>
              <p className="text-danger">{errors.title?.message || ''}</p>
              <Form.Control defaultValue={ModalData.createClipModal.existing?.lession} name="lession" type="text" placeholder="Lesson" ref={register({required:"Lesson is required"})}/>
              <p className="text-danger">{errors.lession?.message || ''}</p>

              <Form.Control name="description" 
                type="textarea" placeholder="Description" 
                as={"textarea"} rows={3} 
                ref={register({required:"Description is required"})}
                className="mt-1"
                defaultValue={ModalData.createClipModal.existing?.description}
                />

              <p className="text-danger">{errors.description?.message || ''}</p>
             
              <div className="mb-1">
                <span>Deadline(optional): </span>
                <DatePicker className="border border-primary rounded" selected={state.selectedDeadline? new Date(state.selectedDeadline):undefined} onChange={(date:Date) => setState({selectedDeadline: moment(date).toISOString()})} />
              </div>

               <div>
                <Form.Control type="text" value={state.contributorSearchKey} placeholder="Select Contributor"
                  onFocus={(e:FocusEvent<HTMLInputElement>)=> setState({contributorSuggestions:getContributorSuggestions(e.target.value)})} 
                  onBlur={()=>!preventBlur && setState({contributorSuggestions:[]})}
                  onChange={handleContributorSearch}
                />
                <div className="">
                  {
                    state.contributorSuggestions.map(t=>(
                      <div className="border rounded py-1 cur-point"
                       onMouseDown={_ => preventBlur = true}
                       onMouseUp={_=> preventBlur = false}
                       onClick={_=>setState({selectedContributor:t,contributorSearchKey:t.name,contributorSuggestions:[]})}>
                        {t.name}
                      </div>
                    ))
                  }
                </div>
              </div>
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
import React, { useMemo } from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import { EnumModals, useMultiState } from '../../lib';
import { useDispatchTyped } from '../../store/store';
import { ActionsModal } from '../common/modals';
import { apiGetSingleTutorialDetails } from './api';
import { Clip } from './subComponents/singleClip';

type FilterButtonName = "All"|"Submitted"|"Not Submitted"

interface IFilterButton{
    name:FilterButtonName;
    id:string;
}
const filterButtons:IFilterButton[]=[
    {
        id:"all",
        name:"All",
    },
    {
        id:"submitted",
        name:"Submitted",
    },
    {
        id:"Not_Submitted",
        name:"Not Submitted"
    }
]
interface IState{
    selectedFilterButton:IFilterButton;    
}
const initialState:IState={
    selectedFilterButton:filterButtons[0],
}
function SingleTutorialDetailsComponent(){
    const dispatch = useDispatchTyped();
    const [state,setState]=useMultiState(initialState);
    const tutorialId = window.location.pathname.split("/").pop();
    const {data} = useSWR(tutorialId!,()=>apiGetSingleTutorialDetails(tutorialId!).then(res=>{
        if(res.response) return res.response.data;
        throw res.error;
    }));
    const filteredClips = useMemo(()=>{
        if(state.selectedFilterButton.name === "All")return data?.clips;
        if(state.selectedFilterButton.name === "Submitted") return data?.clips.filter(x=>!!x.submissionDate);
        if(state.selectedFilterButton.name === "Not Submitted") return data?.clips.filter(x=>!x.submissionDate);
    },[data?.clips,state.selectedFilterButton])
    return (
        <div>
            <div>
                <h6 className="mt-2">{data?.tutorial.title}</h6>
                <p>{data?.tutorial.description}</p>
                <div className="text-right">
                    <Button onClick={()=>  dispatch(ActionsModal.showModal(EnumModals.CREATE_CLIP))}>Add Clip</Button>
                </div>
                <div>
                    <ButtonGroup >
                        {filterButtons.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                type="radio"
                                variant="secondary"
                                name="radio"
                                value={radio.name}
                                checked={state.selectedFilterButton.id === radio.id}
                                // onChange={(e) => setRadioValue(e.currentTarget.value)}
                                onClick={()=>setState({selectedFilterButton:radio})}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </div>
            </div>
            <hr/>
            <div>
                <h6 className="mb-3">Clips</h6>
                <div>
                    {
                        filteredClips?.map(x=>(
                            <Clip key={x._id} clip={x}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export const SingleTutorialDetails = React.memo(SingleTutorialDetailsComponent);
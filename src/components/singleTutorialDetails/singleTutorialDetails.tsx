import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import { EnumModals } from '../../lib';
import { ActionsModal } from '../common/modals';
import { apiGetSingleTutorialDetails } from './api';
import { Clip } from './subComponents/singleClip';

function SingleTutorialDetailsComponent(){
    const dispatch = useDispatch();
    const tutorialId = window.location.pathname.split("/").pop();
    const {data} = useSWR(tutorialId!,()=>apiGetSingleTutorialDetails(tutorialId!).then(res=>{
        if(res.response) return res.response.data;
        throw res.error;
    }));
    return (
        <div>
            <div>
                <h6>{data?.tutorial.title}</h6>
                <p>{data?.tutorial.description}</p>
                <Button onClick={()=>  dispatch(ActionsModal.showModal(EnumModals.CREATE_CLIP))}>Add Clip</Button>
            </div>
            <hr/>
            <div>
                <h6>Clips</h6>
                <div>
                    {
                        data?.clips.map(x=>(
                            <Clip key={x._id} clip={x}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export const SingleTutorialDetails = React.memo(SingleTutorialDetailsComponent);
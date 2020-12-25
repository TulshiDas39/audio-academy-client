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
    const {data} = useSWR(tutorialId!,()=>apiGetSingleTutorialDetails(tutorialId!));
    return (
        <div>
            <div>
                <h6>{data?.response?.data.tutorial._doc.title}</h6>
                <p>{data?.response?.data.tutorial._doc.description}</p>
                <Button onClick={()=>  dispatch(ActionsModal.showModal(EnumModals.CREATE_CLIP))}>Add Clip</Button>
            </div>
            <hr/>
            <div>
                <h6>Clips</h6>
                <div>
                    {
                        data?.response?.data.clips.map(x=>(
                            <Clip key={x._id} clip={x}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export const SingleTutorialDetails = React.memo(SingleTutorialDetailsComponent);
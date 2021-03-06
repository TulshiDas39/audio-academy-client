import moment from 'moment';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { mutate } from 'swr';
import { apiDownloadFile, ArrayUtil, DownloadAudio, EnumModals, getFileName } from '../../../lib';
import { IClipModel } from '../../../lib/types/models';
import { ThreeDotCustomToggle } from '../../books/subComponents';
import { ActionsModal } from '../../common/modals';
import { ModalData } from '../../common/modals/modalData';
import { apiDeleteClip, IGetSingleTutorialDetails } from '../api';

interface IProps{
    clip:IClipModel;
}

function ClipComponent(props:IProps){
    const dispatch = useDispatch();
    const handleEdit=()=>{
        ModalData.createClipModal.existing = props.clip;
        dispatch(ActionsModal.showModal(EnumModals.CREATE_CLIP));
    }
    const handleDelete=()=>{
        let index = -1;
        mutate(props.clip.tutorialId,(data:IGetSingleTutorialDetails)=>{
            const newData = {...data};
            index= data.clips.findIndex(x=>x._id === props.clip._id);
            newData.clips = data.clips.filter(x=>x._id !== props.clip._id);
            return newData;
        },false)
        apiDeleteClip(props.clip._id).then(res=>{
            if(!res.response){
                mutate(props.clip.tutorialId,(data:IGetSingleTutorialDetails)=>{
                    const newData = {...data};
                    newData.clips = ArrayUtil.AddItemToIndex(newData.clips,index,props.clip);
                    return newData;
                },false)
            }
        })
    }

    const downloadFile = ()=>{
        apiDownloadFile(props.clip.fileId!).then(res=>{
            if(res.response) DownloadAudio(res.response?.data, getFileName(res.response) || "clip.mp3");
        })
    }

    const showContributorDetails=()=>{
        ModalData.userProfileModal.user = props.clip.contributor;
        dispatch(ActionsModal.showModal(EnumModals.USER_PROFILE));
    }

    return( <div className="border rounded bg-white p-2 mb-1">
        <div className="d-flex">
            <h6 className="flex-grow-1">{props.clip.title}</h6>
            {/* <span onClick={()=>{
                ModalData.createClipModal.existing = props.clip;
                dispatch(ActionsModal.showModal(EnumModals.CREATE_CLIP));
            }} className="cur-point border rounded">Edit</span> */}
            <Dropdown className="ml-auto">
                    <Dropdown.Toggle as={ThreeDotCustomToggle} id="dropdown-basic-we-singleClip" />
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
            </Dropdown>
        </div>
        <p>Lesson: {props.clip.lession}</p>
        <p>{props.clip.description}</p>
        {props.clip.contributor && <p> Contributor: <u className="text-info cur-point" onClick={showContributorDetails}>{props.clip.contributor?.name}</u></p>}
        {props.clip.deadline && <p> Deadline: {moment(props.clip.deadline).format('DD, MMM YYYY')}</p>}
        {props.clip.submissionDate &&
        <div className="d-flex">
             <p className="flex-grow-1"> Submission date: {moment(props.clip.submissionDate).format('DD, MMM YYYY')}</p>
             <p className="text-primary cur-point"><u onClick={downloadFile}>Download audio</u></p>
        </div>
         }
    </div>)
}

export const Clip = React.memo(ClipComponent);
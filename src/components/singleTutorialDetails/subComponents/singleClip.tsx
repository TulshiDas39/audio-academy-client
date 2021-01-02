import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { EnumModals } from '../../../lib';
import { IClipModel } from '../../../lib/types/models';
import { ActionsModal } from '../../common/modals';
import { ModalData } from '../../common/modals/modalData';

interface IProps{
    clip:IClipModel;
}

function ClipComponent(props:IProps){
    const dispatch = useDispatch();
    return( <div className="border rounded bg-white p-1 mb-1">
        <div className="d-flex">
            <h6 className="flex-grow-1">{props.clip.title}</h6>
            <span onClick={()=>{
                ModalData.createClipModal.existing = props.clip;
                dispatch(ActionsModal.showModal(EnumModals.CREATE_CLIP));
            }} className="cur-point border rounded">Edit</span>
        </div>
        <p>Lesson: {props.clip.lession}</p>
        <p>{props.clip.description}</p>
        {props.clip.contributor && <p> Contributor: {props.clip.contributor?.name}</p>}
        {props.clip.deadline && <p> Deadline: {moment(props.clip.deadline).format('DD, MMM YYYY')}</p>}
    </div>)
}

export const Clip = React.memo(ClipComponent);
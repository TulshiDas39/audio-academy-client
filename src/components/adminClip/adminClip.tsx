import React from 'react';
import moment from 'moment';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { IClipEntity } from '../../lib/types/entities';
import { useMultiState } from '../../lib';
import { Button } from 'react-bootstrap';
import './adminClip.scss';

interface IProps{
    clip:IClipEntity;
}
interface IState{
    file?: File
}
const initialState = {} as IState;
function AdminClipComponent(props:IProps){
    const [state,setState]=useMultiState(initialState);

    return (
        <div className="contributorClip border text-center row">
            <div className="col border">
                <h5 className="">{props.clip.title}</h5>
                <p className="text-secondary">Lession:{props.clip.lession}</p>
                <p className="text-success">Description: {props.clip.description}</p>
                {/* submissionDate */}
                <p>{props.clip.submissionDate ? `Submitted: ${moment(props.clip.submissionDate).format('DD MMM, YYYY')}`:`Assigned: ${moment(props.clip.createdAt).format('DD MMM, YYYY')}`}</p>
            </div>
        </div>
    )
}

export const AdminClip = React.memo(AdminClipComponent);
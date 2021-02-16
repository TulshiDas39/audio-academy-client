import React from 'react';
import moment from 'moment';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { IClipEntity } from '../../lib/types/entities';
import { EnumModals, useMultiState } from '../../lib';
import { apiSubmitClip } from '.';
import { Button } from 'react-bootstrap';
import './contributorClip.scss';
import { useDispatch } from 'react-redux';
import { ActionsModal } from '../common/modals';

interface IProps{
    clip:IClipEntity;
}
interface IState{
    file?: File
}
const initialState = {} as IState;
function ContributorClipComponent(props:IProps){
    const dispatch = useDispatch();
    const [state,setState]=useMultiState(initialState);

    const handleSubmit = ()=>{
        if(!state.file) return;
        apiSubmitClip({
            clipId:props.clip._id,
            file:state.file,
        });
    }

    return (
        <div className="contributorClip border text-center row">
            <div className="col border">
                <h5 className="">{props.clip.title}</h5>
                <p className="text-secondary">Lession:{props.clip.lession}</p>
                <p className="text-success">Description: {props.clip.description}</p>
                <p className="text-success cur-point"> <u onClick={()=>dispatch(ActionsModal.showModal(EnumModals.BOOK_DETAILS_MODAL))}>Book Details</u></p>
                <p>{props.clip.submissionDate ? `Submitted: ${moment(props.clip.submissionDate).format('DD MMM, YYYY')}`:`Assigned: ${moment(props.clip.createdAt).format('DD MMM, YYYY')}`}</p>
            </div>
            {!props.clip.submissionDate && <div className="col-auto d-flex justify-content-center flex-column px-5">
                {!state.file && <label htmlFor="upload-file">
                    <FaCloudUploadAlt title="Upload file" className="text-info display-1 cur-point my-auto" />
                </label>} 
                <input type="file" id="upload-file" className="d-none" multiple={false} accept=".mp3,audio/*" onChange={(e)=>{setState({file:e.target?.files?.[0] as File})}} />
                
                {
                    !! state.file && <p>{state.file.name} <span className="cur-point hover-primary" onClick={()=>setState({file: undefined})}>&times;</span></p>
                }
                {
                    !! state.file && <Button className="w-25 mx-auto" onClick={handleSubmit}>Submit</Button>
                }
                
            </div>}
        </div>
    )
}

export const ContributorClip = React.memo(ContributorClipComponent);
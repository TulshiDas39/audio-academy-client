import React, { Fragment, useCallback } from 'react';
import moment from 'moment';
import { FaCloudUploadAlt, FaFileAlt } from 'react-icons/fa';
import { IClipEntity } from '../../lib/types/entities';
import { apiDownloadFile, DownloadAudio, EnumModals, getFileName, useMultiState } from '../../lib';
import { apiSubmitClip } from '.';
import { Button } from 'react-bootstrap';
import './contributorClip.scss';
import { useDispatch } from 'react-redux';
import { ActionsModal } from '../common/modals';
import { ModalData } from '../common/modals/modalData';
import { apiGetBookDetails } from './api';

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
        }).then(res=>{
            if(res.response) dispatch(ActionsModal.showModal(EnumModals.TOAST));
        });
    }

    const showBookDetails=()=>{
        apiGetBookDetails(props.clip._id).then(res=>{
            if(res.response){
                ModalData.bookDetailsModal.book = res.response.data;
                dispatch(ActionsModal.showModal(EnumModals.BOOK_DETAILS_MODAL));
            }
        })
    }

    const downloadFile = useCallback(()=>{
        apiDownloadFile(props.clip.fileId!).then(res=>{
            if(res.response) DownloadAudio(res.response?.data, getFileName(res.response) || "clip.mp3");
        })
    },[])

    const showResubmodal=()=>{
        ModalData.resubmitModal.clip=props.clip;
        dispatch(ActionsModal.showModal(EnumModals.RESUBMIT_CLIP));
    }

    return (
        <div className="contributorClip border text-center row">
            <div className="col border">
                <h5 className="">{props.clip.title}</h5>
                <p className="text-secondary">Lession:{props.clip.lession}</p>
                <p className="text-success">Description: {props.clip.description}</p>
                <p className="text-success cur-point"> <u onClick={showBookDetails}>Book Details</u></p>
                <p>{props.clip.submissionDate ? `Submitted: ${moment(props.clip.submissionDate).format('DD MMM, YYYY')}`:`Assigned: ${moment(props.clip.createdAt).format('DD MMM, YYYY')}`}</p>

            </div>
            <div className="col-auto d-flex justify-content-center flex-column px-5">
                {
                    !props.clip.submissionDate?<Fragment>
                        {!state.file && <label htmlFor="upload-file">
                            <FaCloudUploadAlt title="Upload file" className="text-info display-1 cur-point my-auto" />
                        </label>}
                        <input type="file" id="upload-file" className="d-none" multiple={false} accept=".mp3,audio/*" onChange={(e) => { setState({ file: e.target?.files?.[0] as File }) }} />

                        {
                            !!state.file && <p>{state.file.name} <span className="cur-point hover-primary" onClick={() => setState({ file: undefined })}>&times;</span></p>
                        }
                        {
                            !!state.file && <Button className="w-75 mx-auto" onClick={handleSubmit}>Submit</Button>
                        }
                    </Fragment>:
                    <div>
                        <div className="d-flex flex-column">
                            <FaFileAlt className="h1 cur-point text-success mx-auto" title="Download submitted file" onClick={downloadFile} />
                            <span className="mx-auto small bg-secondary rounded px-3 text-white py-1 cur-point" onClick={showResubmodal}>Re-Submit</span>
                        </div>                        
                    </div>
                }
               
            </div>
            
        </div>
    )
}

export const ContributorClip = React.memo(ContributorClipComponent);
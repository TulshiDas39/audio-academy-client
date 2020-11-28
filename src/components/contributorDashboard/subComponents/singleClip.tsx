import React, { useRef, useState } from 'react';
import { IClipEntity } from '../../../lib/types/entities';
import moment from 'moment';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useMultiState } from '../../../lib';
import { Button } from 'react-bootstrap';

interface IProps{
    clip:IClipEntity;
}
interface IState{
    file?: File
}
const initialState = {} as IState;
function SingleClipComponent(props:IProps){
    const [state,setState]=useMultiState(initialState);

    const handleSubmit = ()=>{
        
    }

    return (
        <div className="singleClip border text-center row">
            <div className="col-8 border">
                <h5 className="">{props.clip.title}</h5>
                <p className="">Lession:{props.clip.lession}</p>
                <p className="text-primary">Description: {props.clip.description}</p>
                <p>Assigned: {moment(props.clip.createdAt).format('DD-MM-YYYY')}</p>
            </div>
            <div className="col-4 d-flex justify-content-center flex-column">
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
                
            </div>
        </div>
    )
}

export const SingleClip = React.memo(SingleClipComponent);
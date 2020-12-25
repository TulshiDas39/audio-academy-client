import React from 'react';
import { IClipModel } from '../../../lib/types/models';

interface IProps{
    clip:IClipModel;
}

function ClipComponent(props:IProps){
    return( <div className="border rounded bg-white p-1 mb-1">
        <h6>{props.clip.title}</h6>
        <p>Lesson: {props.clip.lession}</p>
        <p>{props.clip.description}</p>
    </div>)
}

export const Clip = React.memo(ClipComponent);
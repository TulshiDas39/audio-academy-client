import moment from 'moment';
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
        {props.clip.contributor && <p> Contributor: {props.clip.contributor?.name}</p>}
        {props.clip.deadline && <p> Deadline: {moment(props.clip.deadline).format('DD, MMM YYYY')}</p>}
    </div>)
}

export const Clip = React.memo(ClipComponent);
import React from 'react';
import { IClipEntity } from '../../../lib/types/entities';
import moment from 'moment';

interface IProps{
    clip:IClipEntity;
}
function SingleClipComponent(props:IProps){
    return (
        <div className="singleClip border text-center">
            <h5 className="">{props.clip.title}</h5>
            <p className="">Lession:{props.clip.lession}</p>
            <p>Assigned: {moment(props.clip.createdAt).format('DD-MM-YYYY')}</p>
        </div>
    )
}

export const SingleClip = React.memo(SingleClipComponent);
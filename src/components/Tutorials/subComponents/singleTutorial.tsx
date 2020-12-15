import React from 'react';
import { ITutorialEntity } from '../../../lib/types/entities';
import { ITutorialModel } from '../../../lib/types/models';
interface IProps{
    tutorial:ITutorialModel;
}
function SingleTutorialComponent(props:IProps){
    
    return (
        <div>
            <h1>{props.tutorial.title}</h1>
            <p>{props.tutorial.description}</p>
            <p>Book name: {props.tutorial.book.name}</p>
        </div>
    )
}

export const SingleTutorial = React.memo(SingleTutorialComponent);

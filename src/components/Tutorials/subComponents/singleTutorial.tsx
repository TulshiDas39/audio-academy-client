import moment from 'moment';
import React from 'react';
import { ITutorialData } from '../api';
interface IProps{
    tutorial:ITutorialData;
}
function SingleTutorialComponent(props:IProps){
    
    return (
        <div className="bg-white mt-2 py-1 px-2 border rounded">
            <h6>{props.tutorial._doc.title}</h6>
            <p>{props.tutorial._doc.description}</p>
            <p>Book name: {props.tutorial.book.name}</p>
            <p>Book edition: {props.tutorial._doc.bookEdition}</p>
            <p>Created: {moment(props.tutorial._doc.createdAt).format('Do MMM, YYYY')}</p>
        </div>
    )
}

export const SingleTutorial = React.memo(SingleTutorialComponent);

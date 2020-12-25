import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { UiRoutes } from '../../../lib';
import { ITutorialData } from '../api';
interface IProps{
    tutorial:ITutorialData;
}
function SingleTutorialComponent(props:IProps){
    
    return (
        <div className="bg-white mt-2 py-1 px-2 border rounded">
            <Link to={UiRoutes.Tutorials+"/"+props.tutorial._id}>{props.tutorial.title}</Link>
            <p>{props.tutorial.description}</p>
            <p>Book name: {props.tutorial.book.name}</p>
            <p>Book edition: {props.tutorial.bookEdition}</p>
            <p>Created: {moment(props.tutorial.createdAt).format('Do MMM, YYYY')}</p>
        </div>
    )
}

export const SingleTutorial = React.memo(SingleTutorialComponent);

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
            <Link to={UiRoutes.Tutorials+"/"+props.tutorial._doc._id}>{props.tutorial._doc.title}</Link>
            <p>{props.tutorial._doc.description}</p>
            <p>Book name: {props.tutorial.book.name}</p>
            <p>Book edition: {props.tutorial._doc.bookEdition}</p>
            <p>Created: {moment(props.tutorial._doc.createdAt).format('Do MMM, YYYY')}</p>
        </div>
    )
}

export const SingleTutorial = React.memo(SingleTutorialComponent);

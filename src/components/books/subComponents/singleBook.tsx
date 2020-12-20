import React from 'react';
import { IEntityBook } from '../../../lib/types/entities';

interface IProps{
    book:IEntityBook;
}

function SingleBookComponent(props:IProps){
    return (
        <div className="bg-white border rounded p-2">
            <h6>{props.book.name}</h6>
            <p>{props.book.level}</p>
            <p>{props.book.writers.join()}</p>
        </div>
    )
}

export const SingleBook = React.memo(SingleBookComponent);
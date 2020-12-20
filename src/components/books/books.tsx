import React from 'react';
import useSWR from 'swr';
import { ApiRoutes, UiRoutes } from '../../lib';
import { apiGetBooks } from './api';
import { SingleBook } from './subComponents';

function BooksComponent(){
    const {data,error} = useSWR(ApiRoutes.BooksAll,apiGetBooks)
    return (
        <div>
            {data?.response?.data.map(book=>(
                <SingleBook key={book._id} book={book} />
            ))}
        </div>
    )
}

const Books = React.memo(BooksComponent);
export default Books;
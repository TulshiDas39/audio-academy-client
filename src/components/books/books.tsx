import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import { ApiRoutes, EnumModals } from '../../lib';
import { ActionsModal } from '../common/modals';
import { apiGetBooks } from './api';
import { SingleBook } from './subComponents';

function BooksComponent(){
    const {data,error} = useSWR(ApiRoutes.BooksAll,apiGetBooks);
    const dispatch = useDispatch();
    return (
        <div>
            <div>
                <Button className="d-block ml-auto" onClick={()=>dispatch(ActionsModal.showModal(EnumModals.CREATE_BOOK))}>Create new</Button>
            </div>
            <div>
                {data?.response?.data.map(book=>(
                    <SingleBook key={book._id} book={book} />
                ))}
            </div>
        </div>
        
    )
}

const Books = React.memo(BooksComponent);
export default Books;
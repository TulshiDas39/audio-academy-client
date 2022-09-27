import React from 'react';
import { Button } from 'react-bootstrap';
import useSWR from 'swr';
import { ApiRoutes, EnumModals } from '../../lib';
import { useDispatchTyped } from '../../store/store';
import { ActionsModal } from '../common/modals';
import { apiGetBooks } from './api';
import { SingleBook } from './subComponents';

const fetchBooks=()=>{
    return apiGetBooks().then(res=>{
        if(res.response) return res.response.data;
        else throw res.error
    })
}

function BooksComponent(){
    const {data} = useSWR(ApiRoutes.BooksAll,fetchBooks);
    const dispatch = useDispatchTyped();
    return (
        <div>
            <div>
                <Button className="d-block ml-auto" onClick={()=>dispatch(ActionsModal.showModal(EnumModals.CREATE_BOOK))}>Create new</Button>
            </div>
            <div>
                {data?.map(book=>(
                    <SingleBook key={book._id} book={book} />
                ))}
            </div>
        </div>
        
    )
}

const Books = React.memo(BooksComponent);
export default Books;
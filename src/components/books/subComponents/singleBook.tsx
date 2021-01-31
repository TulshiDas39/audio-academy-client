import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaEllipsisH } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { mutate } from 'swr';
import { ApiRoutes, ArrayUtil, EnumModals } from '../../../lib';
import { IEntityBook } from '../../../lib/types/entities';
import { ActionsModal } from '../../common/modals';
import { ModalData } from '../../common/modals/modalData';
import { apiDeleteBook } from '../api';

export const ThreeDotCustomToggle = React.forwardRef<HTMLSpanElement,any>(({onClick}, ref) => (
    <span ref={ref} onClick={onClick}>
        <FaEllipsisH className="cur-point" />
    </span>
  ));

interface IProps{
    book:IEntityBook;
}

function SingleBookComponent(props:IProps){
    const dispatch = useDispatch();
    const handleEdit = ()=>{
        ModalData.createBookModal.existing = props.book;
        dispatch(ActionsModal.showModal(EnumModals.CREATE_BOOK));
    }
    const handleDelete = ()=>{
        let index = -1 ;
        mutate(ApiRoutes.BooksAll,(data:any[])=>{
            index = data.findIndex(x=>x._id === props.book._id);
            return data.filter(x=>x._id !== props.book._id);
        },false)
        apiDeleteBook(props.book._id).then(res=>{
            if(!res.response){
                mutate(ApiRoutes.BooksAll,(data:any[])=>{
                    return ArrayUtil.AddItemToIndex(data,index,props.book);
                },false)
            }
        })
    }
    return (
        <div className="bg-white border rounded p-2">
            <div className="d-flex">
                <h6>{props.book.name}</h6>
                <Dropdown className="ml-auto">
                    <Dropdown.Toggle as={ThreeDotCustomToggle} id="dropdown-basic-we" />
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <p>{props.book.level}</p>
            <p>{props.book.writers.join()}</p>
        </div>
    )
}

export const SingleBook = React.memo(SingleBookComponent);
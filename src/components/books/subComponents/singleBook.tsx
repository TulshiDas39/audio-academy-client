import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaEllipsisH } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { EnumModals } from '../../../lib';
import { IEntityBook } from '../../../lib/types/entities';
import { ActionsModal } from '../../common/modals';
import { ModalData } from '../../common/modals/modalData';

const CustomToggle = React.forwardRef<HTMLSpanElement,any>(({onClick}, ref) => (
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
        
    }
    return (
        <div className="bg-white border rounded p-2">
            <div className="d-flex">
                <h6>{props.book.name}</h6>
                <Dropdown className="ml-auto">
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-basic-we">
                        hi
                    </Dropdown.Toggle>
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
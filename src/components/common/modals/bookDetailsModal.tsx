import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ApiRoutes, ArrayUtil, EnumModals, useMultiState } from '../../../lib';
import { IEntityUser } from '../../../lib/types/entities';
import { useSelectorTyped } from '../../../store/rootReducer';
import { useDispatchTyped } from '../../../store/store';
import { ApiCreateContributor, ApiUpdateUser, ICreateContributorPayload } from './api';
import { ModalData } from './modalData';
import { ActionsModal } from './reducers';

interface IFormData{
  name:string,
  email:string,
  phone:string,
  password: string,
}

interface IState{
  showPassword?:boolean;
  isBusy:boolean,
}

const initialState={
  isBusy:false,
} as IState;

function BookDetailsModalComponent(){
    const dispatch = useDispatchTyped();
    const store = useSelectorTyped((state)=>({
        show: state.modals.openModals.includes(EnumModals.BOOK_DETAILS_MODAL),
    }))

    const [state,setState]= useMultiState(initialState);

    useEffect(()=>{
      if(!store.show) ModalData.registerContributorModal.existing = undefined;
    },[store.show])
    
    const onClose=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.BOOK_DETAILS_MODAL));
    }

    return (
    <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show = {store.show}
    >
      <Modal.Header closeButton onHide={onClose}>
        <p>Book Details</p>
      </Modal.Header>
      <Modal.Body>
        {
          (function(){
            const bookDetails  = ModalData.bookDetailsModal.book;
            if(!bookDetails) return <p>No book</p>
            return (
              <div>
                <h5>Book name:{bookDetails.name}</h5>
                <p>Authors:{bookDetails.writers.join()}</p>
                <p>Edition: {bookDetails.edition}</p>
              </div>
            )
          })()
        }

      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose} >Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export const BookDetailsModal = React.memo(BookDetailsModalComponent);
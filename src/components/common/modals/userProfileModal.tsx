import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { EnumModals, useMultiState } from '../../../lib';
import { IEntityUser } from '../../../lib/types/entities';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ModalData } from './modalData';
import { ActionsModal } from './reducers';

interface IState{
  user?:IEntityUser;
  isBusy:boolean;
}

const initialState={
  isBusy:false,
  user:undefined,
} as IState;

function UserProfileModalComponent(){
    const Data = ModalData.userProfileModal;
    const dispatch = useDispatch();
    const store = useSelectorTyped((state)=>({
        show: state.modals.openModals.includes(EnumModals.USER_PROFILE),
    }))

    const [state,setState]= useMultiState({...initialState,user:Data.user});

    useEffect(()=>{
      if(!store.show) {
        Data.user = undefined;
        Data.userId = undefined;
        setState({isBusy:false,user:undefined});
      }
      else{
        setState({user:Data.user});
      }
    },[store.show])
    
    const onClose=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.USER_PROFILE));
    }

    return (
    <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show = {store.show}
    >
      <Modal.Header closeButton onHide={onClose}>
        <p>User Details</p>
      </Modal.Header>
      <Modal.Body>
        {
          (function(){
            if(state.isBusy) return <p>Loading...</p>;
            if(!state.user) return null;
            return (
              <div>
                <h5>Name:{state.user.name}</h5>
                <p>Phone:{state.user.phone}</p>
                <p>Email: {state.user.email}</p>
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

export const UserProfileModal = React.memo(UserProfileModalComponent);
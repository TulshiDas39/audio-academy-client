import React, { useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { EnumModals } from '../../../lib';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ModalData } from './modalData';
import { ActionsModal } from './reducers';


function ToastComponent(){
    const dispatch = useDispatch();
    const store = useSelectorTyped(state=>({
        show:state.modals.openModals.includes(EnumModals.TOAST),
    }))
    useEffect(()=>{
        if(!store.show) {}
    },[store.show])
    const closeToast=()=>{
        dispatch(ActionsModal.hideModal(EnumModals.TOAST));
    }
    return (
        <Toast onClose={closeToast} show={store.show} delay={3000} autohide animation 
          className={`appToast position-absolute bg-success ${ModalData.AppToast.customClass?ModalData.AppToast.customClass:''}`}>
         {ModalData.AppToast.title && <Toast.Header>
             <strong className="mr-auto">{ModalData.AppToast.title}</strong>
          </Toast.Header>}
          <Toast.Body>
            <p className="mb-0 ">{ ModalData.AppToast.message}</p>
          </Toast.Body>
        </Toast>
    )
}

export const AppToast = React.memo(ToastComponent);
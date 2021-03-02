import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { EnumModals, useMultiState } from '../../../lib';
import { useSelectorTyped } from '../../../store/rootReducer';
import { apiSubmitClip } from '../../contributorClip';
import { ModalData } from './modalData';
import { ActionsModal } from './reducers';

interface IState{
  file?: File
  isBusy:boolean,
}

const initialState:IState={
  isBusy:false,
  file:undefined,
};

function ResubmitModalComponent(){
    const Data = ModalData.resubmitModal;
    const dispatch = useDispatch();
    const store = useSelectorTyped((state)=>({
        show: state.modals.openModals.includes(EnumModals.RESUBMIT_CLIP),
    }))

    const [state,setState]= useMultiState(initialState);

    useEffect(()=>{
      if(!store.show) setState(initialState);
    },[store.show])
    
    const onClose=()=>{
      dispatch(ActionsModal.hideModal(EnumModals.RESUBMIT_CLIP));
    }

    
    const handleSubmit = ()=>{
      if(!state.file || !Data.clip) return;
      apiSubmitClip({
          clipId:Data.clip._id,
          file:state.file,
      }).then(res=>{
          if(res.response) {
            dispatch(ActionsModal.hideModal(EnumModals.RESUBMIT_CLIP));
            ModalData.AppToast.message="Resubmitted successfully"
            dispatch(ActionsModal.showModal(EnumModals.TOAST));
          }
      });
  }

    return (
    <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show = {store.show}
    >
      <Modal.Header closeButton onHide={onClose}>
        <p>Resubmit clip</p>
      </Modal.Header>
      <Modal.Body>
        {
          (function(){
            return (
              <div className="text-center">
                {!state.file && <label htmlFor="upload-file-resubmit">
                            <FaCloudUploadAlt title="Upload file" className="text-info display-1 cur-point my-auto" />
                        </label>}
                        <input type="file" id="upload-file-resubmit" className="d-none" multiple={false} accept=".mp3,audio/*" onChange={(e) => { setState({ file: e.target?.files?.[0] as File }) }} />

                        {
                            !!state.file && <p>{state.file.name} <span className="cur-point hover-primary" onClick={() => setState({ file: undefined })}>&times;</span></p>
                        }
                        {
                            !!state.file && <Button className="w-75 mx-auto" onClick={handleSubmit}>Submit</Button>
                        }
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

export const ResubmitModal = React.memo(ResubmitModalComponent);
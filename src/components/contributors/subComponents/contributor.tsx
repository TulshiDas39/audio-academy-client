import React from 'react';
import { useDispatch } from 'react-redux';
import { EnumModals } from '../../../lib';
import { IEntityUser } from '../../../lib/types/entities';
import { ActionsModal } from '../../common/modals';
import { ModalData } from '../../common/modals/modalData';

interface IProps{
    user:IEntityUser;
}

function ContributorComponent(props:IProps){
    const dispatch = useDispatch();
    const handleEdit=()=>{
        ModalData.registerContributorModal.existing=props.user;
        dispatch(ActionsModal.showModal(EnumModals.REGISTER_CONTRIBUTOR));
    }
    return (
        <div className="border rounded bg-white p-1 mb-1">
            <div className="d-flex">
                <span>
                    {props.user.name}
                </span> 
                <span className="ml-auto cur-point" onClick={handleEdit}>
                    Edit
                </span>
            </div>
            <p>{props.user.email}</p>
            <p>{props.user.phone}</p>
        </div>
    )
}

export const Contributor = React.memo(ContributorComponent);
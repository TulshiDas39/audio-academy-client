import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { mutate } from 'swr';
import { ApiRoutes, ArrayUtil, EnumModals } from '../../../lib';
import { IEntityUser } from '../../../lib/types/entities';
import { useDispatchTyped } from '../../../store/store';
import { ThreeDotCustomToggle } from '../../books/subComponents';
import { ActionsModal } from '../../common/modals';
import { ModalData } from '../../common/modals/modalData';
import { ApiDeleteUser } from '../api';

interface IProps{
    user:IEntityUser;
}

function ContributorComponent(props:IProps){
    const dispatch = useDispatchTyped();
    const handleEdit=()=>{
        ModalData.registerContributorModal.existing=props.user;
        dispatch(ActionsModal.showModal(EnumModals.REGISTER_CONTRIBUTOR));
    }
    const handleDelete=()=>{
        let index = -1;
        mutate(ApiRoutes.AllContributors,(data:IEntityUser[])=>{
            index= data.findIndex(x=>x._id === props.user._id);
            const newData = data.filter(x=>x._id !== props.user._id);
            return newData;
        },false)
        ApiDeleteUser(props.user._id).then(res=>{
            if(!res.response){
                mutate(ApiRoutes.AllContributors,(data:IEntityUser[])=>{
                    const newData = ArrayUtil.AddItemToIndex(data.slice(),index,props.user);
                    return newData;
                },false)
            }
        })
    }
    return (
        <div className="border rounded bg-white p-1 mb-1">
            <div className="d-flex">
                <span>
                    {props.user.name}
                </span> 
                {/* <span className="ml-auto cur-point" onClick={handleEdit}>
                    Edit
                </span> */}
                <Dropdown className="ml-auto">
                    <Dropdown.Toggle as={ThreeDotCustomToggle} id="dropdown-basic-we-singleClip" />
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
            </Dropdown>
            </div>
            <p>{props.user.email}</p>
            <p>{props.user.phone}</p>
        </div>
    )
}

export const Contributor = React.memo(ContributorComponent);
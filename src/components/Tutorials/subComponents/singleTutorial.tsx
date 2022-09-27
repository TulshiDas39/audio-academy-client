import moment from 'moment';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { mutate } from 'swr';
import { ApiRoutes, ArrayUtil, EnumModals, UiRoutes } from '../../../lib';
import { useDispatchTyped } from '../../../store/store';
import { ThreeDotCustomToggle } from '../../books/subComponents';
import { ActionsModal } from '../../common/modals';
import { ModalData } from '../../common/modals/modalData';
import { ApiDeleteTutorial, ITutorialData } from '../api';
interface IProps{
    tutorial:ITutorialData;
}
function SingleTutorialComponent(props:IProps){
    const dispatch = useDispatchTyped();
    const handleEdit = ()=>{
        ModalData.createTutorialModal.existing = {...props.tutorial};
        dispatch(ActionsModal.showModal(EnumModals.CREATE_TUTORIAL));
    }
    const handleDelete = ()=>{
        let index = -1 ;
        mutate(ApiRoutes.TutorialAll,(data:any[])=>{
            index = data.findIndex(x=>x._id === props.tutorial._id);
            return data.filter(x=>x._id !== props.tutorial._id);
        },false)
        ApiDeleteTutorial(props.tutorial._id).then(res=>{
            if(!res.response){
                mutate(ApiRoutes.TutorialAll,(data:any[])=>{
                    return ArrayUtil.AddItemToIndex(data,index,props.tutorial);
                },false)
            }
        })
    }
    return (
        <div className="bg-white mt-2 py-1 px-2 border rounded">
            <div className="d-flex">
                <Link to={UiRoutes.Tutorials+"/"+props.tutorial._id}>{props.tutorial.title}</Link>
                <Dropdown className="ml-auto">
                    <Dropdown.Toggle as={ThreeDotCustomToggle} id="dropdown-basic-we" />
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <p>{props.tutorial.description}</p>
            <p>Book name: {props.tutorial.book.name}</p>
            <p>Book edition: {props.tutorial.bookEdition}</p>
            <p>Created: {moment(props.tutorial.createdAt).format('Do MMM, YYYY')}</p>
        </div>
    )
}

export const SingleTutorial = React.memo(SingleTutorialComponent);

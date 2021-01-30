import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import useSwr from 'swr';
import { ApiRoutes, EnumModals } from '../../lib';
import { ActionsModal } from '../common/modals';
import { ApiGetAllContributors } from './api';
import { Contributor } from './subComponents/contributor';


export const fetchContributors=()=>{
    return ApiGetAllContributors().then(res=>{
        if(res.response) return res.response.data;
        throw res.error;
    })
}


function ContributorsComponent(){
    const dispatch = useDispatch();

    const {data} = useSwr(ApiRoutes.AllContributors,fetchContributors);
    console.log(data);
    return (
        <div>
            <div>
                <Button onClick={()=> dispatch(ActionsModal.showModal(EnumModals.REGISTER_CONTRIBUTOR))} >Add Contributor</Button>
            </div>
            <div>
                {
                    data?.map?.((contr:any)=>(
                        <Contributor key = {contr._id} user = {contr} />
                    ))
                }
            </div>
        </div>
    )
}

const Contributors = React.memo(ContributorsComponent);
export default Contributors;
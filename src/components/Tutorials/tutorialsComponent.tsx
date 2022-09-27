import React from 'react';
import { Button } from 'react-bootstrap';
import useSwr from 'swr';
import { ApiRoutes, EnumModals } from '../../lib';
import { useDispatchTyped } from '../../store/store';
import { ActionsModal } from '../common/modals';
import { ApiGetTutorials } from './api';
import { SingleTutorial } from './subComponents';

function TutorialsComponent(){
    const dispatch = useDispatchTyped();
    const {data} = useSwr(ApiRoutes.TutorialAll,()=>{
        return ApiGetTutorials().then(res=>{
            if(res.response) return res.response.data;
            throw res.error;
        })
    });
    console.log(data);

    return (
        <div>
            <div className="">
                <Button onClick={()=> dispatch(ActionsModal.showModal(EnumModals.CREATE_TUTORIAL))} className="d-block ml-auto">Create new</Button>
            </div>
            <div>
                {
                    data?.map(tt=>(
                        <SingleTutorial key={tt._id} tutorial={tt} />
                    ))
                }
            </div>
            
        </div>
    )
}

const Tutorials = React.memo(TutorialsComponent);

export default Tutorials;
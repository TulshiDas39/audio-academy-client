import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectorTyped } from '../../store/rootReducer';
import { ThunkContributorDashboard } from './thunk';
import './constributorDashboard.scss';
import { SingleClip } from './subComponents/singleClip';

function ContributorDashboardComponent(){
    const dispatch = useDispatch();
    const store = useSelectorTyped((state)=>({
        getAssignedClips:state.api.getAssignedClips   
    }))
    useEffect(()=>{
        if(!store.getAssignedClips.isBusy) dispatch(ThunkContributorDashboard.GetAssignedClip());
    },[])
    return (<div className="contributorDashboard">
        {ThunkContributorDashboard.AssignedClips.map(clip=>(
            <SingleClip key={clip._id} clip={clip} />
        ))}
    </div>)
}

const ContributorDashboard = React.memo(ContributorDashboardComponent);

export default ContributorDashboard;
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectorTyped } from '../../../store/rootReducer';
import { useDispatchTyped } from '../../../store/store';
import { ContributorClip } from '../../contributorClip';
import { ThunkContributorDashboard } from '../thunk';


function AssignedClipsComponent(){
    const dispatch = useDispatchTyped();
    const store = useSelectorTyped((state)=>({
        getAllClips:state.api.getAllClips   
    }))
    useEffect(()=>{
        dispatch(ThunkContributorDashboard.GetAllClip());
    },[])
    const clips = React.useMemo(()=>{
        return ThunkContributorDashboard.AllClips.filter(clip => !clip.submissionDate);
    },[store.getAllClips.version]);
    return(
    <div>
        {clips.map(clip=>(
            <ContributorClip key={clip._id} clip={clip} />
        ))}
    </div>
    )
}

export const AssignedClips = React.memo(AssignedClipsComponent);
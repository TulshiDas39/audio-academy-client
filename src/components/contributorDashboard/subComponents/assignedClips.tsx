import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ThunkContributorDashboard } from '../thunk';
import { SingleClip } from './singleClip';


function AssignedClipsComponent(){
    const dispatch = useDispatch();
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
            <SingleClip key={clip._id} clip={clip} />
        ))}
    </div>
    )
}

export const AssignedClips = React.memo(AssignedClipsComponent);
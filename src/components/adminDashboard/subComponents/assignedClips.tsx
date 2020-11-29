import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectorTyped } from '../../../store/rootReducer';
import { AdminClip } from '../../adminClip';
import { CommonThunk } from '../../common/thunk';


function AssignedClipsComponent(){
    const dispatch = useDispatch();
    const store = useSelectorTyped((state)=>({
        getAllClips:state.api.getAllClips   
    }))
    useEffect(()=>{
        dispatch(CommonThunk.GetAllClip());
    },[])
    const clips = React.useMemo(()=>{
        return CommonThunk.AllClips.filter(clip => !clip.submissionDate);
    },[store.getAllClips.version]);
    return(
    <div>
        {clips.map(clip=>(
            <AdminClip key={clip._id} clip={clip} />
        ))}
    </div>
    )
}

export const AssignedClips = React.memo(AssignedClipsComponent);
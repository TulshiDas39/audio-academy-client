import React from 'react';
import useSWR from 'swr';
import { apiGetSingleTutorialDetails } from './api';

function SingleTutorialDetailsComponent(){

    const tutorialId = window.location.pathname.split("/").pop();
    const {data,error} = useSWR(tutorialId!,()=>apiGetSingleTutorialDetails(tutorialId!));

    return (
        <div>

        </div>
    )
}

export const SingleTutorialDetails = React.memo(SingleTutorialDetailsComponent);
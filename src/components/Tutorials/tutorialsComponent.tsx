import React from 'react';
import useSwr from 'swr/dist/use-swr';
import { ApiRoutes } from '../../lib';
import { ApiGetTutorials } from './api';
import { SingleTutorial } from './subComponents';

function TutorialsComponent(){
    const tutorials = React.useMemo(()=>{
        const res = useSwr(ApiRoutes.TutorialAll,{fetcher:ApiGetTutorials});
        return res.data?.response?.data
    },[])
    return (
        <div>
            {
                tutorials?.map(tt=>(
                    <SingleTutorial key={tt._id} tutorial={tt} />
                ))
            }
        </div>
    )
}

const Tutorials = React.memo(TutorialsComponent);

export default Tutorials;
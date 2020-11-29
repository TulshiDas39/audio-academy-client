import React from 'react';
import './adminDashboard.scss';
import { useMultiState } from '../../lib';
import { AssignedClips, SubmittedClips } from './subComponents';

interface IState{
    selectedTab:"Assigned"|"Submitted"
}
const initialState:IState={
    selectedTab:"Assigned",
}

function AdminDashboardComponent(){
    const [state,setState] = useMultiState(initialState);

    return (<div className="adminDashboard">
        <div className="row border-bottom clip-nav">
            <div className={`col-auto border-right cur-point p-2 ${state.selectedTab === 'Assigned'?'active':''}`} onClick={()=>setState({selectedTab:'Assigned'})}>
                <span>Assigned</span>
            </div>
            <div className={`col-auto p-2 cur-point ${state.selectedTab === 'Submitted'?'active':''}`} onClick={()=>setState({selectedTab:'Submitted'})}>
                <span>Submitted</span>
            </div>
        </div>
        {
            state.selectedTab === 'Assigned'?<AssignedClips />:<SubmittedClips />
        }
    </div>)
}

const AdminDashboard = React.memo(AdminDashboardComponent);

export default AdminDashboard;
import React from 'react';
import { IEntityUser } from '../../../lib/types/entities';

interface IProps{
    user:IEntityUser;
}

function ContributorComponent(props:IProps){
    return (
        <div className="border rounded bg-white p-1 mb-1">
            <p>{props.user.name}</p>
            <p>{props.user.email}</p>
            <p>{props.user.phone}</p>
        </div>
    )
}

export const Contributor = React.memo(ContributorComponent);
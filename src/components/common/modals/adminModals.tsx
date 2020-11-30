import React, { Fragment } from 'react';
import { RegisterContributorModal } from './registerContributorModal';

function AdminModalsComponent(){
    return (
        <Fragment>
            <RegisterContributorModal />
        </Fragment>
    )
}

export const AdminModals = React.memo(AdminModalsComponent);
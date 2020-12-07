import React, { Fragment } from 'react';
import { CreateClipModal } from './createClipModal';
import { RegisterContributorModal } from './registerContributorModal';

function AdminModalsComponent(){
    return (
        <Fragment>
            <RegisterContributorModal />
            <CreateClipModal />
        </Fragment>
    )
}

export const AdminModals = React.memo(AdminModalsComponent);
import React, { Fragment } from 'react';
import { CreateClipModal } from './createClipModal';
import { CreateTutorialModal } from './createTutorialModal';
import { RegisterContributorModal } from './registerContributorModal';

function AdminModalsComponent(){
    return (
        <Fragment>
            <RegisterContributorModal />
            <CreateClipModal />
            <CreateTutorialModal />
        </Fragment>
    )
}

export const AdminModals = React.memo(AdminModalsComponent);
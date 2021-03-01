import React, { Fragment } from 'react';
import { CommonModals } from './commonModals';
import { CreateBookModal } from './createBookModal';
import { CreateClipModal } from './createClipModal';
import { CreateTutorialModal } from './createTutorialModal';
import { RegisterContributorModal } from './registerContributorModal';

function AdminModalsComponent(){
    return (
        <Fragment>
            <RegisterContributorModal />
            <CreateClipModal />
            <CreateTutorialModal />
            <CreateBookModal />
            <CommonModals />
        </Fragment>
    )
}

export const AdminModals = React.memo(AdminModalsComponent);
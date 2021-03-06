import React, { Fragment } from 'react';
import { AppToast } from './toast';
import { UserProfileModal } from './userProfileModal';

function CommonModalsComponent(){
    return (
        <Fragment>
            <AppToast/>
            <UserProfileModal />
        </Fragment>
    )
}

export const CommonModals = React.memo(CommonModalsComponent);
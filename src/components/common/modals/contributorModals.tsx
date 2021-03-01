import React, { Fragment } from 'react';
import { BookDetailsModal } from './bookDetailsModal';
import { CommonModals } from './commonModals';
import { ResubmitModal } from './resubmitModal';

function ContributorModalsComponent(){
    return (
        <Fragment>
            <BookDetailsModal />
            <ResubmitModal />
            <CommonModals/>
        </Fragment>
    )
}

export const ContributorModals = React.memo(ContributorModalsComponent);
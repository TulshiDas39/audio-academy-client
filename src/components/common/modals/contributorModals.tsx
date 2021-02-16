import React, { Fragment } from 'react';
import { BookDetailsModal } from './bookDetailsModal';

function ContributorModalsComponent(){
    return (
        <Fragment>
            <BookDetailsModal />
        </Fragment>
    )
}

export const ContributorModals = React.memo(ContributorModalsComponent);
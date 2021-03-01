import React, { Fragment } from 'react';
import { AppToast } from './toast';

function CommonModalsComponent(){
    return (
        <Fragment>
            <AppToast/>
        </Fragment>
    )
}

export const CommonModals = React.memo(CommonModalsComponent);
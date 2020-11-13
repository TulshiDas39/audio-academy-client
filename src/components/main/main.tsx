import React, { Suspense } from 'react';
import { Layout } from '../layouts/layout';

function MainComponent(){
    console.log('rendering');
    return (
        <main>
            <Layout />
        </main>
    )
}

export const Main = React.memo(MainComponent);

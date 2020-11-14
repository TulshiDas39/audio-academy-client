import React from 'react';
import { Layout } from '../layouts/layout';
import './main.scss';

function MainComponent(){
    console.log('rendering');
    return (
        <main className="main">
            <Layout />
        </main>
    )
}

export const Main = React.memo(MainComponent);

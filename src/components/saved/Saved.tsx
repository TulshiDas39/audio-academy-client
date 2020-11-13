import React from 'react';

function SavedComponent(){
    return (
        <div>
            Saved
        </div>
    )
}

const Saved = React.memo(SavedComponent);

export default Saved;

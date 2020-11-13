import React from 'react';

function PrivacyPolicyComponent(){
    return (
        <div>
            privacy policy
        </div>
    )
}

const PrivacyPolicy = React.memo(PrivacyPolicyComponent);

export default PrivacyPolicy;
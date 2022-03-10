import React, { memo } from 'react';

const AttentionText = memo((props) => {
    const { postcode, className, text } = props;
    
    return (
        <>
            {typeof postcode === 'object' && postcode.length === 0 ? <p className={className} >{text}</p> : null}
        </>
    );
})

export default AttentionText;
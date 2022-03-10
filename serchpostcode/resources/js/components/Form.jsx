import React, { memo } from 'react';

const Form = memo((props) => {
    const { children, onSubmit } = props;
    
    return (
        <form onSubmit={onSubmit} action=''>
            { children }
        </form>
    );
})

export default Form;
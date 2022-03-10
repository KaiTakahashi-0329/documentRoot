import React, { memo } from 'react';

const Btn = memo((props) => {
    const {type, text, onClick} = props;
    
    return (
        <button type={type} className="btn btn-primary mt-3 mb-3" onClick={onClick}>{ text }</button>
    );
})

export default Btn;
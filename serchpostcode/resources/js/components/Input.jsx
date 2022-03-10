import React, { useState, memo } from 'react';
import Btn from './Btn';

const Input = memo((props) => {
    const {label, labelHelpText} = props;

    return (
        <>
            <label htmlFor="postcode" className="form-label">{ label }</label>
            <input type="text" className="form-control" id="postcode" aria-describedby="postcodeHelp" />
            <div id="postcodeHelp" className="form-text">{ labelHelpText }</div>
        </>
    );
})

export default Input;
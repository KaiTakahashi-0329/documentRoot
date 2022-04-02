import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import Form from '../components/Form';
import PostResultMessage from '../components/PostResultMessage';

function Create(props) {
    const { isPostResult, postResult } = props;

    return (
        <>
        <PostResultMessage postResult={postResult} />
        <div className="container w-75">
            <Form isPostResult={isPostResult} />
        </div>
        </>      
    );
}

export default Create;

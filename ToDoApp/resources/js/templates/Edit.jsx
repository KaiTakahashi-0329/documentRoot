import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Form from '../components/Form';
import PostResultMessage from '../components/PostResultMessage';

import useFetchTodo from '../hooks/useFetchTodo';

const Edit = (props) => {
    const {isPostResult, postResult} = props;

    const params = useParams();
    const id = params.id;
    const todo = useFetchTodo(id);

    useEffect(() => {
        isPostResult('');
    }, [])

    return (
        <>
            <PostResultMessage postResult={postResult} />
            <div className="container w-75">
                <Form todo={todo} />
            </div>
        </>
    )
}

export default Edit;
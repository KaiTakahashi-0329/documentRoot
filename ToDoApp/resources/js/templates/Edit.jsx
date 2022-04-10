import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Form from '../components/Form';
import PostResultMessage from '../components/PostResultMessage';

import useFetchTodo from '../hooks/useFetchTodo';
import axios from 'axios';

const Edit = (props) => {
    const {isPostResult, postResult} = props;
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    
    const submitForm = (data) => {
        axios.post(`/api/todo/update/${id}`, data)
        .then(() => {
            isPostResult('success')
            navigate('/')
        })
        .catch((error) => {
            console.log(error);
            isPostResult('error')
        })
    }

    const todo = useFetchTodo(id);

    useEffect(() => {
        isPostResult('');
    }, [])

    return (
        <>
            <PostResultMessage postResult={postResult} />
            <div className="container w-75">
                <Form todo={todo} onClickAddButton={submitForm} />
            </div>
        </>
    )
}

export default Edit;
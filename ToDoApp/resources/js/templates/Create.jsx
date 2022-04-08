import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../components/Form';
import PostResultMessage from '../components/PostResultMessage';

function Create(props) {
    const { isPostResult, postResult } = props;
    const navigate = useNavigate();

    /**
    * Postする処理
    *   成功したらTOPへリダイレクト
    *   失敗時はエラーメッセージの出力
    * @type {object} valuse
    */
   const submitForm = (data) => {
        axios.post('/api/store', data)
        .then(() => {
            isPostResult('success');
        })
        .then(() => {
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
            isPostResult('error');
        })
    }

    useEffect(() => {
        isPostResult('');
    }, [])

    return (
        <>
        <PostResultMessage postResult={postResult} />
        <div className="container w-75">
            <Form onClickAddButton={submitForm} />
        </div>
        </>      
    );
}

export default Create;

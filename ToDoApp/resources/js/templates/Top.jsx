import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import List from '../components/List';
import Item from '../components/Item';
import PrimaryButton from '../components/PrimaryButton';
import PostResultMessage from '../components/PostResultMessage';

const Top = (props) => {
    const { postResult } = props;
    
    const [todoList, setTodoList] = useState([]);
    
    useEffect(() => {
        const fetchTodoList = async () => {
            await axios.get('/api/todos').then(res => {
                setTodoList(res.data);    
            })
            .catch((error) => {
                console.log(error);
            })
        } 

        fetchTodoList();
    }, []);    

    return (
        <>
            <PostResultMessage postResult={postResult} />
            <Link to="/create">
                <PrimaryButton text="追加する" />
            </Link>
            <List>
                {
                    todoList.map((element, index) => {
                        return <Item key={index} id={element.id} title={element.title} text={element.text} created_at={element.created_at} />
                    })
                }
            </List>
        </>      
    );
}

export default Top;

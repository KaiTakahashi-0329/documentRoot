import { useState, useEffect } from 'react';

// idのTodoを取得
const useFetchTodo = (id) => {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        const fetchTodoList = async () => {
            await axios.get(`/api/todo/${id}`).then(res => {        
                setTodo(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        
        fetchTodoList();
        
    }, []);
    
    return todo
};

export default useFetchTodo;
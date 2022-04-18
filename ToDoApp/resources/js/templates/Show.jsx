import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

const Show = () => {
    const [todo, setTodo] = useState([]);
    
    // urlパラメーター取得
    const params = useParams();
    const id = params.id;
    const editLink = `/todo/edit/${id}`;
    const deleteLink = `/todo/delete/${id}`;
    
    useEffect(() => {
        const fetchTodoList = async () => {
            const id = params.id;

            // idのTodoを取得
            await axios.get(`/api/todo/${id}`).then(res => {
                setTodo(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }

        fetchTodoList();
    }, []);

    return (
        <div className="container w-75">
            <div className="mb-3">
                <div className="form-label">タイトル</div>
                {
                    todo.map((element, index) => {
                        return <div key={index} className="form-control">{element.title}</div>
                    })
                }
            </div>
            <div className="mb-3">
                <div className="form-label">内容</div>
                {
                    todo.map((element, index) => {
                        return <div key={index} className="form-control" style={{ height: '10rem' }}>{element.text}</div>
                    })
                }
            </div>
            <div className="mb-3 d-flex">
                <div>
                    <div className="form-label">重要度</div>
                    {
                        todo.map((element, index) => {
                            return <div key={index} className="form-control">{element.important.status}</div>
                        })
                    }
                </div>
                <div className="ms-3">
                    <div className="form-label">緊急度</div>
                    {
                        todo.map((element, index) => {
                            return <div key={index} className="form-control">{element.urgent.status}</div>
                        })
                    }
                </div>
                <div className="ms-3">
                    <div className="form-label">ステータス</div>
                    {
                        todo.map((element, index) => {
                            return <div key={index} className="form-control">{element.status.status}</div>
                        })
                    }
                </div>
            </div>
            <div className="mb-3 w-25">
                <div className="form-label">期限</div>
                {
                    todo.map((element, index) => {
                        return <div key={index} className="form-control">{element.deadline}</div>
                    })
                }
            </div>
            <Link to={editLink} className="card-text">編集する</Link>
            <Link to={deleteLink} className="card-text">削除する</Link>
        </div>
    )
}

export default Show;
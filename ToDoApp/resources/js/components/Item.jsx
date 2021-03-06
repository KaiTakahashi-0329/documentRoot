import { Link } from 'react-router-dom';

const item = (props) => {
    const { id, title, text, created_at } = props;
    const link = `/todo/${id}`;
    const editLink = `/todo/edit/${id}`;
    const deleteLink = `/todo/delete/${id}`;

    return (
        <li className="col">
            <div className="card h-100">
                <div className="card-body">
                    <h4 className="card-title">{ title }<span class="badge bg-secondary ms-2">New</span></h4>
                    <p className="card-text">{ text }</p>
                    <Link to={link} className="card-text">詳細を見る</Link>
                    <Link to={editLink} className="card-text ms-3">編集する</Link>
                    <Link to={deleteLink} className="card-text ms-3">削除する</Link>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{created_at}</small>
                </div>
            </div>
        </li>
    )
}
        
export default item;
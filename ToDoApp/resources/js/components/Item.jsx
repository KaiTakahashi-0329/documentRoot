import { Link } from 'react-router-dom';

const item = (props) => {
    const { id, title, text, created_at } = props;
    const link = `/todo/${id}`;

    return (
        <li className="col">
            <div className="card h-100">
                <div className="card-body">
                    <h4 className="card-title">{ title }<span class="badge bg-secondary ms-2">New</span></h4>
                    <p className="card-text">{ text }</p>
                    <Link to={link} className="card-text">More View</Link>
                    
                </div>
                <div className="card-footer">
                    <small className="text-muted">{created_at}</small>
                </div>
            </div>
        </li>
    )
}
        
export default item;
const item = (props) => {
    const { id, title, text, created_at } = props;

    return (
        <li className="col">
            <div className="card h-100">
                <div className="card-body">
                    <h4 className="card-title">{ title }<span class="badge bg-secondary ms-2">New</span></h4>
                    <p className="card-text">{ text }</p>
                    <a href="" className="card-text">More View</a>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{created_at}</small>
                </div>
            </div>
        </li>
    )
}
        
export default item;
const item = () => {
    return (
        <li className="col">
            <div className="card h-100">
                <div className="card-body">
                    <h4 className="card-title">Example Title <span class="badge bg-secondary">New</span></h4>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    <a href="" className="card-text">More View</a>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
        </li>
    )
}
        
export default item;
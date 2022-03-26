const List = (props) => {
    const { children } = props

    return (
        <ul className="row row-cols-1 row-cols-md-3 g-4 list-unstyled">
            { children }
        </ul>
    )
}

export default List;
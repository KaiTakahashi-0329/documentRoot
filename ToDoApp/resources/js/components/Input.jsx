const Input = (props) => {
    const { id, lable, type, onChange } = props;
    return (
        <>
            <label htmlFor={id} className="form-label">{lable}</label>
            <input type={type} className="form-control" id={id} onChange={ onChange } />
        </>
    )
};

export default Input;
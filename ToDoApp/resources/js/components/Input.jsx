const Input = (props) => {
    const { id, lable, type, onChange, value = '' } = props;
    
    return (
        <>
            <label htmlFor={id} className="form-label">{lable}</label>
            <input type={type} className="form-control" id={id} onChange={ onChange } defaultValue={value} />
        </>
    )
};

export default Input;
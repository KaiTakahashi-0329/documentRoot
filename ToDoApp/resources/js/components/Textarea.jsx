const Textarea = (props) => {
    const { id, lable, type, onChange, value = '' } = props;

    return (
        <>
            <label htmlFor={id} className="form-label">{lable}</label>
            <textarea type={type} className="form-control" id={id} onChange={ onChange } defaultValue={value} ></textarea>
        </>
    )
};

export default Textarea;
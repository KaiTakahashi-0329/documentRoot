const Selectbox = (props) => {
    const { label, selectArray, onChange } = props;

    const options = selectArray.map((element, index) => {
        return <option key={index} value={index + 1}>{ element }</option>
    });

    return (
        <>
            <label className="form-label">{ label }</label>
            <select class="form-select" defaultValue='0' onChange={ onChange }>
                { options }
            </select>
        </>
    )
};

export default Selectbox;
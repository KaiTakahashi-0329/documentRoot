const Selectbox = (props) => {
    const { label, selectArray, onChange, value = 1 } = props;

    const options = selectArray.map((element, index) => {
        return <option key={index} value={index + 1}>{ element }</option>
    });

    return (
        <>
            <label className="form-label">{ label }</label>
            <select class="form-select" defaultValue={value} onChange={ onChange }>
                { options }
            </select>
        </>
    )
};

export default Selectbox;
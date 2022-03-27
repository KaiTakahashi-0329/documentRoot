const Selectbox = (props) => {
    const { label, selectArray } = props;

    return (
        <>
            <label className="form-label">{ label }</label>
            <select class="form-select" defaultValue='0'>
                {selectArray.map((element, index) => {
                    return <option key={index} value={index}>{ element }</option>
                })}
            </select>
        </>
    )
};

export default Selectbox;
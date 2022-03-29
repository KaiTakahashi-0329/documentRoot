const Selectbox = (props) => {
    const { label, selectArray } = props;

    const options = selectArray.map((element, index) => {
        return <option key={index} value={index}>{ element }</option>
    });

    return (
        <>
            <label className="form-label">{ label }</label>
            <select class="form-select" defaultValue='0'>
                { options }
            </select>
        </>
    )
};

export default Selectbox;
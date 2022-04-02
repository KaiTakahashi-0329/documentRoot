const DisabledButton = (props) => {
    const { text } = props

    return (
        <button disabled type="button" class="btn btn-secondary">
            { text }
        </button>
    )
}

export default DisabledButton;
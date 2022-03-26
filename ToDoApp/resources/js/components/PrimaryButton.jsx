const PrimaryButton = (props) => {
    const { text } = props

    return (
        <button type="button" class="btn btn-primary">
            { text }
        </button>
    )
}

export default PrimaryButton;
const PrimaryButton = (props) => {
    const { text, onClick } = props

    return (
        <button type="button" class="btn btn-primary" onClick={ onClick }>
            { text }
        </button>
    )
}

export default PrimaryButton;
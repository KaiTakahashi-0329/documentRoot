const PostResultMessage = (props) => {
    const { postResult } = props;
    
    const verdictPostResult = (postResult) => {
        if(postResult === '') return null;

        if(postResult === 'success') {
            return <div className="alert alert-success">追加しました。</div>
        }
        return <div className="alert alert-danger">追加に失敗しました。再度お試しください。</div>
    }

    return (
        <>
        {
            verdictPostResult(postResult)
        }
        </>
    )
}

export default PostResultMessage;
import PrimaryButton from './PrimaryButton';

const Form = () => {
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">タイトル</label>
                <input type="text" className="form-control" id="title" />
            </div>
            <div className="mb-3">
                <label htmlFor="textarea" className="form-label">内容</label>
                <textarea type="text" className="form-control" id="textarea" ></textarea>
            </div>
            <div className="mb-3 d-flex">
                <div>
                    <label className="form-label">重要度</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected value="1">高</option>
                        <option value="2">中</option>
                        <option value="3">低</option>
                    </select>
                </div>
                <div className="ms-3">
                    <label className="form-label">優先度</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected value="1">高</option>
                        <option value="2">中</option>
                        <option value="3">低</option>
                    </select>
                </div>
            </div>
            <div className="mb-3 w-25">
                <label htmlFor="datetimepicker" className="form-label">期限</label>
                <input type="text" className="form-control" id="datetimepicker" />
            </div>

            <PrimaryButton text="追加する" />
        </form>
    )
}

$(function() {
    $("#datetimepicker").datetimepicker();
});

export default Form;
import PrimaryButton from './PrimaryButton';
import Selectbox from './Selectbox';

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
                    <Selectbox label='重要度' selectArray={ ['高', '中', '低'] } />
                </div>
                <div className="ms-3">
                    <Selectbox label='緊急度' selectArray={ ['高', '中', '低'] } />
                </div>
                <div className="ms-3">
                    <Selectbox label='ステータス' selectArray={ ['進行予定', '一時退避', '進行中', '完了'] } />
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

/*
* datetimepickerの実行
*/
$(function() {
    $("#datetimepicker").datetimepicker();
});

export default Form;
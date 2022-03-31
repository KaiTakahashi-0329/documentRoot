import React, { useState, useEffect } from 'react'

import PrimaryButton from './PrimaryButton';
import Selectbox from './Selectbox';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = () => {
    const [dataPicker, setDataPicker] = useState();
    const [values, setValues] = useState({
        title: '',
        text: '',
        important_id: 1,
        urgent_id: 1,
        status_id: 1,
        deadline: '',
    });

    const handleChange = (name) => (event) => {
        const newValues = {
            ...values,
            [name]: event.target.value
        }
        
        setValues(newValues);
    }

    /**
     * DataPickerの箇所だけe.target.valueを取得できないため個別で用意
     * 値を別のstateに保存してから、その値を元に再設定する
     */
    useEffect(() => {
        const newValues = {
            ...values,
            deadline: dataPicker
        }

        setValues(newValues);
        
    }, [dataPicker]);

    const submitForm = (data) => {
        axios.post('/api/store', data)
        .then(() => {
            console.log('送信完了しました。')
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">タイトル</label>
                <input type="text" className="form-control" id="title" onChange={handleChange('title')} />
            </div>
            <div className="mb-3">
                <label htmlFor="textarea" className="form-label">内容</label>
                <textarea type="text" className="form-control" id="textarea" onChange={handleChange('text')} ></textarea>
            </div>
            <div className="mb-3 d-flex">
                <div>
                    <Selectbox label='重要度' selectArray={ ['高', '中', '低'] } onChange={handleChange('important_id')} />
                </div>
                <div className="ms-3">
                    <Selectbox label='緊急度' selectArray={ ['高', '中', '低'] } onChange={handleChange('urgent_id')} />
                </div>
                <div className="ms-3">
                    <Selectbox label='ステータス' selectArray={ ['進行予定', '進行中', '完了', '一時退避'] } onChange={handleChange('status_id')} />
                </div>
            </div>
            <div className="mb-3 w-25">
                <label htmlFor="datetimepicker" className="form-label">期限</label>
                <DatePicker selected={dataPicker} showTimeSelect dateFormat="yyyy-MM-dd HH:mm:ss" onChange={(date) => setDataPicker(date)} />
            </div>

            <PrimaryButton text="追加する" onClick={ () => submitForm(values) } />
        </form>
    )
}

export default Form;
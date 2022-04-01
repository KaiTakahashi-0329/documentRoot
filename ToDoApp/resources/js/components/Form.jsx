import React, { useState, useEffect } from 'react'

import PrimaryButton from './PrimaryButton';
import Selectbox from './Selectbox';
import Input from './Input';
import Textarea from './Textarea';

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
        * deadlineのフォーマットを yyyy-MM-dd HH:mm:ss に変換する処理
        */
       const formattedDate = () => {
        const date = new Date(dataPicker);

        if(isNaN(date)) return;

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const _date = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const formattedDate = `${year}-${String(month).length > 1 ? month : '0' + month }-${String(_date).length > 1 ? _date : '0' + _date } ${String(hours).length > 1 ? hours : '0' + hours }:${String(minutes).length > 1 ? minutes : '0' + minutes }:${String(seconds).length > 1 ? seconds : '0' + seconds }`;
        
        return formattedDate;
    }

    useEffect(() => {
        /**
        * DataPickerの箇所だけe.target.valueを取得できないため個別で用意
        * 値を別のstateに保存してから、その値を元に再設定する
        */
        const setStateDeadline = () => {
            const date = formattedDate();

            const newValues = {
                ...values,
                deadline: date
            }
    
            setValues(newValues);
        }

        setStateDeadline();
        
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
                <Input id='title' lable='タイトル' type='text' onChange={handleChange('title')} />
            </div>
            <div className="mb-3">
                <Input id='textarea' lable='内容' type='text' onChange={handleChange('text')} />
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
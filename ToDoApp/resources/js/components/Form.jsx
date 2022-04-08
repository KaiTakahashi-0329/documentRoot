import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import DisabledButton from './DisabledButton';
import PrimaryButton from './PrimaryButton';
import Selectbox from './Selectbox';
import Input from './Input';
import Textarea from './Textarea';

import { isNull } from '../modules/validate';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = (props) => {
    const { onClickAddButton, todo= [] } = props;    

    const [validate, setValidate] = useState(false);
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

        /**
        * 「タイトル」部分のバリデーション
        * 空白 or null だったときにstateをfalseにする
        * @type {Strign} title
        */
        const validateTitle = (name) => {
            if(name !== 'title') return;

            const isNull_title = isNull(newValues.title);
            setValidate(isNull_title);
        }

        validateTitle(name);
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
    
    return (
        <form>
            <div className="mb-3">
                {
                    todo.length > 0 
                    ? <Input id='title' lable='タイトル' type='text' onChange={handleChange('title')} value={todo[0].title} /> 
                    : <Input id='title' lable='タイトル' type='text' onChange={handleChange('title')} />
                }
            </div>
            <div className="mb-3">
                {
                    todo.length > 0
                    ? <Textarea id='textarea' lable='内容' type='text' onChange={handleChange('text')} value={todo[0].text} />
                    : <Textarea id='textarea' lable='内容' type='text' onChange={handleChange('text')} />
                }
            </div>
            <div className="mb-3 d-flex">
                <div>
                {
                    todo.length > 0
                    ? <Selectbox label='重要度' selectArray={ ['高', '中', '低'] } onChange={handleChange('important_id')} value={todo[0].important_id} />
                    : <Selectbox label='重要度' selectArray={ ['高', '中', '低'] } onChange={handleChange('important_id')} />
                }
                </div>
                <div className="ms-3">
                {
                    todo.length > 0
                    ? <Selectbox label='緊急度' selectArray={ ['高', '中', '低'] } onChange={handleChange('urgent_id')} value={todo[0].urgent_id} />
                    : <Selectbox label='緊急度' selectArray={ ['高', '中', '低'] } onChange={handleChange('urgent_id')} />
                }   
                </div>
                <div className="ms-3">
                {
                    todo.length > 0
                    ? <Selectbox label='ステータス' selectArray={ ['進行予定', '進行中', '完了', '一時退避'] } onChange={handleChange('status_id')} value={todo[0].status_id} />
                    : <Selectbox label='ステータス' selectArray={ ['進行予定', '進行中', '完了', '一時退避'] } onChange={handleChange('status_id')} />
                }
                </div>
            </div>
            <div className="mb-3 w-25">
                <label htmlFor="datetimepicker" className="form-label">期限</label>
                {
                    todo.length > 0
                    ? <DatePicker selected={todo[0].status_id && dataPicker} showTimeSelect dateFormat="yyyy-MM-dd HH:mm:ss" onChange={(date) => setDataPicker(date)} />
                    : <DatePicker selected={dataPicker} showTimeSelect dateFormat="yyyy-MM-dd HH:mm:ss" onChange={(date) => setDataPicker(date)} />
                }
            </div>
            {
                validate ? <PrimaryButton text="追加する" onClick={ () => onClickAddButton(values) } /> : <DisabledButton text="追加する" />
            }
        </form>
    )
}

export default Form;
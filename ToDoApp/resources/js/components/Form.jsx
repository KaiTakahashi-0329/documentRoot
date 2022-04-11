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
    const { buttonText, onClickAddButton, todo = [] } = props;    

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

    /**
    * 「タイトル」部分のバリデーション
    * 空白 or null だったときにstateをfalseにする
    * @type {Strign} name
    * @type {Strign} targetData
    * @return {Boolean}
    */
    const validateTitle = (name, targetData) => {
        if(name !== 'title') return;

        const isNull_title = isNull(targetData);
        return isNull_title;
    }

    /**
    * 入力フォームに変更があったときに実行
    * 1. stateに入力値を保持する
    * 2. タイトルが空白でないかバリデーションする
    */
   const [importantId, setImportantId] = useState(1);
   const [urgentId, setUrgentId] = useState(1);
   const [statusId, setStatusId] = useState(1);

    const handleChange = (name) => (event) => {
        let newValues;

        if(event.target.classList.contains('js-select')) {
            if(name === 'important_id') {
                setImportantId(event.target.value);

                newValues = {
                    ...values,
                    [name]: importantId
                }
            }
            if(name === 'urgent_id') {
                setUrgentId(event.target.value);

                newValues = {
                    ...values,
                    [name]: urgentId
                }
            }
            if(name === 'status_id') {
                setStatusId(event.target.value);

                newValues = {
                    ...values,
                    [name]: statusId
                }
            }
        } else {
            // 1. stateに入力値を保持する
            newValues = {
                ...values,
                [name]: event.target.value
            }
        }
        
        console.log(name);
        console.log(newValues);
        setValues(newValues);

        // 2. タイトルが空白でないかバリデーションする
        const isValidate = validateTitle(name, newValues.title);
        setValidate(isValidate);
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

    /**
    * todoが更新された時のみ実行
    */
    useEffect(() => {    
        /**
        * @type {Array} data (FetchしてきたTODOデータが格納されている)
        * Titleが空白でないかバリデーションする
        */
        const validateTodo = (data) => {
            if(data.length > 0) {
                const isValidate = validateTitle('title', data[0].title);    
                setValidate(isValidate);
            }
        }

        const setStateTodo = (data) => {
            if(data.length > 0) {
                const newValues = {
                    ...data[0]
                }

                setValues(newValues);
            }
        }

        validateTodo(todo);
        setStateTodo(todo);

        

    }, [todo])

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
                    : <Selectbox label='重要度' selectArray={ ['高', '中', '低'] } onChange={handleChange('important_id')} value={importantId} />
                }
                </div>
                <div className="ms-3">
                {
                    todo.length > 0
                    ? <Selectbox label='緊急度' selectArray={ ['高', '中', '低'] } onChange={handleChange('urgent_id')} value={todo[0].urgent_id} />
                    : <Selectbox label='緊急度' selectArray={ ['高', '中', '低'] } onChange={handleChange('urgent_id')} value={urgentId}/>
                }   
                </div>
                <div className="ms-3">
                {
                    todo.length > 0
                    ? <Selectbox label='ステータス' selectArray={ ['進行予定', '進行中', '完了', '一時退避'] } onChange={handleChange('status_id')} value={todo[0].status_id} />
                    : <Selectbox label='ステータス' selectArray={ ['進行予定', '進行中', '完了', '一時退避'] } onChange={handleChange('status_id')} value={statusId} />
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
                validate ? <PrimaryButton text={buttonText} onClick={ () => onClickAddButton(values) } /> : <DisabledButton text={buttonText} />
            }
        </form>
    )
}

export default Form;
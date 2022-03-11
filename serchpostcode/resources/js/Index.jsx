import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

/**
* import components
*/
import Input from './components/Input';
import Form from './components/Form';
import Btn from './components/Btn';
import ListGroup from './components/ListGroup';
import AttentionText from './components/AttentionText';

const Index = () => {
    const [postcode, setPostcode] = useState('');

    /**
    * Buttonをクリックされたとき
    */
    const onClickBtn = () => {    
        const _postcode = document.getElementById('postcode').value;        
    
        // 郵便番号が空でないか
        const isset = issetPostcode(_postcode);
        const formattedPostcode = formatPostcode(_postcode);
    
        if(isset) {
            fetchInputPostcode(formattedPostcode);
        } else {
            // 赤字で表示する state管理...？
        }
    };

    /**
    * 郵便番号を取得するためにAPIを叩く
    * @param {String} formattedPostcode 郵便番号
    */
    const fetchInputPostcode = useCallback( async (formattedPostcode) => {
        try {
            const response = await fetch(`api/serch/${formattedPostcode}`);
            const json = await response.json();

            setPostcode(json);
        } catch (error) {
            console.log(error);
        }
    }, []);

    /**
     * 郵便番号をフォーマットするメイン処理
     * ・全角を半角に
     * ・ハイフンありだったらなしに  例: 123-4567 → 1234567
     * @param {String} postcode 郵便番号
     * @return {String}
     */
    const formatPostcode = (postcode) => {
        // ハイフンが入っていれば削除
        const deleteHyphenPostcode = deleteHyphen(postcode);

        // 全角を半角に
        const formattedPostcode = toHalfWidth(deleteHyphenPostcode);

        return formattedPostcode;
    };

    /**
     * ハイフンが入っていれば削除
     * ・ハイフンありだったらなしに  例: 123-4567　→ 1234567
     * @param {String} text 郵便番号
     * @return {String}
     */
    const deleteHyphen = (text) => {
        if(text.indexOf('-') > -1) {
            const formattedPostcode = text.replace('-', '');
            return formattedPostcode;
        } else if(text.indexOf('ー') > -1) {
            const formattedPostcode = text.replace('ー', '');
            return formattedPostcode;
        } else {
            return text
        }
    }

    /**
     * 全角を半角にする処理
     * @param {String} input 郵便番号
     * @return {String}
     */
    const toHalfWidth = (input) => {
        return input.replace(/[！-～]/g, (input) => {
            return String.fromCharCode(input.charCodeAt(0)-0xFEE0);
          }
        );
    };

    /**
     * 郵便番号が入力されていないか確認する
     * @param {String} postcode 郵便番号
     * @return {Boolean}
     */
    const issetPostcode = (postcode) => {
        let isset;

        if(postcode === '') {
            return isset = false;
        } else {
            return isset = true;
        }
    };

    /**
    * Formのエンターキー入力時に遷移しないようにする処理
    */
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    return (
        <>
            <h1 className='fs-2 mt-5 text-center'>郵便番号検索ツール</h1>
            <div className="container mt-5 mb-5">
                <Form onSubmit={ e => handleSubmit(e) } >
                    <Input label='郵便番号' labelHelpText='検索したい郵便番号を入力してください ※半角, ハイフン無し' btnText='検索' />
                    <Btn type='button' onClick={() => onClickBtn()} text='検索' />
                </Form>
                <ListGroup postcode={postcode} />
                <AttentionText postcode={postcode} className='text-danger mt-1' text='入力された郵便番号は見つかりませんでした。' />
            </div>
        </>
    );
}

export default Index;

if (document.getElementById('App')) {
    ReactDOM.render(<Index />, document.getElementById('App'));
}
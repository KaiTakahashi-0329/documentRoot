import React, { memo } from 'react';
import styled from 'styled-components';

const ListGroup = memo((props) => {
    const { postcode } = props;

    /**
    * Styled Components
    */
   const SListGroupe = styled.ul`
       min-height: 40px;
       > li {
           display: flex;
           align-item: center;
       }
    `;
    
    return (
        <>
            <SListGroupe className='list-group list-group-horizontal'>
                <li className='list-group-item flex-fill col-2'>郵便番号</li>
                <li className='list-group-item flex-fill col-3'>都道府県</li>
                <li className='list-group-item flex-fill col-3'>市区町村</li>
                <li className='list-group-item flex-fill col-2'>町域</li>
                <li className='list-group-item flex-fill col-2'>カナ</li>
            </SListGroupe>
            <SListGroupe className='list-group list-group-horizontal'>
                <li className='list-group-item flex-fill text-break col-2'>{ postcode === '' || postcode.length === 0 ? '' : postcode[0].postcode }</li>
                <li className='list-group-item flex-fill col-3'>{ postcode === '' || postcode.length === 0 ? '' : postcode[0].prefecture }</li>
                <li className='list-group-item flex-fill col-3'>{ postcode === '' || postcode.length === 0 ? '' : postcode[0].city }</li>
                <li className='list-group-item flex-fill col-2'>{ postcode === '' || postcode.length === 0 ? '' : postcode[0].local }</li>
                <li className='list-group-item flex-fill col-2'>{ postcode === '' || postcode.length === 0 ? '' : `${postcode[0].prefecture_kana} ${postcode[0].city_kana} ${postcode[0].local_kana}` }</li>
            </SListGroupe>
        </>
    );
})

export default ListGroup;
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import List from '../components/List';
import Item from '../components/Item';
import PrimaryButton from '../components/PrimaryButton';

function Top() {
    return (
        <>
            <Link to="/create">
                <PrimaryButton text="追加する" />
            </Link>
            <List>
                <Item />
                <Item />
            </List>
        </>      
    );
}

export default Top;

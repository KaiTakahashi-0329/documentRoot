import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Top from './templates/Top';
import Create from './templates/Create';
import Show from './templates/Show';

function Index() {
    const [postResult, setPostResult] = useState('');    

    const isPostResult = (result) => {
        setPostResult(result);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Top postResult={postResult} /> } />
                <Route path="/create" element={ <Create isPostResult={isPostResult} postResult={postResult} /> } />
                <Route path="/todo/:id" element={ <Show /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}

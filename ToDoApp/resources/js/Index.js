import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Top from './templates/Top';
import Create from './templates/Create';
import Show from './templates/Show';

function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Top /> } />
                <Route path="/create" element={ <Create /> } />
                <Route path="/todo/:id" element={ <Show /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}

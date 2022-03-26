import React from 'react';
import ReactDOM from 'react-dom';

function Index() {
    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                        <div className="card-body">I'm an example component!</div>
                        <div className="card-body">I'm an example component!</div>
                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
import React from 'react';

import './Endpoint.css'


const Endpoint = ({ endpoint, exit }) => {
    return (
        <div className='service-endpoint-page'>
            <button className='exit' onClick={exit}>←</button>
            <div>
                <h1>{endpoint.name}</h1>
            </div>
            <div className='content'>
                <div>
                    <label>path:</label>
                    <label>{endpoint.path}</label>
                </div>
                <div>
                    <label>method:</label>
                    <label>{endpoint.method}</label>
                </div>
                <div>
                    <label>variables:</label>
                    {endpoint.variables && endpoint.variables.map((variable) => {
                        return (
                        <div className='endpoint-variable'>
                            <div>
                                <label>{variable.name}: </label>
                                <label>{variable.type}</label>
                            </div>
                            {variable.optional && <label className='side-info'>optinal</label>}
                            {!variable.optional && <label className='side-info'>required</label>}
                        </div>)
                    })}
                </div>
            </div>
        </div>
    );
};

export default Endpoint;
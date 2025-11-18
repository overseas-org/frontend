import React, { useState } from 'react';
import './EndpointsSettings.css'

const EndpointsSettings = ({ serviceName, setEndpoints, next, back }) => {
    const [endpoints, setEndpointsData] = useState([]);

    const addEndpoint = (e) => {
        e.preventDefault();
        setEndpointsData([...endpoints, {
            endpoint_type: "RestApi",
            name: "hello",
            path: "/hello",
            method: "GET",
            variables: []
        }]);
    };

    const removeEndpoint = (e, endpointIndex) => {
        e.preventDefault();
        setEndpointsData(endpoints.filter((_, index) => index !== endpointIndex));
    }

    const addEndpointVar = (e, endpointIndex) => {
        e.preventDefault();
        const updatedEndpoints = [...endpoints];
        updatedEndpoints[endpointIndex].variables.push({
            name: "name",
            type: "string",
            optional: true
        });
        setEndpointsData(updatedEndpoints);
    };

    const removeEndpointVar = (e, endpointIndex, variableIndex) => {
        e.preventDefault();
        const updatedEndpoints = [...endpoints];
        updatedEndpoints[endpointIndex].variables = updatedEndpoints[endpointIndex].variables.filter((_, index) => index !== variableIndex);
        setEndpointsData(updatedEndpoints);
    };

    console.log(endpoints)
    return (
        <div className='scrollable'>
            <button className='back-button top' onClick={back}>←</button>
            <h1>Endpoints Settings</h1>
            <button className='add-endpoint-button' onClick={(addEndpoint)}>Add Endpoint +</button>
            {endpoints.map((endpoint, endpointIndex) => (
                <div className='endpoint-box' key={endpointIndex}>
                    <div>
                        <label>Type:</label>
                        <select 
                            onChange={(e) => {
                                const updatedEndpoints = [...endpoints];
                                updatedEndpoints[endpointIndex].endpoint_type = e.target.value;
                                setEndpointsData(updatedEndpoints);
                            }} 
                            value={endpoint.endpoint_type}
                        >
                            <option value="RestApi">REST API</option>
                        </select>
                    </div>
                    <div>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            placeholder="hello" 
                            value={endpoint.name}
                            onChange={(e) => {
                                const updatedEndpoints = [...endpoints];
                                updatedEndpoints[endpointIndex].name = e.target.value;
                                setEndpointsData(updatedEndpoints);
                            }}
                        />
                    </div>
                    <div>
                        <label>Path:</label>
                        <input 
                            type="text" 
                            placeholder="/hello" 
                            value={endpoint.path}
                            onChange={(e) => {
                                const updatedEndpoints = [...endpoints];
                                updatedEndpoints[endpointIndex].path = e.target.value;
                                setEndpointsData(updatedEndpoints);
                            }}
                        />
                    </div>

                    <div>
                        <label>Method:</label>
                        <select
                            onChange={(e) => {
                                const updatedEndpoints = [...endpoints];
                                updatedEndpoints[endpointIndex].method = e.target.value;
                                setEndpointsData(updatedEndpoints);
                                setEndpoints(updatedEndpoints);
                            }}
                            value={endpoint.method}
                        >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </div>
                    <div>
                        <label>variables:</label>
                    
                        {endpoints[endpointIndex].variables.map((variable, variableIndex) => (
                            <div className='variable-box'>
                                <div>
                                    <label>name:</label>
                                    <input 
                                        value={variable.name} 
                                        type='text' 
                                        onChange={(e) => {
                                            const updatedEndpoints = [...endpoints];
                                            updatedEndpoints[endpointIndex].variables[variableIndex].name = e.target.value;
                                            setEndpointsData(updatedEndpoints);
                                            setEndpoints(updatedEndpoints);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label>type:</label>
                                    <select 
                                        value={variable.type}
                                        onChange={(e) => {
                                            const updatedEndpoints = [...endpoints];
                                            updatedEndpoints[endpointIndex].variables[variableIndex].type = e.target.value;
                                            setEndpointsData(updatedEndpoints);
                                            setEndpoints(updatedEndpoints);
                                        }}
                                    >
                                        <option key="int" value="int">Int</option>
                                        <option key="string" value="string">Text</option>
                                        <option key="bool" value="boolean">Boolean</option>
                                    </select>
                                </div>
                                <div>
                                    <label>optional:</label>
                                    <input 
                                        type="checkbox" 
                                        checked={variable.optional} 
                                        onChange={(e) => {
                                            const updatedEndpoints = [...endpoints];
                                            updatedEndpoints[endpointIndex].variables[variableIndex].optional = e.target.checked;
                                            setEndpointsData(updatedEndpoints);
                                            setEndpoints(updatedEndpoints);
                                        }}
                                    />
                                </div>
                                <button onClick={(e)=>removeEndpointVar(e, endpointIndex, variableIndex)} className='remove-button'>🗑</button>
                            </div>
                        ))}
                        <button onClick={(e)=>addEndpointVar(e, endpointIndex)} className='new-variable-button'>+</button>
                    </div>
                    <button onClick={(e)=>removeEndpoint(e, endpointIndex)} className='remove-button'>🗑</button>
                    <br/>
                </div>
            ))}
        <button className='endpoints-next' onClick={()=>{setEndpoints(endpoints); next()}}>next</button>
        </div>
    );
};

export default EndpointsSettings;
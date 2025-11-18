import React, { useState, useEffect } from 'react';
import { serviceEndpoint } from '../../../../../variables/services';

import './Endpoints.css'
import Endpoint from './Endpoint/Endpoint';

const Endpoints = ({ serviceId }) => {
    const [endpoints, setEndpoints] = useState([]);
    const [currentPage, setCurrentPage] = useState("main")
    const [selectedEndpoint, setSelectedEndpoint] = useState({})

    console.log(endpoints)
    function fetchEndpoints () {
        const queryParams = new URLSearchParams({service_id: serviceId}).toString();
        
        console.log(endpoints)
        fetch(`${serviceEndpoint}/endpoints?${queryParams}`, {
                method: "GET",
                credentials: "include",
                headers: {
                "Content-Type": "application/json"
                }
            })
            .then(res => {
                if (!res.ok) { 
                return res.json().then(data => {
                    throw new Error("Error: " + (data.message || "Unknown error")); // Handle API error messages
                });
                }
                return res.json();
            })
            .then(data => {
                setEndpoints(data);
            })
            .catch(error => {
                console.error("Error fetching endpoints:", error);
            });
        }

    useEffect(fetchEndpoints, []);

    return (
        <div className='service-window-page'>
            {currentPage == "main" && 
            <div className='endpoints-menu'>
                <h1>Endpoints</h1>
                <div className='endpoints'>
                {endpoints.map((endpoint) => {
                    return (
                        <div className='endpoint'>
                            <div className='method'>{endpoint.method}</div>
                            <div className='endpoint-button' onClick={()=>{setCurrentPage("endpoint"); setSelectedEndpoint(endpoint)}}>
                                {endpoint.path}
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>}

            {currentPage == "endpoint" && 
                <Endpoint endpoint={selectedEndpoint} exit={()=>{setCurrentPage("main")}}/>    
            }

        </div>
    );
};

export default Endpoints;
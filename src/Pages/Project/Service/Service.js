import React, { useEffect, useState, exit } from 'react';

import { serviceEndpoint } from '../../../variables/services';

import ServiceInfo from './pages/ServiceInfo/ServiceInfo';

import ServiceNavbar from './ServiceNavbar/ServiceNavbar';

import "./Service.css"
import Components from './pages/Components/Components';
import Endpoints from './pages/Endpoints/Endpoints';


const Service = ({ service }) => {

    const [page, setCurrentPage] = useState("info")
    const [serviceInfo, setServiceInfo] = useState({})

    const pages = {
        "info": <ServiceInfo exit={exit} service={service} repoId={serviceInfo.repo_id} repoType={serviceInfo.repo_type}/>,
        "components": <Components serviceType={service.service_type} service={serviceInfo}/>,
        "endpoints": <Endpoints serviceId={service.id}/>
    }

    

    function fetch_service () {
            const queryParams = new URLSearchParams({id: service.id}).toString();
            
            fetch(`${serviceEndpoint}/service?${queryParams}`, {
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
                    setServiceInfo(data);
                })
                .catch(error => {
                    console.error("Error fetching services:", error);
                });
            }


    useEffect(fetch_service, []);

    return (
        <div className='service-window glassmorphism'>
            <ServiceNavbar setPage={(page)=>setCurrentPage(page)}/>
            {pages[page]}
        </div>
    );
};

export default Service;
import React, { useState, useEffect, exit } from 'react';
import { serviceEndpoint } from '../../../../../variables/services';
import "./ServiceInfo.css"
import Loading from '../../../../../components/Project/Service/Loading/Loading';
import { get_component } from '../Components/get_components';

const ServiceInfo = ({ service, repoId, repoType }) => {

    const [loading, setLoading] = useState(false)

    const[serviceInfo, setServiceInfo] = useState({});
    const [repo, setRepo] = useState({});
    
    const serviceTypes = {
        "ContainerService": "Container Service"
    }
    function fetch_service_info() {

    }

    const deleteService = async () => {
        const queryParams = new URLSearchParams({id: service.id}).toString();
        setLoading(true);
        await fetch(`${serviceEndpoint}/service?${queryParams}`, { // Add return here
            method: "DELETE",
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
        })
        .catch(error => {
            console.error("Error deleting service:", error);
            throw error; // Rethrow so callers can handle it
        });
        exit()
    };

    useEffect(fetch_service_info, []);
    useEffect(()=>{
        if (repoId){
            get_component("repo", { repo_id: repoId, repo_type: repoType}).then(result => {
                        setRepo(result)});
        }
    }, [repoId])
    return (
        <div className='service-info-window service-window-page'>
            <h1>{service.name}</h1>
            {Object.keys(repo).length > 0 &&
            <div className='repo-clone'>
                <code>git clone {repo.url}.git
                    <button className='copy-icon' onClick={() => navigator.clipboard.writeText(`git clone ${repo.url}.git`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
                    </button>
                </code>
            </div>}
            <div className='info'>
                <label>Service Type:</label>
                <label>{serviceTypes[service.service_type]}</label>
            </div>
            <button onClick={deleteService} className='remove-button'>🗑</button>
        </div>
    );
};

export default ServiceInfo;

import React, { useEffect, useState } from 'react';
import "./NewService.css"
import Container from './Container/Container';
import { serviceEndpoint } from '../../../../variables/services';
import Loading from '../../../../components/Project/Service/Loading/Loading';


const NewService = ({ exit, projectId }) => {
    // const [data, setData] = useState({})
    // const [loading, setLoading] = useState(false)
    const [serviceType, setServiceType] = useState("container");
    const [currentPage, setCurrentPage] = useState("chooseType");
    const [name, setName] = useState("");


    const submit = (data) =>{
        setCurrentPage("loading")
        fetch(serviceEndpoint + "/service", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data),
                    })
                    .then(res => {
                    if (!res.ok) { 
                        return res.json().then(data => {
                        throw new Error("Error: " + (data.message || "Unknown error")); // Handle API error messages
                        });
                    }
                    return res.json(); // Only parse JSON if response is OK (200)
                    })
                    .then(data => {
                        console.log(data)
                        exit()
                    })
                    .catch(error => {
                    // setError(error.message); // Store error message in state
                    console.error("Error fetching user:", error);
                    });
                    
                
    }



    return (
        <div>
            {/* <h3>new service</h3> */}
            {currentPage == "chooseType" && 
            <div className='new-service-form first-page'>
                <div className='info-block'>
                    <label className="new-service-form-label">type:</label>
                    <select name="type" id="service-type" className='type-select' onChange={(e) => {setServiceType(e.target.value)}}>
                            <option value="container">Container</option>
                            <option value="serverles">Serverless</option>
                            <option value="server">Server</option>
                            <option value="external">External</option>
                    </select>
                </div>
                <div className='info-block'>
                    <label>name:</label>
                    <input value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                </div>
                <div className='buttons'>
                    <button className=" new-service-button submit" onClick={()=>{setCurrentPage(serviceType)}}>continue →</button>
                    <button onClick={exit} className='new-service-button' >cancel</button>
                </div>
            </div>
        }   
        {currentPage == "container" && <Container projectId={projectId} submit={submit} serviceName={name} exitWindow={exit} back={()=>setCurrentPage("chooseType")}/>}
        {currentPage == "loading" && <Loading/>}
        </div>
    );
};

export default NewService;
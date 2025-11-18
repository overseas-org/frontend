import React, { useEffect, useState } from 'react';
import ServiceBox from '../ServiceBox/ServiceBox';
import { serviceEndpoint } from '../../../variables/services'
import SearchBar from '../../../components/SearchBar/SearchBar'
import NewService from './NewService/NewService';
import Service from '../Service/Service';

import './Services-new.css'
import Catalog from '../../../components/catalog/Catalog';

const Services = ({ projectId, select=false, selectService=()=>{} }) => {
    
    const [services, setServices] = useState([]);
    const [currentPage, setCurrentPage] = useState("main");
    const [filter, setFilter] = useState("");
    const [editObj, setEditObj] = useState() ;
    const [selectedService, setSelectedService] = useState({});


    // function setPage(page){
    //     setCurrentPage(page);
    // }

    // function fetch_services () {
    //     const queryParams = new URLSearchParams({filter: filter, project_id: projectId}).toString();
        
    //     fetch(`${serviceEndpoint}/services?${queryParams}`, {
    //             method: "GET",
    //             credentials: "include",
    //             headers: {
    //             "Content-Type": "application/json"
    //             }
    //         })
    //         .then(res => {
    //             if (!res.ok) { 
    //             return res.json().then(data => {
    //                 throw new Error("Error: " + (data.message || "Unknown error")); // Handle API error messages
    //             });
    //             }
    //             return res.json();
    //         })
    //         .then(data => {
    //             setServices(data);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching services:", error);
    //         });
    //     }
    
    // useEffect(fetch_services, [filter]);
    return (
        <div className='service-page'>
                {currentPage == "main" && (
                    <Catalog fetchUrl={`${serviceEndpoint}/services`}
                    fetchArgs = {{project_id: projectId}}
                    goToNewObject={()=>{setCurrentPage("newService")}}
                    catalogBox={(service)=>{return (
                        <ServiceBox goToService={()=>{
                            if (select)
                                selectService(service);
                            else
                                setCurrentPage("service");
                        }} selecteService={setSelectedService} serviceInfo={service}/>
                    )}}
                    />
                // <div className='main'>
                //     <div className='search-bar'>
                //         <SearchBar onSearch={setFilter}/>
                //     </div>
                //     <button onClick={()=>{setCurrentPage("newService")}} className='new-button glassmorphism'>+</button>
                //     <div className='service-boxs-containers'>
                //         <div className='service-view-page'>
                //             <div className='services'>
                //                 {services.map((service) => {
                //                     return (
                //                         <ServiceBox goToService={()=>{
                //                             if (select)
                //                                 selectService(service);
                //                             else
                //                                 setCurrentPage("service");
                //                         }} selecteService={setSelectedService} serviceInfo={service}/>
                //                     )
                //                     })}
                //             </div>
                //             {/* <button onClick={()=>{setCurrentPage("newService")}} className='new-button glassmorphism'>+</button> */}
                //         </div> 
                //     </div>
                //  </div>
                 )}
                {currentPage == "newService" && <NewService projectId={projectId} exit={()=>{setCurrentPage("main")}}/>}
                {currentPage == "service" && <Service exit={()=>{setCurrentPage("services")}} service={selectedService} />}
                {currentPage == "edit" && editObj}
                
        </div>
    );
};

export default Services;
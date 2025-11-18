import React from 'react';
import "./ServiceBox.css";
import { useNavigate } from "react-router-dom";

const ServiceBox = ({ id, serviceInfo, goToService, selecteService }) => {
    // const navigate = useNavigate();

    function toService() {
        goToService();
        selecteService(serviceInfo)
        // navigate("service/" + serviceInfo.id);
    }
    console.log(serviceInfo)

    return (
        <div id={id} className='service-box glassmorphism' onClick={toService}>
            <h1>{serviceInfo.service_name}</h1>
        </div>
    );
};

export default ServiceBox;
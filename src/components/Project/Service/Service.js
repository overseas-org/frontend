import React from 'react';


const Service = ({serviceInfo}) => {
    return (
        <div className='service-box'>
            <h1>{serviceInfo.name}</h1>
        </div>
    );
};

export default Service;
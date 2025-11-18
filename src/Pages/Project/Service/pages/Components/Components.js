import React, { useEffect, useState } from 'react';
import { get_component } from './get_components';
import './Components.css'


const Components = ({ serviceType, service }) => {
    const [components, setComponents] = useState({
        "repo": {},
        "pipeline": {},
        "registry": {}
    })
    console.log(components)
    useEffect(()=>{
        const component_types = [
            {
                name: "repo",
                id: service.repo_id,
                type: service.repo_type
            },
            {
                name: "pipeline",
                id: service.pipeline_id,
                type: service.pipeline_type
            },
            {
                name: "registry",
                id: service.image_registry_id,
                type: service.image_registry_type,
            }
        ]
        component_types.forEach(component => {
          
            if (!component.id) return; // skip if the ID doesn't exist
          
            get_component(component.name, {[`${component.name}_id`]: component.id, [`${component.name}_type`]: component.type}).then(result => {
              setComponents(prev => ({
                ...prev,
                [component.name]: result
              }));
            });
          });


        
        
    }, [])
    return (
        <div className='service-window-page'>
            { serviceType == "ContainerService" && 
            <div className='container-service-components'>
                <h1>Components Page</h1>
                <div className='container-service-component'>
                    {/* <label>repo:</label> */}
                    <a target="_blank" href={components.repo.url}>repo</a>
                </div>
                <div className='container-service-component'>
                    {/* <label>pipeline:</label> */}
                    <a target="_blank" href={components.pipeline.url}>pipeline</a>
                </div>
                <div className='container-service-component'>
                    {/* <label>image registry:</label> */}
                    <a target="_blank" href={components.registry.url}>image registry</a>
                </div>
            </div>}
        </div>
    );
};

export default Components;
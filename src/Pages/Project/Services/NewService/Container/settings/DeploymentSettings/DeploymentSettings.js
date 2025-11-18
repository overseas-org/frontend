import React from 'react';
import { useEffect, useState } from 'react';
import { get_connections } from '../connections';
import Kubernetes from './deployment_types/kubernetes/Kubernetes';
import './DeploymentSettings.css'
import { Back } from '../../../../../../../components/back/Back';


const DeploymentSettings = ({ data, serviceName, projectId, setDeployment, next, back }) => {
    const [currentPage, setCurrentPage] = useState("type")
    const [connections, setConnections] = useState([])
    const [settings, setSettings] = useState(Object.keys(data || {}).length !== 0 ? data : {
        deployment_type: "Kubernetes",
        connector_id: 0,
    })

    const get_deployment = () => {
        if(settings.deployment_type == "K8s"){
            return <Kubernetes serviceName={serviceName} projectId={projectId} setDeployment={setDeployment} next={next} preSetting={settings} back={()=>{setCurrentPage("type")}}/>
        }
    }

    useEffect(() => {get_connections(setConnections,"", "kubernetes", projectId)}, []);

    useEffect(() => {
        if (connections.length != 0 && settings.connector_id == 0){
            setSettings({
                ...settings,
                connector_id: connections[0].id,
                deployment_type: connections[0].connector_type,
            });
        }
    }, [connections]);
    
    return ( 
        currentPage == "type" ?
            <div className='new-service-deployment-setting-type'>
                <Back back={back}/>
                <h1>Infrastructure</h1>
                <div className='info-block deployment-type'>
                    <label>Deployment Type:</label>
                    <label className='deployment-type-input'>{settings.deployment_type}</label>
                </div>
                <div className='info-block'>
                    <label>Connector:</label>
                    <select
                        id="connector"
                        value={settings.connector_id}
                        onChange={(e) => {
                            const selectedId = parseInt(e.target.value);
                            const selectedConnection = connections.find(conn => conn.id === selectedId);
                    
                            if (selectedConnection) {
                                setSettings({
                                    ...settings,
                                    connector_id: selectedConnection.id,
                                    deployment_type: selectedConnection.connector_type,
                                });
                            }
                        }}
                    >
                        {connections.map((connection) => (
                            <option key={connection.id} value={connection.id}>
                                {connection.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className='next-button' onClick={()=>{setDeployment(settings);setCurrentPage("settings")}}>next</button>
            </div>
        : currentPage == "settings" ? get_deployment() : <div/>

    );
};

export default DeploymentSettings;
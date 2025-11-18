import React from 'react';
import { useEffect, useState } from 'react';


import "./Kubernetes.css"
import { Back } from '../../../../../../../../../components/back/Back';
import { get_project_name } from '../../../../../../../../../utils/project';

const Kubernetes = ({ projectId, serviceName, setDeployment, next, preSetting, back }) => {
    const [currentPage, setCurrentPage] = useState("component-type") // experimantal
    // const [connections, setConnections] = useState([])
    const [settings, setSettings] = useState({
        infrastructure_type: "KubernetesDeployment",
        connector_id: preSetting.connector_id,
        // "image": "hhana982/serviceb", //need to find a way to set image in the backend
        // "app": "serviceB",  // also shouldnt be in the frontend
        port: 5000,
        namespace: "", // project 
        app: serviceName,
        include_autoScale: "true",
        include_service: "true",
        max_replicas: 3,
        min_replicas: 1,
        include_pv: "false",
        pv_storage_class: "local-path",
        pv_storage_path: `/data/dbs-local-storage/${serviceName}`,
        pv_mount_path: "/",
        storage_amount: "1Gi",
        variables: [

        ] 
    })
    // const [settings, setSettings] = useState({
    //     connector_id: preSetting.connector_id,
    //     deployment_type: "Kubernetes",
    //     namespace: "overseas", // project name
    //     components: []
    // })

    const toNext = () => {
        setDeployment(settings)
        next()
    }
    // console.log(component)
    useEffect(()=>{
        get_project_name((projectName)=>setSettings({...settings, namespace: projectName}), projectId);
    }, [])
    return (
            // <div className='new-service-deployment-setting-kubernetes'>
                currentPage=="component-type" ? <div>    
                    <Back back={back}/>
                    <label>Component Type:</label>
                    <select onChange={(e)=>{setSettings({...settings,  infrastructure_type: e.target.value})}}>
                        <option value="KubernetesDeployment">Deployment</option>
                    </select>
                    <button className='next-button' onClick={()=>setCurrentPage("component-setting")}>next</button>
                </div> :
                currentPage=="component-setting" && settings.infrastructure_type == "KubernetesDeployment" ?
                    <div className='kubernetes-deploymet-settings'>
                        <label>
                            Port:
                            <input 
                                className='port-input'
                                type="text" 
                                value={settings.port || 0} 
                                onChange={(e) => setSettings({ 
                                    ...settings, 
                                    port: parseInt(e.target.value, 10) 
                                })}
                            />
                            
                        </label>
                        <label>Include:</label>
                        <div className='component-choise-list'>
                            <label>
                                <input 
                                    disabled
                                    defaultChecked
                                    type="checkbox" 
                                    // onChange={(e) => setSettings({ 
                                    //     ...settings, 
                                    //     deployment: e.target.checked 
                                    // })} 
                                />
                                Deployment
                            </label>
                            <label>
                                <input 
                                    defaultChecked
                                    type="checkbox" 
                                    onChange={(e) => setSettings({ 
                                        ...settings, 
                                        include_service: e.target.checked 
                                    })} 
                                />
                                Service
                            </label>
                            <label>
                                <input 
                                    defaultChecked
                                    type="checkbox" 
                                    onChange={(e) => setSettings({ 
                                        ...settings, 
                                        include_autoScale: e.target.checked 
                                    })} 
                                />
                                Auto scale (HPA)
                            </label>
                        </div>
                        {settings.include_autoScale && 
                            <div className='autoscale_setting'>
                                <label>
                                    Min Replicas:
                                    <input 
                                        type="number" 
                                        value={settings.min_replicas} 
                                        onChange={(e) => setSettings({ 
                                            ...settings,
                                            min_replicas: parseInt(e.target.value, 10) 
                                        })} 
                                    />
                                </label>
                                <label>
                                    Max Replicas:
                                    <input 
                                        type="number" 
                                        value={settings.max_replicas} 
                                        onChange={(e) => setSettings({ 
                                            ...settings, 
                                            max_replicas: parseInt(e.target.value, 10) 
                                        })} 
                                    />
                                </label>
                            </div>}
                            <button className='next-button' onClick={toNext}>next</button>
                    </div>
                : <div/>
                
            // </div>
        );
};

export default Kubernetes;
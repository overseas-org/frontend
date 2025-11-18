import { useEffect, useState } from 'react';
import { get_connections } from '../connections';
import { get_project_name } from '../../../../../../../utils/project';

const PipeLineSettings = ({ projectId ,serviceName, setPipeline, next, back }) => {

    const [connections, setConnections] = useState([])
    const [settings, setSettings] = useState({
        pipeline_type: "",
        connector_id: 0,
        folder: "",
        name: serviceName,
        //will remove once i make sence in the backend
        // build_type: "docker",
        // test_type: "none",
        // deploy_type: "k8s",
        })
    console.log(settings)
    useEffect(() => {
        get_connections(setConnections,"", "pipeline", projectId)
    }, []);

    useEffect(() => {
        if (connections.length != 0){
            setSettings({
                ...settings,
                connector_id: connections[0].id,
                pipeline_type: connections[0].connector_type
            });
        }
        if (settings.pipeline_type == "Jenkins") {
            get_project_name((projectName) => {
                setSettings(prevSettings => ({
                    ...prevSettings,
                    folder: projectName
                }));
            }, projectId)
        }
    }, [connections]);
    return (
        <div>
            <button className='back-button top' onClick={back}>←</button>
            <h1>Pipeline Settings</h1>
                <div>
                    <div>
                        <label>Pipeline Type:</label>
                        <label>{settings.pipeline_type}</label>
                    </div>
                    <div>
                        <label htmlFor="connector">Connector:</label>
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
                                        pipeline_type: selectedConnection.connector_type
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
                </div>
                {/* <div>
                    <label >Pipline name:</label>
                    <input
                        type="text"
                        id="name"
                        value={settings.name}
                        onChange={(e) =>
                            setSettings({ ...settings, name: e.target.value })
                        }
                    />
                </div> */}
                {settings.pipeline_type == "Jenkins" && (<div>
                    <label>Folder:</label>
                    <input type='text' value={settings.folder} 
                            onChange={(e)=>{setSettings({...settings, folder: e.target.value})}} />
                </div>)}
                <button onClick={()=>{setPipeline(settings);next()}}>next</button>
        </div>
    );
};

export default PipeLineSettings;
import { useEffect, useState } from 'react';
import { get_connections } from '../connections';

import "./RepoSettings.css"
import { Back } from '../../../../../../../components/back/Back';

const RepoSettings = ({ data, serviceName, setRepo, next, back, projectId }) => {
    const [connections, setConnections] = useState([])
    const [settings, setSettings] = useState(Object.keys(data || {}).length !== 0 ? data : {
        repo_type: "",
        name: serviceName,
        connector_id: 0
      })

    useEffect(() => {
        get_connections(setConnections, "", "repo", projectId)
    }, []);

    useEffect(() => {
        if (connections.length != 0 && settings.connector_id == 0){
            setSettings({
                ...settings,
                connector_id: connections[0].id,
                repo_type: connections[0].connector_type
            });
        }
    }, [connections]);
    return (
        <div className='repo-form'>
            <Back back={back}/>
            <h1>Repository Settings</h1>
            {/* <form new-repo-form> */}
                <div className='info-block'>
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
                                    repo_type: selectedConnection.connector_type
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
                <div className='info-block'>
                    <label >Repo name:</label>
                    <input
                        type="text"
                        id="name"
                        value={settings.name}
                        onChange={(e) =>
                            setSettings({ ...settings, name: e.target.value })
                        }
                    />
                </div>
                <button className='next-button' onClick={()=>{setRepo(settings);next()}}>next</button>
            {/* </form> */}
        </div>
    );
};

export default RepoSettings;
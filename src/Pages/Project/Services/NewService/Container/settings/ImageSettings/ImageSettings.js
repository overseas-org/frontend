import { useEffect, useState } from 'react';
import { get_connections } from '../connections';
import './ImageSettings.css'
import { Back } from '../../../../../../../components/back/Back';

const ImageSettings = ({ data, serviceName, setImage, next, back, projectId }) => {

    const [connections, setConnections] = useState([])
    const [settings, setSettings] = useState(Object.keys(data || {}).length !== 0 ? data : {
        image_name: serviceName.toLowerCase(),
        image_registry_type: "",
        connector_id: 0
    })
    
        useEffect(() => {get_connections(setConnections,"", "registry", projectId)}, []);

        useEffect(() => {
            if (connections.length != 0 && settings.connector_id == 0){
                setSettings({
                    ...settings,
                        connector_id: connections[0].id,
                        image_registry_type: connections[0].connector_type
                });
            }
        }, [connections]);
        return (
            <div className='new-service-image-setting'>
                <Back back={back}/>
                <h1>Image Settings</h1>
                <div className='info-block'>
                    <label htmlFor="connector">Registry Connector:</label>
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
                                    image_registry_type: selectedConnection.connector_type
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
                    <label >Image name:</label>
                    <input
                        type="text"
                        id="name"
                        value={settings.image_name}
                        onChange={(e) =>
                            setSettings({ ...settings, image_name: e.target.value })
                        }
                    />
                </div>
                <button className='next-button' onClick={()=>{setImage(settings);next()}}>next</button>
            </div>
        );
};

export default ImageSettings;
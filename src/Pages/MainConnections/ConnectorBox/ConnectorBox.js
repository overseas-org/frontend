import React, { useState, useEffect } from 'react';

import GitHubConnector from '../NewConnector/connectors/github/GithubConnector';
import JenkinsConnector from '../NewConnector/connectors/Jenkins/JenkinsConnector';
import DockerhubConnector from '../NewConnector/connectors/dockerhub/DockerhubConnector';
import AwsConnector from '../NewConnector/connectors/aws/AwsConnector';
import AzureConnector from '../NewConnector/connectors/azure/AzureConnector';
import KubernetesConnector from '../NewConnector/connectors/K8s/KubernetesConnector';

import './ConnectorBox.css';
import { ContextMenu } from '../../../components/contextMenu/contextMenu';
import Connector from '../NewConnector/connectors/baseConnector';
import { Rename } from '../Rename/Rename';

const ConnectorBox = ({connector, setEditObj, setEdit, setRename, refresh}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const conMap = {
        Github: GitHubConnector,
        Jenkins: JenkinsConnector,
        Dockerhub: DockerhubConnector,
        Aws: AwsConnector,
        Azure: AzureConnector,
        K8s: KubernetesConnector
    }

    function goToEdit(){
        const Component = conMap[connector.connector_type];
        setEditObj(<Component id={connector.id} mode="edit" exitWindow={exitEdit}/>)
        setEdit(true)
    }

    function exitEdit(){
        setEdit(false)
    }

    const handleContextMenu = (e) => {
        e.preventDefault();
        setMenuPosition({ x: e.pageX , y: e.pageY});
        setShowMenu(true);
    };

    const connector_obj = new Connector(connector.name, connector.id, ()=>{}, ()=>{}, connector.connector_type);

    useEffect(() => {
            document.addEventListener("click", (e)=>{setShowMenu(false)});
            return () => {
              document.removeEventListener("click", (e)=>{setShowMenu(false)});
            };
          }, []);

    return (
        <div>
            <div className="connector-box glassmorphism" onClick={goToEdit} onContextMenu={handleContextMenu}>
                <label className='connector-name'>{connector.name}</label>
                <label className='connector-type'>{connector.connector_type}</label>
            </div>
            {showMenu && (
                    <ContextMenu menuPosition={menuPosition} options={[
                        {
                            onClick: ()=>{
                                setEditObj(<Rename id={connector.id} initial_name={connector.name} back={()=>{setRename(false)}}/>);
                                setRename(true);
                            },
                            name: "rename"
                        },
                        {
                            onClick: goToEdit,
                            name: "edit"
                        },
                        {
                            onClick: async()=>{await connector_obj.deleteConnector(connector.id); refresh()},
                            name: "delete"
                        }
                    ]}/>
                )}
        </div>

    );
};

export default ConnectorBox;
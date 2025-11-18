import React, { useState } from 'react';

import GitHubConnector from './connectors/github/GithubConnector';
import JenkinsConnector from './connectors/Jenkins/JenkinsConnector';
import DockerhubConnector from './connectors/dockerhub/DockerhubConnector';
import AwsConnector from './connectors/aws/AwsConnector';
import AzureConnector from './connectors/azure/AzureConnector';
import KubernetesConnector from './connectors/K8s/KubernetesConnector';

import "./NewConnector.css";
import ContinueButton from '../../../components/buttons/continue/ContinueButton';
import CancelButton from '../../../components/buttons/cancel/CancelButton';


function NewConnector({ exit }) {
    
    const [connectorType, setConnectorType] = useState("github");
    const [currentPage, setCurrentPage] = useState("chooseType");
    const [name, setName] = useState("");



    return (
        <div className='new-connector'>
                {/* <h3>new connector</h3> */}
                {currentPage == "chooseType" && 
                <form className="initial-window connector-form">
                    {/* <div className='new-connector-choose-type'> */}
                        <label>type:</label>
                        <select name="type" id="connector-type" className='type-select' onChange={(e) => {setConnectorType(e.target.value)}}>
                                <option value="github">Github</option>
                                <option value="aws">Aws</option>
                                <option value="k8s">K8s</option>
                                <option value="jenkins">jenkins</option>
                                <option value="azure">Azure</option>
                                <option value="azureDevops">Azure Devops</option>
                                <option value="gcp">GCP</option>
                                <option value="dockerhub">Dockerhub</option>
                            </select>
                        <label>name:</label>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                        <div className='buttons'>
                            <ContinueButton onClick={()=>{setCurrentPage(connectorType)}}/>
                            <CancelButton onClick={exit}/>
                        </div>
                    {/* </div> */}
                
                </form>
            }   
            {currentPage == "github" && <GitHubConnector name={name} mode="create" exitWindow={exit}/>}
            {currentPage == "jenkins" && <JenkinsConnector name={name} mode="create" exitWindow={exit}/>}
            {currentPage == "dockerhub" && <DockerhubConnector name={name} mode="create" exitWindow={exit}/>}
            {currentPage == "aws" && <AwsConnector name={name} mode="create" exitWindow={exit}/>}
            {currentPage == "azure" && <AzureConnector name={name} mode="create" exitWindow={exit}/>}
            {currentPage == "k8s" && <KubernetesConnector name={name} mode="create" exitWindow={exit}/>}
        </div>
    );
  }
  
export default NewConnector;
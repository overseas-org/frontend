import React, { useState } from 'react';
import RepoSettings from './settings/RepoSettings/RepoSettings';
import ImageSettings from './settings/ImageSettings/ImageSettings';
import DeploymentSettings from './settings/DeploymentSettings/DeploymentSettings';
import CodeSettings from './settings/CodeSetting/CodeSettings';
import PipeLineSettings from './settings/PipeLineSettings/PipelineSettings';
import EndpointsSettings from './settings/EndpointsSettings/Endpoints';
import DBSettings from './settings/DBSettings/DBSettings' ;

import "./Container.css"

const Container = ({ serviceName, submit, projectId, back }) => {
    const [currentPage, setCurrentPage] = useState("repo")

    const [data, setData] = useState({
        "name": serviceName,
        "project": projectId,
        "service_type": "ContainerService",
        "version": "0.1",
        "repo": {},
        "image_registry": {},
        "image_type": "docker",
        "infrastructure": {},
        "pipeline": {},
        "endpoints": [],
        "language": "",
        "framework": {},
        "test": {},
        "db": {}
    })
    console.log(data);
    return (
        <form className="new-service-form glassmorphism">
            {currentPage == "repo" && <RepoSettings projectId={projectId} data={data.repo} serviceName={serviceName} setRepo={(repo)=>{setData({...data, repo:repo})}} next={()=>{setCurrentPage("image")}} back={back}/>}
            {currentPage == "image" && <ImageSettings data={data.image_registry} serviceName={serviceName} projectId={projectId} setImage={(image)=>{setData({...data, image_registry:image})}} next={()=>{setCurrentPage("deployment")}} back={()=>{setCurrentPage("repo")}}/>}
            {currentPage == "deployment" && <DeploymentSettings data={data.infrastructure} serviceName={serviceName} projectId={projectId} setDeployment={(deployment)=>{setData({...data, infrastructure:deployment})}} next={()=>{setCurrentPage("code")}} back={()=>{setCurrentPage("image")}}/>}
            {currentPage == "code" && <CodeSettings setCode={(language, framework)=>{setData({...data, language: language, framework: framework})}} next={()=>{setCurrentPage("pipeline")}} back={()=>{setCurrentPage("deployment")}}/>}
            {currentPage == "pipeline" && <PipeLineSettings projectId={projectId} serviceName={serviceName} setPipeline={(pipeline)=>{setData({...data, pipeline:pipeline})}} next={()=>{setCurrentPage("endpoints")}} back={()=>{setCurrentPage("code")}}/>}
            {currentPage == "endpoints" && <EndpointsSettings setEndpoints={(endpoints)=>{setData({...data, endpoints:endpoints})}} next={()=>{setCurrentPage("db")}} serviceName={serviceName} back={()=>{setCurrentPage("pipeline")}}/>}
            {currentPage == "db" && <DBSettings setDb={(db)=>{setData({...data, db:db})}} next={()=>{setCurrentPage("end")}} back={()=>{setCurrentPage("endpoints")}}/>}
            {currentPage == "end" && (<div>
                    <button onClick={()=>{submit(data)}}>Create Microservice</button>
                    </div>)}
        </form>
    );
};

export default Container;
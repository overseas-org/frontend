import React, { useEffect, useState } from 'react';
import "./MainConnector.css"
import "./NewConnector/connectors/connectors.css"
import ConnectorView from './ConnectorView/ConnectorView';
import NewConnector from './NewConnector/NewConnector';
import SearchBar from '../../components/SearchBar/SearchBar';
import Catalog from '../../components/catalog/Catalog';
import ConnectorBox from './ConnectorBox/ConnectorBox';
import { connector } from '../../variables/services';
import Connector from './NewConnector/connectors/baseConnector';


const MainConnectors = ({scope, projectId}) => {
    const [refresh, setRefresh] = useState(true)
    const [currentPage, setCurrentPage] = useState("main");
    const [filter, setFilter] = useState("");
    const [editObj, setEditObj] = useState();
    const fetchArgs = {scope: scope}
    if (scope == "project") {
        fetchArgs.project_id = projectId;
    }
    else if (scope == "account") {
        fetchArgs.project_id = projectId;
    }

    return (
        <div className='connectors-page'>
                {currentPage == "main" && (
                    <Catalog fetchUrl={`${connector}/connections`}
                    refresh={refresh}
                    fetchArgs={fetchArgs}
                    goToNewObject={()=>{setCurrentPage("newConnector")}}
                    catalogBox={(connector)=>{return (
                    <ConnectorBox connector={connector} setEditObj={setEditObj} setEdit={(bool)=>{setCurrentPage(bool ? "edit": "main")}} setRename={(bool)=>{setCurrentPage(bool ? "rename": "main")}} refresh={()=>setRefresh(!refresh)}/>)}}
                    />
                 )}
                {currentPage == "newConnector" && <NewConnector scope={scope} exit={()=>{setCurrentPage("main")}}/>}
                {currentPage == "edit" && editObj}
                {currentPage == "rename" && editObj}
        </div>
    );
};

export default MainConnectors;
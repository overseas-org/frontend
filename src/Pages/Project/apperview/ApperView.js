import React, { useState, useEffect, useRef } from 'react';
import './ApperView.css'
import { serviceEndpoint } from '../../../variables/services';
import ServiceBox from '../ServiceBox/ServiceBox';
import NewService from '../Services/NewService/NewService';
import Service from '../Service/Service';
import DraggableDiv from './dragable/DraggableDiv';
import Xarrow from "react-xarrows";

import { fetch_positions, fetch_services, update_positions, create_position, fetch_connections, create_connection } from './apperFunctions';
import Arrow from './arrow/Arrow';
import NewArrow from './arrow/newArrow/NewArrow';
import TestArrow from './test';
import Services from '../Services/Services';
import { sleep } from '../../../utils/general';


const ApperView = ({ projectId }) => {

    const [services, setServices] = useState([])
    const [currentPage, setCurrentPage] = useState("main");
    const [editObj, setEditObj] = useState() ;
    const [selectedService, setSelectedService] = useState({});
    const [positions, setPositions] = useState({});
    const [connections, setConnections] = useState({});

    const [selectedConnectionSource, setSelectedConnectionSource] = useState(0)
    const [connecting, setConnecting] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 200, y: 200 });

    useEffect(()=>{fetch_positions(projectId, setPositions)}, []);
    useEffect(()=>{fetch_connections(projectId, setConnections)}, []);
    useEffect(()=>{fetch_services(setServices, projectId)}, []);

    const refresh = async() => {
        console.log("refreshing")
        await sleep(400);
        fetch_positions(projectId, setPositions)
        fetch_connections(projectId, setConnections)
        fetch_services(setServices, projectId)
    }
    return (
        <div className='apperview'>
            {currentPage == "main" && (
            <div className='apper-page glassmorphism' onMouseMove={(e)=>setMousePos({ x: e.clientX-210, y: e.clientY-20 })}>
                {/* <button onClick={refresh}>refresh</button> */}
                <div className='apper-page-header'>
                    <button className='connect-button' onClick={()=>{setConnecting(true);refresh()}}>← connect</button>
                    <button onClick={()=>{setCurrentPage("selectService")}} className='new-button'>+</button>
                </div>
                {Object.keys(positions).length > 0 &&
                <div className='apperview-canvas'>
                    {services.map(service => (
                        <DraggableDiv
                        onClick={async ()=>{
                            if (connecting){
                                if (selectedConnectionSource == 0){
                                    await setSelectedConnectionSource(service.id)
                                    refresh()
                                }
                                else {
                                    await create_connection(projectId, selectedConnectionSource, service.id)
                                    await setSelectedConnectionSource(0)
                                    await setConnecting(false)
                                    fetch_connections(projectId, setConnections)
                                    refresh()
                                }
                                refresh()
                        }}}
                        id={service.id}
                        position={positions[service.id.toString()]}
                        updatePosition={()=>{update_positions(projectId, positions)}}
                        setPosition={(newPos) =>
                            setPositions(prev => ({
                                ...prev,
                                [service.id.toString()]: {...prev[service.id.toString()], ...newPos}
                                }))
                        }
                        object={
                            <div className="appviewer-service-dragable" >
                            <ServiceBox
                                id={service.id}
                                goToService={() => setCurrentPage("service")}
                                selectService={setSelectedService}
                                serviceInfo={service}
                            />
                            </div>
                        }
                        />
                        ))}
                    {
                        Object.keys(services).length > 0 && Object.keys(connections).length > 0 && connections.map(conn=>(
                        <div>
                            <Xarrow curveness={0.5} color='rgba(23, 33, 122, 1)' key={conn.id} start={conn.source_service_id.toString()} end={conn.destination_service_id.toString()} strokeWidth={3} headSize={5} />
                        </div>))
                    }
                    { connecting && selectedConnectionSource != 0 && (
                        // <label>inside</label>
                        <Xarrow
                        start={selectedConnectionSource.toString()}
                        end="mouse-target"  // pass the {x, y} directly
                        color='rgba(23, 33, 122, 1)'
                        strokeWidth={3} headSize={5}
                        />
                    )
                    }
                    <TestArrow mousePos={mousePos}/>
                    </div>
                }
                </div>
                )}
            {currentPage == "selectService" && <Services projectId={projectId} select={true} selectService={async (service)=>{
                console.log(service.service_id);
                await create_position(projectId, service.service_id);
                setCurrentPage("main")
                refresh()
            }}/>}
        </div>
    );
};

export default ApperView; 
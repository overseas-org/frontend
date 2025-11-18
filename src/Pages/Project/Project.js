import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import "./Project.css"
import ProjectNavBar from './ProjectNavBar/ProjectNavBar';
import ApperView from './apperview/ApperView';
import Services from './Services/Services';
import MainConnections from '../MainConnections/MainConnector'
import Sidebar from '../../components/Sidebar/Sidebar';
import { getUser } from '../../scripts/auth';

const Project = ({ }) => {
    const [currentPage, setCurrentPage] = useState("services")
    const { projectId } = useParams();
    const [projectInfo, setProjectInfo] = useState({"services":[]});
    const [user, setUser] = useState({});
    
    
    const pages = {
            home: <Navigate to="/" replace />,
            apperview: <ApperView projectId={projectId}/>,
            services: <Services projectId={projectId} />,
            connectors: <MainConnections scope="project" projectId={projectId}/>,
            // variables: <Variables/> 
        }

    useEffect(() => {
        const fetchUser = async () => {
            const user_data = await getUser();
            setUser(user_data);
        };

        fetchUser();
        }, []);

    return (
        <div className='project-page'>
            <Sidebar setPage={setCurrentPage} pages={Object.keys(pages)} defultselectedPage='services'/>
            <div className='page-main'>
                {pages[currentPage]}
            </div>
        </div>
    );
};

export default Project;
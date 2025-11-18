import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ProjectBox from "./ProjectBox/ProjectBox"
import "./Projects.css"
import NewProject from './NewProject/NewProject'
// import Project from "../Project/Project"
import { projectEndpoint } from '../../variables/services';
import Catalog from '../../components/catalog/Catalog';


function Projects() {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    // const [newProject, setNewProject] = useState(false);
    const navigate = useNavigate();
    // const [currentProject, setcurrentProject] = useState();
    const [filter, setFilter] = useState('')
    const [creatingProject, setCreatingProject] = useState(false)
    const [mode, setMode] = useState("create")
    const [refresh, setRefresh] = useState(true)

    const boxesInScreen = 4 ;

    function fetch_projects() {
            const queryParams = new URLSearchParams({filter: filter}).toString();
            
            fetch(`${projectEndpoint}/projects?${queryParams}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                    "Content-Type": "application/json"
                    }
                })
                .then(res => {
                    if (!res.ok) { 
                    return res.json().then(data => {
                        throw new Error("Error: " + (data.message || "Unknown error")); // Handle API error messages
                    });
                    }
                    return res.json();
                })
                .then(data => {
                    setProjects(data);
                })
                .catch(error => {
                    console.error("Error fetching user:", error);
                });
            }

    function new_project() {
        
    }

    useEffect(fetch_projects, [creatingProject, refresh]);
    return (
        <div className='projects-page'>
            { !creatingProject && projects.length > boxesInScreen &&
            <Catalog fetchUrl={`${projectEndpoint}/projects`} goToNewObject={()=>setCreatingProject(true)} 
                catalogBox={(project) => (
                        <ProjectBox project={project} onClick={()=>{navigate("/project/" + project.id)}} edit={() => {setCreatingProject(true); setMode("edit");setProject(project)}} refresh={()=>{setRefresh(!refresh);}}/>
                    )}
            />
            }
            {!creatingProject && projects.length <= boxesInScreen &&
            (<div className='projects-catalog'>
                <h1 className='projects-title'>Projects</h1>
                <button className='new-project-button glassmorphism' onClick={()=>{setCreatingProject(true); setMode("create");setProject({})}}>+</button>
                <div className='projects'>
                    { projects.map((project) => (
                        <ProjectBox project={project} onClick={()=>{navigate("/project/" + project.id)}} edit={() => {setCreatingProject(true); setMode("edit");setProject(project)}} refresh={()=>{setRefresh(!refresh);}}/>
                    )) } 
                </div> 
            </div>)
            }
            
            {creatingProject && <NewProject mode={mode} exit={() => setCreatingProject(false)} project={project}/>}
    </div>
    );
  }
  
  export default Projects;
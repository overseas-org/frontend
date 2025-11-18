import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectNavBar.css';


const ProjectNavBar = ({ goTo, projectId }) => {
    const [selectedPage, setSelectedPage] = useState("services")

    const select = (selected) => {
        setSelectedPage(selected);
        goTo(selected);
    }

    return (
        <nav className="project-nav-bar sidebar">
            <ul>
                <Link to="/"><li>Home</li></Link>
                <li className={selectedPage === "apperview" ? "selected" : ""} onClick={()=>{select("apperview")}}><span className='bold'>App</span>erView</li>
                <li className={selectedPage === "services" ? "selected" : ""} onClick={()=>{select("services")}}>services</li>
                <li className={selectedPage === "connections" ? "selected" : ""} onClick={()=>{select("connections")}}>connections</li>
                {/* <li onClick={goTo("variables")}>variables</li> */}
                {/* <li onClick={goTo("logs")}>logs</li> */}
            </ul>
        </nav>
    );
};

export default ProjectNavBar;
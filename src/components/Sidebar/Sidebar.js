import React, { useState } from 'react';
import './Sidebar.css';
import Logout from '../logout/Logout';

const Sidebar = ({ setPage, pages, defultselectedPage="" }) => {

    const [selectedPage, setSelectedPage] = useState(defultselectedPage ? defultselectedPage : pages[0])

    function title(str) {
        return str
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }

    return (
        <div className="sidebar">
            <Logout/>
            <ul>
                {pages.map((page)=>{
                    return (
                        <li className={selectedPage === page ? "selected" : ""} 
                        onClick={()=>{setSelectedPage(page);setPage(page)}}>{title(page)}</li>
                    )
                })}
                {/* <li onClick={()=>{setPage("projects")}}>Projects</li>
                <li onClick={()=>{setPage("connections")}}>Connections</li> */}
            </ul>
        </div>
    );
};

export default Sidebar;
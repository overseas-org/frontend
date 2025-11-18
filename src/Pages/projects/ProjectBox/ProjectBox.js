import { useState, useEffect } from "react";
import "./ProjectBox.css";
import NewProject from "../NewProject/NewProject";
import { projectEndpoint } from "../../../variables/services";
import { ContextMenu } from "../../../components/contextMenu/contextMenu";

function ProjectBox({ project, onClick, edit, refresh }) {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (e) => {
        e.preventDefault();
        setMenuPosition({ x: e.pageX , y: e.pageY});
        setShowMenu(true);
    };

    const handleRename = () => {
        edit();
    };

    const handleDelete = async () => {
        const queryParams = new URLSearchParams({project_id: project.id}).toString();
            
        await fetch(`${projectEndpoint}/project?${queryParams}`, { // Add return here
            method: "DELETE",
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
        })
        .catch(error => {
            console.error("Error fetching user:", error);
            throw error; // Rethrow so callers can handle it
        });
        refresh()
    };

    useEffect(() => {
        document.addEventListener("click", (e)=>{setShowMenu(false)});
        return () => {
          document.removeEventListener("click", (e)=>{setShowMenu(false)});
        };
      }, []);

    return (
        <div>
            <div
                className="project-box glassmorphism"
                onClick={onClick}
                onContextMenu={handleContextMenu}
            >
                <h3>{project.name}</h3>
            </div>
                {showMenu && 
                    <ContextMenu menuPosition={menuPosition} 
                    options={
                        [
                            {
                                "onClick": handleRename,
                                "name": "Rename"
                            },
                            {
                                "onClick": handleDelete,
                                "name": "Delete"
                            }
                        ]
                    }/>
                }
        </div>
    );
}

export default ProjectBox;

import { useEffect, useState } from "react";
import "./NewProject.css"
import { useNavigate } from "react-router-dom";
import { projectEndpoint } from "../../../variables/services";


function NewProject({ mode, exit, project }) {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    
    
    async function submit(e) {
        e.preventDefault();
        let args="";
        const body = {project: {name: name}}
        if (mode == "edit") {
            args = "?project_id=" + project.id
        }
        await fetch(projectEndpoint + "/project" + args, {
              method: mode === "create" ? "POST" : "PUT",
              credentials: "include",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
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
              console.log(data)
            })
            .catch(error => {
              console.error("Error fetching user:", error);
            });
        exit()
    }
    

    useEffect (()=>{
        setName(project.name)
    }, [])
    return (
        <form className="new-project-form">
            <h3>{mode === "create" ? "New Project": "Rename"}</h3>
            <label className="new-project-form-label">name:</label>
            <input className="new-project-form-input" value={name} onChange={(e) => {setName(e.target.value)}} type="text"/>
            <button className="submit" onClick={submit}>{mode === "create" ? "create" : "save"}</button>
            <button className="cancel" onClick={exit}>cancel</button>
        </form>

    );
  }
  
export default NewProject;
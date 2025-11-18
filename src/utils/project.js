import { projectEndpoint } from "../variables/services";

export const get_project_name = async (setProjectName, project_id) => {
    const queryParams = new URLSearchParams({
        project_id: project_id
    }).toString();
    await fetch(`${projectEndpoint}/project?${queryParams}`, {
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
            setProjectName(data.name)
        })
        .catch(error => {
            console.error("Error fetching user:", error);
        });
        
    }
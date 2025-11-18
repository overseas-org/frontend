import { serviceEndpoint } from "../../../variables/services";


export const fetch_positions = (projectId, setPositions) => {
        const queryParams = new URLSearchParams({project_id: projectId}).toString();
        fetch(`${serviceEndpoint}/positions?${queryParams}`, {
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
                setPositions(data);
            })
            .catch(error => {
                console.error("Error fetching services:", error);
            });
        }

        export const create_position = async (projectId, service_id) => {
    
            fetch(`${serviceEndpoint}/position`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                     project_id: projectId,
                     service_id: service_id
                     })
                })
                .then(res => {
                if (!res.ok) { 
                    return res.json().then(data => {
                    throw new Error("Error: " + (data.message || "Unknown error")); // Handle API error messages
                    });
                }
                return res.json(); // Only parse JSON if response is OK (200)
                })
                .catch(error => {
                    console.error("Error updating positions:", error);
                });
            }

export const create_connection = (projectId, source_service_id, destination_service_id) => {
    
    fetch(`${serviceEndpoint}/connection`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
             project_id: projectId,
             source_service_id: source_service_id,
             destination_service_id: destination_service_id
             })
        })
        .then(res => {
        if (!res.ok) { 
            return res.json().then(data => {
            throw new Error("Error: " + (data.message || "Unknown error")); // Handle API error messages
            });
        }
        return res.json(); // Only parse JSON if response is OK (200)
        })
        .catch(error => {
            console.error("Error updating positions:", error);
        });
    }

export const fetch_connections = (projectId, setConnections) => {
            const queryParams = new URLSearchParams({project_id: projectId}).toString();
            fetch(`${serviceEndpoint}/connections?${queryParams}`, {
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
                    setConnections(data);
                })
                .catch(error => {
                    console.error("Error fetching connections:", error);
                });
            }

export const update_positions = async (projectId, positions) => {
        fetch(`${serviceEndpoint}/positions?`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ project_id: projectId, positions: positions })
            })
            .then(res => {
            if (!res.ok) { 
                return res.json().then(data => {
                throw new Error("Error: " + (data.message || "Unknown error")); // Handle API error messages
                });
            }
            return res.json(); // Only parse JSON if response is OK (200)
            })
            .catch(error => {
                console.error("Error updating positions:", error);
            });
        }
    

export const fetch_services = (setServices, projectId) => {
    const queryParams = new URLSearchParams({project_id: projectId}).toString();
        fetch(`${serviceEndpoint}/services?${queryParams}`, {
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
                setServices(data);
            })
            .catch(error => {
                console.error("Error fetching services:", error);
            });
        }
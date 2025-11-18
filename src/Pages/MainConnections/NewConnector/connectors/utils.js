

import { connector } from "../../../../variables/services";




export const getConnection = (id) => {
    const queryParams = new URLSearchParams({id: id}).toString();

    return fetch(`${connector}/connection?${queryParams}`, { // Add return here
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
    .catch(error => {
        console.error("Error fetching user:", error);
        throw error; // Rethrow so callers can handle it
    });
};

export const deleteConnection = (id) => {
    const queryParams = new URLSearchParams({id: id}).toString();

    return fetch(`${connector}/connection?${queryParams}`, { // Add return here
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
};
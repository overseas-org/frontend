import { account } from "../../variables/services";

export const getUser = () => {
    return fetch(account + "/me", { // Add return here
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

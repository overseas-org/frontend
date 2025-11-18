import { getUser } from "../../../../../../scripts/auth";
import { connector } from "../../../../../../variables/services";

export const get_connections = async (setConnections, filter, category='', project_id) => {
    let connections = []
    const user = getUser()
    await get_scoped_connections(conns => connections.push(...conns), filter, category=category, "account", user.account_id)
    await get_scoped_connections(conns => connections.push(...conns), filter, category=category, "project", project_id)
    // console.log(connections)
    setConnections(connections)
}

export const get_scoped_connections = async (setConnections, filter, category='', scope, scope_id) => {
        let queryParams = new URLSearchParams({
            filter: filter,
            category: category,
            scope: scope,
        })
        queryParams.set(`${scope}_id`, scope_id)
        await fetch(`${connector}/connections?${queryParams.toString()}`, {
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
                setConnections(data)
            })
            .catch(error => {
                console.error("Error fetching user:", error);
            });
            
        }


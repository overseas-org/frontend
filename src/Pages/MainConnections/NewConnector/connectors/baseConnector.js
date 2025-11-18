import { connector } from '../../../../variables/services';
import { getUser } from '../../../../scripts/auth';
// import { deleteConnector, getConnector } from '../utils';


class Connector {
    constructor(name, id, mode, exitWindow, connector_type) {
        this.exitWindow = exitWindow;
        this.name = name;
        this.id = id;
        this.connector_type = connector_type;
        this.submitClass = mode === "create" ? "connect": "edit";
        this.cancelClass = mode === "create" ? "cancel": "delete";
        this.method = mode === "create" ? "POST" : "PUT";
        this.mode = mode;
        // this.data = data;
        // this.setData = setData;
      }
  
    titleCase = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    handleSubmit = async (data) => {
        const user = await getUser()
        let body = {
            name: this.name,
            connector_type: this.connector_type,
            account_id: user.account_id,
            [this.connector_type]: data
        }
        const scope = getScope();
        body = {...body, ...scope};
        if (this.method === "PUT") {
            body.id = this.id
        }
        fetch(connector + "/connection", {
            method: this.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            })
            .then(res => {
            if (!res.ok) { 
                return res.json().then(data => {
                throw new Error("Error: " + (data.message || "Unknown error")); // Handle API error messages
                });
            }
            return res.json(); // Only parse JSON if response is OK (200)
            })
            .then(data => {
            console.log(data)
            })
            .catch(error => {
            // setError(error.message); // Store error message in state
            console.error("Error fetching user:", error);
            });
            this.exitWindow()
        }

    handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        this.setData({
            ...this.data,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    handleFileChange = (e) => {
        this.setData({
            ...this.data,
            [e.target.name]: e.target.files[0].name
        });
    };

    handleCancel = async() => {
        // if (this.cancelClass === "delete") {
        //     await this.deleteConnector(this.id);
        // }
        this.exitWindow()
    }
    getConnector = (id) => {
        console.log("getting conn")
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
    
    deleteConnector = (id) => {
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

    loadData = async (data) => {
        console.log("fetchig data")
        if (this.mode === "edit") {
            const conn = await this.getConnector(this.id);
            Object.keys(data).forEach(key => {
                if (conn[key] !== undefined) {
                    data[key] = conn[key];
                    
                }
            })
            // this.setData(data)
            return data;
        }
    }
    
  }

function getScope() {
    let res = {scope: "yellow"}
    const path = window.location.pathname.split('/');
    if (path.length >= 3 && path[1] == "project"){
        res = {
            scope: "project",
            project_id: path[2]
        }
    }
    else {
        res = {
            scope: "account"
        }
    }
    return res;
}

export const rename = (id, name) => {
    let body = {
        "name": name
    }
    const queryParams = new URLSearchParams({id: id}).toString();
    fetch(`${connector}/connection?${queryParams}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            })
            .then(res => {
            if (!res.ok) { 
                return res.json().then(data => {
                throw new Error("Error: " + (data.message || "Unknown error")); // Handle API error messages
                });
            }
            return res.json(); // Only parse JSON if response is OK (200)
            })
            .then(data => {
            console.log(data)
            })
            .catch(error => {
            // setError(error.message); // Store error message in state
            console.error("Error fetching user:", error);
            });
        
}


export default Connector;

  

  
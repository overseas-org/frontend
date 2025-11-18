import { serviceEndpoint } from "../../../../../variables/services";


export const get_component = (component_type, Params) => {
    const queryParams = new URLSearchParams(Params).toString();
  
    return fetch(`${serviceEndpoint}/${component_type}?${queryParams}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error("Error: " + (data.message || "Unknown error"));
          });
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Error fetching repo:", error);
        throw error; // <-- rethrow if caller needs to handle it
      });
  };
  
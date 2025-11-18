import { Navigate } from "react-router-dom";
import { auth } from "../variables/services";

// const auth = "http://127.0.0.1:5005"

export async function verify_token(){
    const access_token = localStorage.getItem('access_token');
    const response = await fetch(`${auth}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"token": access_token})
    });
    if (response.ok) {
        console.log(response)
        return true
    }
    else {
        return false
    }
}

export async function refresh_token(){
    const token = localStorage.getItem('refresh_token');
    const response = await fetch(`${auth}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"token": token})
    });
    if (!response.ok) {
        return false;
    }
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return true;
}

export const login = async (user, setError) => {
    const response = await fetch(`${auth}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //encrypt password
        body: JSON.stringify({
            "user":
                { 
                    "username": user.username, 
                    "encrypted_password": user.password
                }
            })
    });
    const data = await response.json();
    if (!response.ok) {
        setError(`error: ${data}`);
        return false
    };

    localStorage.setItem('access_token', data.accessToken);
    localStorage.setItem('refresh_token', data.refreshToken);
    return true
}

export const sso_login = async (user, setError) => {
    console.log("in sign in sso")
    console.log(user)
    if (!user.hasOwnProperty("sso_verified") || !user.sso_verified){
        setError("non veriefied sso")
        return
    }
    const response = await fetch(`${auth}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //encrypt password
        body: JSON.stringify({
            "user": user
            })
    });
    const data = await response.json();
    if (!response.ok) {
        setError(`error: ${data}`);
        return false
    };

    localStorage.setItem('access_token', data.accessToken);
    localStorage.setItem('refresh_token', data.refreshToken);
    return true
}

export const logout = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    const response = await fetch(`${auth}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"token": refresh_token})
    });
    if (response.ok) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        return true
    }
    else {
        return false
    }
}

export const signup = async (userData, setError) => {
    const user = {...userData};
    const encrypted_password = user.password;
    user.encrypted_password = encrypted_password
    delete user.password;

    const response = await fetch(`${auth}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
        body: JSON.stringify({
            "user":
                user
            })
    });

    const data = await response.json();

    if (!response.ok) {
        setError(`${data}`);
        return false
    };


    // Save the tokens
    localStorage.setItem('access_token', data.accessToken);
    localStorage.setItem('refresh_token', data.refreshToken);
    return true;
}

export const getUser = async () => {
    const access_token = localStorage.getItem('access_token');
    const user = JSON.parse(atob(access_token.split('.')[1]))
    return user
}

// export const create_account = async () => {
//     const response = await fetch(`${auth}/account`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({"token": refresh_token})
//     });
// }
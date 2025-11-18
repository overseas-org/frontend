import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Logout.css";
import { logout } from '../../scripts/auth';
import { jwtDecode } from 'jwt-decode';


const getUser = (userId) => {
    const access_token = localStorage.getItem('access_token');
    const userInfo = jwtDecode(access_token);
    console.log(userInfo)
    return {
        "username": userInfo.username ? userInfo.username: userInfo.first_name,
        "account": userInfo.account
    }
}

const Logout = ({ userId }) => {
    const navigate = useNavigate();
    const [menuHidden, setMenuHidden] = useState(true)

    const [user, setUser] = useState({
        "username": "",
        "account": ""
    });

    const handleLogout = async () => {
        if (await logout()) {
            navigate("/login")
        }
    };

    useEffect(()=>{
        setUser(getUser(userId));
    }, [])

    return (
        <div className='logout-box' onMouseLeave={()=>setMenuHidden(true)}>
            <button className='user-button' onMouseEnter={()=>setMenuHidden(false)} >
                <img className='icon' src={require("../../img/icons/user.png")} alt="User Icon"/>
            </button>
            <div className='content'>
                <label className='account'>{user.account}</label>
                <label>{user.username}</label>
            </div>
            <menu hidden={menuHidden} onMouseEnter={()=>setMenuHidden(false)}>
                <div>Account</div>
                <div onClick={handleLogout}>Logout</div>
            </menu>
        </div>
    );
};

export default Logout;
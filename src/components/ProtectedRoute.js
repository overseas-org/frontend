import { Navigate } from 'react-router-dom';
import { verify_token, refresh_token } from '../scripts/auth';
import { useEffect, useState } from 'react';
import { Loading } from './loading/Loading';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [validToken, setValidToken] = useState(false);

    async function checkAuth(){
        const access_token = localStorage.getItem('access_token');
        if (access_token && (await verify_token() || await refresh_token())) {
            setValidToken(true);
        }
        setLoading(false);
    } 

    useEffect(()=>{
        checkAuth();
    }, [])

    if (loading) {
        return <Loading/>
    }
    else if (!validToken) {
    return <Navigate to="/login" replace />;
  }
  else {
    return children;
  }
};

export default ProtectedRoute;
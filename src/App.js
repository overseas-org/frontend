import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getUser } from './scripts/auth';

import Login from './Pages/login/Login'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import './colors.css'
import Home from './Pages/Home/Home';
import Project from './Pages/Project/Project';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <Home/>
                  </ProtectedRoute>
                }/>
                <Route path="/project/:projectId" element={
                  <ProtectedRoute>
                    <Project/>
                  </ProtectedRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

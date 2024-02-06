import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : null;

    const isAuthenticated = user ;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get('authToken'); 
    if (!authToken) {
      navigate('/login'); 
    }
  }, [navigate]);

  return <>{children}</>; 
};

export default ProtectedRoute;

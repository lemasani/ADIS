// src/Utils/useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem('userData');
    if (!userData) {
      navigate('/login');
    }
  }, [navigate]);
}
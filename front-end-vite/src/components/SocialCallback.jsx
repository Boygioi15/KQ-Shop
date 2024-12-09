import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SocialCallback = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const tokenProcessed = useRef(false); // Use ref to prevent unnecessary re-renders

  useEffect(() => {
    if (!tokenProcessed.current) {
      console.log('useEffect triggered');

      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      console.log('Token from URL:', token);

      if (token) {
        tokenProcessed.current = true; // Mark as processed
        signIn(token);
        navigate('/'); // Navigate to home
      } else {
        tokenProcessed.current = true; // Mark as processed
        navigate('/auth'); // Navigate to auth page
      }
    }
  }, [navigate, signIn]);

  return <div>Loading...</div>;
};

export default SocialCallback;

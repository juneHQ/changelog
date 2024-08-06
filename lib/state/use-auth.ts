import { useEffect, useState } from 'react';

/**
 * This hook provides a simple way to check if a user is logged in.
 */
export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        console.log('Checking login status');
        console.log(JSON.stringify(process.env));
        const response = await fetch(`${process.env.NEXT_PUBLIC_JUNE_API_HOST}/logged_in`, {
          credentials: 'include',
          mode: 'no-cors',
        });
        const data = await response.json();
        setLoggedIn(data.loggedIn);
      } catch (error) {
        console.error('Error checking login status:', error);
        setLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return { loggedIn };
};

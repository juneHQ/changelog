import { useEffect, useState } from 'react';

/**
 * This hook provides a simple way to check if a user is logged in.
 */
export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_JUNE_API_HOST}/logged_in`, {
          credentials: 'include',
          mode: 'cors',
        });
        const data = await response.json();
        setLoggedIn(data.loggedIn);
      } catch (error) {
        setLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return { loggedIn };
};

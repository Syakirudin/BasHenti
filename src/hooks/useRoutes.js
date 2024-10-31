// src/hooks/useRoutes.js
import { useEffect, useState } from "react";

const useRoutes = (url) => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error("Failed to fetch routes:", error);
        setError(error.message);
      }
    };

    fetchRoutes();
  }, [url]);

  return { routes, error };
};

export default useRoutes;

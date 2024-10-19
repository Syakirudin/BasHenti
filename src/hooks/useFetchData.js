import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        // Check if the response Content-Type is JSON
        if (response.headers["content-type"] && response.headers["content-type"].includes("application/json")) {
          setData(response.data);
        } else {
          throw new Error("Invalid response format: Expected JSON");
        }
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetchData;

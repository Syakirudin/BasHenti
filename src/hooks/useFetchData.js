import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url) => {
    const [data, setData] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading state
            try {
                const response = await axios.get(url);
                // Log the response for debugging
                console.log("API Response:", response.data);

                // Directly set the data if it's an array
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    throw new Error("Expected an array but received a different format");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Reset loading state
            }
        };

        fetchData();
    }, [url]);

    return { data, error, loading };
};

export default useFetchData;

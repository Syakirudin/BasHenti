import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url) => {
    const [data, setData] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                console.log("API Response:", response); // Log full response for debugging

                if (response.headers["content-type"]?.includes("application/json")) {
                    if (Array.isArray(response.data)) {
                        setData(response.data);
                    } else {
                        throw new Error("Expected an array but received a different format");
                    }
                } else {
                    throw new Error("Invalid response format: Expected JSON");
                }
            } catch (err) {
                console.error("Fetch error:", err);
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

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
                console.log("API Response Headers:", response.headers);
                console.log("API Response Data:", response.data);

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
                if (err.response) {
                    console.error("Response Data:", err.response.data);
                    console.error("Response Status:", err.response.status);
                    setError(err.response.data);
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, error, loading };
};

export default useFetchData;

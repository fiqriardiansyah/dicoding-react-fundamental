import { useState } from "react";

const useFetchState = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchStart = () => {
        setLoading(true);
        setError(null);
        setData(null);
    };

    const fetchSuccess = (dt) => {
        setLoading(false);
        setError(null);
        setData(dt);
    };

    const fetchFailed = (err) => {
        setLoading(false);
        setError(err);
        setData(null);
    };

    return {
        data,
        loading,
        error,
        fetchStart,
        fetchSuccess,
        fetchFailed,
    };
};

export default useFetchState;

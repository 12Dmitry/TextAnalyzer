import {useCallback, useState} from "react";

export function useApi() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Используем useCallback, чтобы функция не пересоздавалась при каждом рендере
    const request = useCallback(async (apiFunc, ...args) => {
        setLoading(true);
        setError(null);
        try {
            return await apiFunc(...args);
        } catch (err) {
            setError(err.message);
            // Пробрасываем ошибку дальше, чтобы вызывающий код мог её обработать
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, setData, loading, error, request };
}

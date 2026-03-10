import { textService } from '../services/api';
import { useApi } from './useApi';

export function useHistory() {
    const { data: history, setData: setHistory, request, loading, error } = useApi();

    const fetchHistory = async (clientId, isFull = false) => {
        const limit = isFull ? null : 5;
        // Передаем функцию и её параметры
        setHistory(await request(textService.getHistoryList, clientId, limit));
    };

    const getDetails = async (id) => {
        // Возвращаем результат, чтобы использовать его в App.jsx
        return await request(textService.getHistoryDetails, id);
    };

    const deleteHistory = async (id) => {
        await request(textService.deleteHistory, id);
        // После удаления локально фильтруем список, чтобы не делать лишний запрос
        setHistory(prev => {
            if (!prev) return []; // Если истории еще нет, просто возвращаем пустой массив
            return prev.filter(item => item.id !== id);
        });
    };

    return { history, fetchHistory, getDetails, deleteHistory, loading, error };
}

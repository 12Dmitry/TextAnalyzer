import { createTextAnalysis } from "../models/TextAnalysis";
import {mapHistoryDetails, mapHistoryListItem} from "../models/mapper.js";

const API_URL = "http://localhost:5175/api/TextAnalyze";

export const textService = {
    async analyze(text, clientId) {
        if (!text?.trim()) return null;

        const response = await fetch(`${API_URL}/analyze`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // ВАЖНО: передаем объект, который C# спарсит в AnalyzeRequest record
            body: JSON.stringify({ text, clientId }),
        });

        if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

        const data = await response.json();
        return createTextAnalysis(data);
    },

    async getHistoryList(clientId, limit = null) {
        const url = new URL(`${API_URL}/history/${clientId}`);
        if (limit) url.searchParams.append('limit', limit);

        const response = await fetch(url);
        const data = await response.json();
        return data.map(mapHistoryListItem);
    },

    async getHistoryDetails(id) {
        const response = await fetch(`${API_URL}/history/details/${id}`);
        if (!response.ok) throw new Error("Не удалось загрузить детали");

        const data = await response.json();
        return mapHistoryDetails(data);
    },
    
    async deleteHistory(id) {
        const response = await fetch(`${API_URL}/history/delete/${id}`);
        if (!response.ok) throw new Error("Не удалось удалить элемент");
    }
};

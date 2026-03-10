// Маппер для истории (так как там приходят еще ID и Дата)
import {createTextAnalysis} from "./TextAnalysis.js";

export const mapHistoryListItem = (item) => ({
    id: item.id,
    date: new Date(item.date).toLocaleString(),
    previewText: item.previewText || "Без заголовка"
});

export const mapHistoryDetails = (data) => ({
    id: data.id,
    text: data.text,
    result: createTextAnalysis(data.response) // Твоя фабрика
});

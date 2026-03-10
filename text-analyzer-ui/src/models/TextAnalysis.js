// Фабрика для создания объекта результата (аналог Record в C#)
export const createTextAnalysis = (data = {}) => ({
    charactersCount: data.charactersCount ?? 0,
    wordsCount: data.wordsCount ?? 0,
    punctuationCount: data.punctuationCount ?? 0,
    sentencesCount: data.sentencesCount ?? 0,
    syllablesCount: data.syllablesCount ?? 0,
    readabilityIndex: data.readabilityIndex ?? 0,
    topFrequency: data.topFrequency || [],
    topLength: data.topLength || []
});
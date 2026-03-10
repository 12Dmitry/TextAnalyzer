namespace TextAnalyzer.Core.DTO;

public record TextAnalyzeResponse(
    int CharactersCount,
    int WordsCount,
    int PunctuationCount,
    int SentencesCount,
    int SyllablesCount,
    double ReadabilityIndex,
    Dictionary<string, int> TopFrequency,
    string[] TopLength
);
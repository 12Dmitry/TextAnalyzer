using System.Text;

namespace TextAnalyzer.Core;

public class TextAnalyzer
{
    public int TotalWords => Text.Count;
    public int TotalCharacter { get; private set; }
    public int TotalPunctuation { get; private set; }
    public int TotalSentence { get; private set; }
    public int TotalSyllables { get; private set; }

    public double ReadabilityIndex => 
        206.835 - (1.3 * (double)TotalWords / Math.Max(1, TotalSentence))
                - (60.1 * (double)TotalSyllables / Math.Max(1, TotalWords));

    public List<string> Text { get; }
    private Dictionary<string, int> WordsFrequency { get; }
    
    private static readonly HashSet<char> Vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
    private static readonly HashSet<char> EndSentence = ['.', '!', '?'];

    private TextAnalyzer()
    {
        Text = [];
        WordsFrequency = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
    }

    private void CountSyllables(char c)
    {
        if (Vowels.Contains(char.ToLower(c))) 
            TotalSyllables++;
    }

    public static TextAnalyzer Analyze(string text)
    {
        var previousLiteral = text[0];
        var result = new TextAnalyzer();
        var word = new StringBuilder();
        foreach (var literal in text)
        {
            if (!char.IsWhiteSpace(literal)) result.TotalCharacter++;

            if (char.IsPunctuation(literal))
            {
                result.TotalPunctuation++;
                if (EndSentence.Contains(literal) && EndSentence.Contains(previousLiteral)) result.TotalSentence++;
            }

            if (char.IsLetterOrDigit(literal))
            {
                result.AnalyzeLetterOrDigit(word, literal);
            }
            else if (word.Length > 0)
            {
                result.AnalyzeWord(word.ToString());
                word.Clear();
            }
            previousLiteral = literal;
        }
        if (word.Length > 0) result.AnalyzeWord(word.ToString());
    
        if (result is { TotalSentence: 0, TotalWords: > 0 }) result.TotalSentence = 1;
    
        return result;
    }


    private void AnalyzeLetterOrDigit(StringBuilder word, char literal)
    {
        CountSyllables(literal);
        word.Append(literal);
    }

    public Dictionary<string, int> GetTopFrequency(int count) =>
        WordsFrequency
            .OrderByDescending(wordAndCount => wordAndCount.Value)
            .Take(count)
            .ToDictionary();

    public string[] GetTopLength(int count) =>
        WordsFrequency.Keys
            .OrderByDescending(word => word.Length)
            .Take(count)
            .ToArray();

    private void AnalyzeWord(string word)
    {
        AddToFrequencyDict(word);
        Text.Add(word);
    }

    private void AddToFrequencyDict(string word)
    {
        if(!WordsFrequency.TryAdd(word, 1)) WordsFrequency[word]++;
    }
}
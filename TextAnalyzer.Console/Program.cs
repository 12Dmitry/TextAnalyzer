Console.WriteLine("Введите текст:");
string text = Console.ReadLine()!;

var analyzer = TextAnalyzer.Core.TextAnalyzer.Analyze(text);

Console.WriteLine($"Количество слов: {analyzer.TotalWords} \nTop 5 words: ");

var freq = analyzer.GetTopFrequency(5);
foreach (var pair in freq)
{
    Console.WriteLine($"{pair.Key}: {pair.Value}");
}
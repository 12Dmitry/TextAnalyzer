using System.ComponentModel.DataAnnotations.Schema;
using TextAnalyzer.Core.DTO;

namespace TextAnalyzer.Api.Data.Models;

public class HistoryRecord
{
    public Guid Id { get; set; }
    public string ClientId { get; set; } = null!;
    public string Text { get; set; } = null!;
    [Column(TypeName = "jsonb")]
    public TextAnalyzeResponse Response { get; set; } = null!;
    public DateTime Date { get; set; } = DateTime.UtcNow;
    
    // Свойство для превью лучше сделать обычным полем или методом
    public string PreviewText => Text.Length > 15 ? Text[..15] + "..." : Text;
}
using TextAnalyzer.Core.DTO;

namespace TextAnalyzer.Api.Controllers;

public record HistoryDetailsDto(Guid Id, string Text, TextAnalyzeResponse Response);
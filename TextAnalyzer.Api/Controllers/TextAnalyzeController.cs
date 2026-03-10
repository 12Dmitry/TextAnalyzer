using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TextAnalyzer.Api.Data;
using TextAnalyzer.Api.Data.Models;
using TextAnalyzer.Core.DTO;

namespace TextAnalyzer.Api.Controllers;

[ApiController] 
[Route("api/[controller]")]
public class TextAnalyzeController(AppDbContext context) : ControllerBase
{
    [HttpPost("analyze")]
    public async Task<IActionResult> AnalyzeText([FromBody] AnalyzeRequest request)
    {
        var prev = await TryGetDuplicateAsync(request.Text, request.ClientId);
        if (prev != null) return Ok(prev.Response);
        
        var analyzer = Core.TextAnalyzer.Analyze(request.Text);

        var response = new TextAnalyzeResponse(
            CharactersCount: analyzer.TotalCharacter,
            WordsCount: analyzer.TotalWords,
            PunctuationCount: analyzer.TotalPunctuation,
            SentencesCount: analyzer.TotalSentence,
            SyllablesCount: analyzer.TotalSyllables,
            ReadabilityIndex: Math.Round(analyzer.ReadabilityIndex, 2),
            TopFrequency: analyzer.GetTopFrequency(5),
            TopLength: analyzer.GetTopLength(5)
        );
        
        await SaveHistory(request.ClientId, request.Text, response);
        return Ok(response);
    }

    [HttpGet("history/{clientId}")]
    public async Task<ActionResult<IEnumerable<HistoryListItemDto>>> GetHistoryList(
        string clientId, [FromQuery] int? limit = null)
    {
        var query = context.History
            .Where(h => h.ClientId == clientId)
            .OrderByDescending(h => h.Date);

        if (limit.HasValue) query = (IOrderedQueryable<HistoryRecord>)query.Take(limit.Value);

        return Ok(await query
            .Select(h => new HistoryListItemDto(h.Id, h.PreviewText, h.Date))
            .ToListAsync());
    }

    [HttpGet("history/details/{id}")]
    public async Task<ActionResult<HistoryDetailsDto>> GetHistoryDetails(Guid id)
    {
        var record = await context.History.FindAsync(id);
        if (record == null) return NotFound();

        return Ok(new HistoryDetailsDto(record.Id, record.Text, record.Response));
    }

    [HttpGet("history/delete/{id}")]
    public async Task<ActionResult<HistoryDetailsDto>> DeleteHistoryItem(Guid id)
    {
        var record = await context.History.FindAsync(id);
        if (record == null) return NotFound();
        context.History.Remove(record);
        await context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<HistoryRecord?> TryGetDuplicateAsync(string text, string clientId) =>
            await context.History
                .Where(x => x.ClientId == clientId)
                .OrderByDescending(x => x.Date)
                .Take(3) 
                .FirstOrDefaultAsync(x => x.Text == text);

    private async Task SaveHistory(string clientId, string text, TextAnalyzeResponse response)
    {
        context.History.Add(new HistoryRecord { 
            ClientId = clientId, 
            Text = text, 
            Response = response,
            Date = DateTime.UtcNow
        });
        await context.SaveChangesAsync();
    }
}

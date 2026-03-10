using Microsoft.EntityFrameworkCore;
using TextAnalyzer.Api.Data.Models;

namespace TextAnalyzer.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<HistoryRecord> History => Set<HistoryRecord>();
}
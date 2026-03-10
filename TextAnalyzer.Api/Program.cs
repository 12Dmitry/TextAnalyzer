using Microsoft.EntityFrameworkCore;
using Npgsql;
using TextAnalyzer.Api.Data;

var builder = WebApplication.CreateBuilder(args); 
builder.Services.AddControllers(); 
builder.Services.AddEndpointsApiExplorer(); 

// 1. Создаем билдер для источника данных Npgsql
var dataSourceBuilder = new NpgsqlDataSourceBuilder(builder.Configuration.GetConnectionString("DefaultConnection"));

// 2. ВКЛЮЧАЕМ поддержку JSON (то самое "explicit opt-in")
dataSourceBuilder.EnableDynamicJson();

// 3. Строим источник данных
var dataSource = dataSourceBuilder.Build();

// 4. Регистрируем DbContext, используя этот dataSource
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(dataSource));


// builder.Services.AddDatabaseDeveloperPageExceptionFilter();
// builder.Services.AddSwaggerGen(); 
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => { policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod(); });
});

var app = builder.Build();

// if (app.Environment.IsDevelopment())
// { app.UseSwagger(); app.UseSwaggerUI(); }
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
    // app.UseMigrationsEndPoint();
}

app.UseCors();
app.Use(async (context, next) =>
{
    Console.WriteLine($"[{DateTime.Now}] {context.Request.Method} {context.Request.Path}");

    if (context.Request.QueryString.HasValue)
        Console.WriteLine($"Query: {context.Request.QueryString}");

    // Если есть тело — читаем
    if (context.Request.ContentLength > 0)
    {
        context.Request.EnableBuffering();
        using var reader = new StreamReader(context.Request.Body, leaveOpen: true);
        var body = await reader.ReadLineAsync();
        context.Request.Body.Position = 0;

        Console.WriteLine($"Body: {body?[..15]}");
    }

    await next();
});

app.MapControllers();
app.Run();
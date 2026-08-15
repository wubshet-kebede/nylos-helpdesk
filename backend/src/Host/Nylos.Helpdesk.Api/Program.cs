/*it is the application Entry point
Starts the web server, sets up routing, 
and configures cross-cutting middleware
 (like CORS, Swagger/OpenAPI, 
 Authentication, HTTPS redirection).*/
using Nylos.Helpdesk.Modules.Tickets;

var builder = WebApplication.CreateBuilder(args);

// Add Modules
/*
It holds references to every module's main .csproj so it can invoke their registration hooks
it act as module aggregation or wiring 
*/
builder.Services.AddTicketsModule(builder.Configuration);

// Add services to the container
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

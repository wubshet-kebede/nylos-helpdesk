/*it is the application Entry point
Starts the web server, sets up routing, 
and configures cross-cutting middleware
 (like CORS, Swagger/OpenAPI, 
 Authentication, HTTPS redirection).*/
using Nylos.Helpdesk.Modules.Tickets;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
// Add Modules
/*
It holds references to every module's main .csproj so it can invoke their registration hooks
it act as module aggregation or wiring 
*/
builder.Services.AddTicketsModule(builder.Configuration);


var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

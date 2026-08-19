/*it is the application Entry point
Starts the web server, sets up routing, 
and configures cross-cutting middleware
 (like CORS, Swagger/OpenAPI, 
 Authentication, HTTPS redirection).*/
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Nylos.Helpdesk.Modules.Tickets;
using Nylos.Helpdesk.Modules.Tickets.Presentation;
using Nylos.Helpdesk.Modules.Users;
using Nylos.Helpdesk.Modules.Comments;
using Nylos.Helpdesk.Modules.Users.Infrastructure.Persistence;
using Nylos.Helpdesk.Modules.Users.Presentation;
using Nylos.Helpdesk.Shared.Infrastructure;
using System.Text.Json.Serialization;
var builder = WebApplication.CreateBuilder(args);
// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
builder.Services.AddHttpContextAccessor();
const string CorsPolicyName = "AllowFrontend";

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicyName, policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:5173"
              )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});
// Add Modules
/*
It holds references to every module's main .csproj so it can invoke their registration hooks
it act as module aggregation or wiring 
*/
// authentication and authorization
var jwtSettings = builder.Configuration.GetSection("Jwt");
var secretKey = Encoding.UTF8.GetBytes(jwtSettings["Secret"]!);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(secretKey)
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            if (context.Request.Cookies.TryGetValue("accessToken", out var token))
            {
                context.Token = token;
            }
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization();

builder.Services.AddTicketsModule(builder.Configuration);
builder.Services.AddUsersModule(builder.Configuration);
builder.Services.AddCommentsModule(builder.Configuration);
builder.Services.AddSharedInfrastructure();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(
        new JsonStringEnumConverter());
});
// builder.Services.AddCommentsModule(builder.Configuration);
var app = builder.Build();

// Seed Default Admin User
await UsersDbInitializer.SeedAsync(app.Services);
app.UseCors(CorsPolicyName);
//
// Automatically route unhandled exceptions into ProblemDetails format
//
app.UseExceptionHandler();
// Enable Authentication & Authorization Middleware
app.UseAuthentication();
app.UseAuthorization();
app.MapTicketEndpoints();
app.MapUserEndpoints();
// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
//Comment out HttpsRedirection during local HTTP testing to prevent cookie-dropping redirects
//app.UseHttpsRedirection();
app.MapControllers();
app.Run();

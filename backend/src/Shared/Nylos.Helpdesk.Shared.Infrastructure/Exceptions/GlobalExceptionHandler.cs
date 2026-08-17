using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nylos.Helpdesk.Shared.Abstractions.Exceptions;

namespace Nylos.Helpdesk.Shared.Infrastructure.Exceptions;

internal sealed class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "Exception occurred: {Message}", exception.Message);

        var (statusCode, title, detail) = exception switch
        {
            ValidationException => (StatusCodes.Status400BadRequest, "Validation Error", exception.Message),
            NotFoundException => (StatusCodes.Status404NotFound, "Resource Not Found", exception.Message),
            ConflictException => (StatusCodes.Status409Conflict, "Resource Conflict", exception.Message),
            UnauthorizedAccessException => (StatusCodes.Status401Unauthorized, "Unauthorized", exception.Message),
            InvalidOperationException => (StatusCodes.Status400BadRequest, "Bad Request", exception.Message),
            _ => (StatusCodes.Status500InternalServerError, "Server Error", "An unexpected error occurred.")
        };

        var problemDetails = new ProblemDetails
        {
            Status = statusCode,
            Title = title,
            Detail = detail,
            Instance = httpContext.Request.Path
        };

        problemDetails.Extensions["traceId"] = httpContext.TraceIdentifier;

        if (exception is ValidationException validationException)
        {
            problemDetails.Extensions["errors"] = validationException.Errors;
        }

        httpContext.Response.StatusCode = statusCode;
        httpContext.Response.ContentType = "application/problem+json";

        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

        return true;
    }
}
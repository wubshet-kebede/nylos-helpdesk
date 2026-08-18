using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Nylos.Helpdesk.Modules.Tickets.Application.Commands.CreateTicket;
using Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;

namespace Nylos.Helpdesk.Modules.Tickets.Presentation;

public static class TicketEndpoints
{
    public static IEndpointRouteBuilder MapTicketEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/v1/tickets")
            .WithTags("Tickets")
            .RequireAuthorization(); // Requires a valid JWT cookie/bearer token

        group.MapPost("/", async (
            CreateTicketRequest request,
            ClaimsPrincipal user,
            ISender sender,
            CancellationToken ct) =>
        {
            // extract authenticated user ID from JWT Subject claim
            var userIdClaim = user.FindFirstValue(ClaimTypes.NameIdentifier)
                           ?? user.FindFirstValue("sub");

            if (!Guid.TryParse(userIdClaim, out var customerId))
            {
                return Results.Unauthorized();
            }

            // Map request payload , authenticated CustomerId to Command
            var command = new CreateTicketCommand(
                request.Title,
                request.Description,
                request.Priority,
                customerId
            );
            /// this line triggers MediatR
            var ticketId = await sender.Send(command, ct);

            return Results.Created($"/api/v1/tickets/{ticketId}", new { id = ticketId });
        })
        .WithName("CreateTicket")
        .Produces<object>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .ProducesProblem(StatusCodes.Status401Unauthorized);

        return endpoints;
    }
}
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Nylos.Helpdesk.Modules.Tickets.Application.Commands.CreateTicket;
using Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTicketById;
using Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTickets;
using Nylos.Helpdesk.Modules.Tickets.Application.Commands.UpdateTicket;
using Nylos.Helpdesk.Modules.Tickets.Application.Commands.AssignTicket;
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
        //get  ticket using id 
        group.MapGet("/{id:guid}", async (Guid id, ISender sender, CancellationToken ct) =>
        {
            var query = new GetTicketByIdQuery(id);
            var result = await sender.Send(query, ct);
            return Results.Ok(result);
        })
        .WithName("GetTicketById")
        .Produces<TicketDetailsDto>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status404NotFound)
        .ProducesProblem(StatusCodes.Status401Unauthorized);
        // get ticket fro pagination and filter 
        group.MapGet("/", async (
            [AsParameters] GetTicketsQuery query,
            ISender sender,
            CancellationToken ct) =>
        {
            var result = await sender.Send(query, ct);
            return Results.Ok(result);
        })
        .WithName("GetTickets")
        .Produces<PagedResult<TicketSummaryDto>>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status401Unauthorized);

        // update ticket status 
        // Update Status
        group.MapPatch("/{id:guid}/status", async (
            Guid id,
            UpdateTicketStatusRequest request,
            ISender sender,
            CancellationToken ct) =>
        {
            var command = new UpdateTicketStatusCommand(id, request.NewStatus);
            await sender.Send(command, ct);
            return Results.NoContent();
        })
        .WithName("UpdateTicketStatus")
        .Produces(StatusCodes.Status204NoContent)
        .ProducesProblem(StatusCodes.Status404NotFound)
        .ProducesProblem(StatusCodes.Status401Unauthorized);

        // Assign Agent
        group.MapPatch("/{id:guid}/assign", async (
            Guid id,
            AssignTicketRequest request,
            ISender sender,
            CancellationToken ct) =>
        {
            var command = new AssignTicketCommand(id, request.AgentId);
            await sender.Send(command, ct);
            return Results.NoContent();
        })
        .WithName("AssignTicket")
        .Produces(StatusCodes.Status204NoContent)
        .ProducesProblem(StatusCodes.Status404NotFound)
        .ProducesProblem(StatusCodes.Status401Unauthorized);
        return endpoints;
    }
}
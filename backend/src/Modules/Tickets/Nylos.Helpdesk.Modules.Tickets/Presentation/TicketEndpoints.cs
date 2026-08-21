using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Nylos.Helpdesk.Modules.Tickets.Application.Commands.CreateTicket;
using Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTicketById;
using Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTickets;
using Nylos.Helpdesk.Modules.Tickets.Application.Queries.GetTicketStat;
using Nylos.Helpdesk.Modules.Tickets.Application.Commands.UpdateTicket;
using Nylos.Helpdesk.Modules.Tickets.Application.Commands.DeleteTicket;
using Nylos.Helpdesk.Modules.Tickets.Application.Commands.AssignTicket;
using Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;
using Nylos.Helpdesk.Shared.Infrastructure.Authentication;

namespace Nylos.Helpdesk.Modules.Tickets.Presentation;

public static class TicketEndpoints
{
    public static IEndpointRouteBuilder MapTicketEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/v1/tickets")
            .WithTags("Tickets")
            .RequireAuthorization(); // Requires a valid JWT cookie/bearer token

        // Create Ticket
        group.MapPost("/", async (
            CreateTicketRequest request,
            ClaimsPrincipal user,
            ISender sender,
            CancellationToken ct) =>
        {
            var customerId = user.GetUserId();
            if (customerId is null)
            {
                return Results.Unauthorized();
            }

            var command = new CreateTicketCommand(
                request.Title,
                request.Description,
                request.Priority,
                customerId.Value
            );

            var ticketId = await sender.Send(command, ct);

            return Results.Created($"/api/v1/tickets/{ticketId}", new { id = ticketId });
        })
        .WithName("CreateTicket")
        .Produces<object>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .ProducesProblem(StatusCodes.Status401Unauthorized);


        group.MapPut("/{id:guid}", async (
            Guid id,
            UpdateTicketRequest request,
            ClaimsPrincipal user,
            ISender sender,
            CancellationToken ct) =>
        {
            var currentUserId = user.GetUserId();
            if (currentUserId is null)
            {
                return Results.Unauthorized();
            }

            var command = new UpdateTicketCommand(
                id,
                currentUserId.Value,
                request.Title,
                request.Description,
                request.Priority
            );

            await sender.Send(command, ct);
            return Results.Ok(new { message = "Ticket updated successfully" });
        })
        .WithName("UpdateTicket")
        .Produces<object>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .ProducesProblem(StatusCodes.Status404NotFound)
        .ProducesProblem(StatusCodes.Status401Unauthorized);


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

        // Get tickets for pagination and filtering
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

        // Update Ticket Status
        group.MapPatch("/{id:guid}/status", async (
            Guid id,
            UpdateTicketStatusRequest request,
            ClaimsPrincipal user,
            ISender sender,
            CancellationToken ct) =>
        {
            var currentUserId = user.GetUserId();
            if (currentUserId is null)
            {
                return Results.Unauthorized();
            }

            var command = new UpdateTicketStatusCommand(id, currentUserId.Value, request.NewStatus);
            await sender.Send(command, ct);

            return Results.NoContent();
        })
        .WithName("UpdateTicketStatus")
        .Produces(StatusCodes.Status204NoContent)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .ProducesProblem(StatusCodes.Status401Unauthorized)
        .ProducesProblem(StatusCodes.Status404NotFound);

        // Assign Ticket
        group.MapPatch("/{id:guid}/assign", async (
            Guid id,
            AssignTicketRequest request,
            ClaimsPrincipal user,
            ISender sender,
            CancellationToken ct) =>
        {
            var currentUserId = user.GetUserId();
            if (currentUserId is null)
            {
                return Results.Unauthorized();
            }

            var command = new AssignTicketCommand(id, request.AssigneeId, currentUserId.Value);
            await sender.Send(command, ct);

            return Results.NoContent();
        })
        .WithName("AssignTicket")
        .Produces(StatusCodes.Status204NoContent)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .ProducesProblem(StatusCodes.Status401Unauthorized)
        .ProducesProblem(StatusCodes.Status403Forbidden)
        .ProducesProblem(StatusCodes.Status404NotFound);

        // Delete Ticket
        group.MapDelete("/{id:guid}", async (
            Guid id,
            ClaimsPrincipal user,
            ISender sender,
            CancellationToken ct) =>
        {
            var currentUserId = user.GetUserId();
            if (currentUserId is null)
            {
                return Results.Unauthorized();
            }

            var command = new DeleteTicketCommand(id, currentUserId.Value);
            await sender.Send(command, ct);

            return Results.NoContent();
        })
        .WithName("DeleteTicket")
        .Produces(StatusCodes.Status204NoContent)
        .ProducesProblem(StatusCodes.Status404NotFound)
        .ProducesProblem(StatusCodes.Status401Unauthorized);

        // Get Ticket Stats
        group.MapGet("/stats", async (
            ISender sender,
            CancellationToken ct) =>
        {
            var query = new GetTicketStatQuery();
            var result = await sender.Send(query, ct);
            return Results.Ok(result);
        })
        .WithName("GetTicketStats")
        .Produces<TicketStatsResponse>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status401Unauthorized);

        return endpoints;
    }
}
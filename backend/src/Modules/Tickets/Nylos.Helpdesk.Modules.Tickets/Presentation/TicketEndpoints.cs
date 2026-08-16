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
        var group = endpoints.MapGroup("api/tickets")
            .WithTags("Tickets")
            .RequireAuthorization();
        group.MapPost("/", async (CreateTicketRequest request, ISender sender, CancellationToken ct) =>
        {
            var command = new CreateTicketCommand(
                request.Title,
                request.Description,
                request.Priority,
                request.CreatedById
            );

            var ticketId = await sender.Send(command, ct);

            return Results.Created($"/api/tickets/{ticketId}", new { id = ticketId });
        });

        return endpoints;
    }
}
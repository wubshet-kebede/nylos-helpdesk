using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Nylos.Helpdesk.Modules.Comments.Application.Commands.CreateComment;
using Nylos.Helpdesk.Modules.Comments.Application.Queries;

namespace Nylos.Helpdesk.Modules.Comments.Presentation;

public record CreateCommentRequest(string Content, bool IsInternal = false);

public static class CommentsEndpoints
{
    public static void MapCommentsEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/tickets/{ticketId:guid}/comments")
            .WithTags("Comments")
            .RequireAuthorization();

        //Fetch all comments for a specific ticket
        group.MapGet("", async (
            Guid ticketId,
            ISender sender,
            CancellationToken ct) =>
        {
            var query = new GetCommentsByTicketIdQuery(ticketId);
            var result = await sender.Send(query, ct);
            return Results.Ok(result);
        })
        .WithName("GetTicketComments")
        .Produces(StatusCodes.Status200OK);

        // Add a new comment to a ticket
        group.MapPost("/", async (
    Guid ticketId,
    CreateCommentRequest request,
    ClaimsPrincipal user,
    ISender sender,
    CancellationToken ct) =>
{
    var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value
        ?? user.FindFirst("sub")?.Value;

    if (!Guid.TryParse(userIdClaim, out var authorId))
    {
        return Results.Unauthorized();
    }

    var command = new CreateCommentCommand(
        ticketId,
        authorId,
        request.Content,
        request.IsInternal
    );
    var commentId = await sender.Send(command, ct);

    return Results.Created($"/api/v1/tickets/{ticketId}/comments/{commentId}", new { id = commentId });
});
    }
}
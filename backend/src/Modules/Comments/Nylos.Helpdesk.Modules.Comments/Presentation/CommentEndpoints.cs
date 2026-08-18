using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Nylos.Helpdesk.Modules.Comments.Application.Commands.CreateComment;
using Nylos.Helpdesk.Modules.Comments.Presentation.Contracts;

namespace Nylos.Helpdesk.Modules.Comments.Presentation;

public static class CommentEndpoints
{
    public static IEndpointRouteBuilder MapCommentEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/v1/comments")
            .WithTags("Comments")
            .RequireAuthorization();

        group.MapPost("/", async (
            CreateCommentRequest request,
            ClaimsPrincipal user,
            ISender sender,
            CancellationToken ct) =>
        {
            var userIdClaim = user.FindFirstValue(ClaimTypes.NameIdentifier)
                           ?? user.FindFirstValue("sub");

            if (!Guid.TryParse(userIdClaim, out var authorId))
            {
                return Results.Unauthorized();
            }

            var command = new CreateCommentCommand(
                request.TicketId,
                authorId,
                request.Content,
                request.IsInternal
            );

            var commentId = await sender.Send(command, ct);

            return Results.Created($"/api/v1/comments/{commentId}", new { id = commentId });
        })
        .WithName("CreateComment")
        .Produces<object>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .ProducesProblem(StatusCodes.Status401Unauthorized);

        return endpoints;
    }
}
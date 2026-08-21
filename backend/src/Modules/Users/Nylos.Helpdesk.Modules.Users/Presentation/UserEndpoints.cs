using MediatR;
using Microsoft.AspNetCore.Builder;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Nylos.Helpdesk.Modules.Users.Application.Commands.LoginUser;
using Nylos.Helpdesk.Modules.Users.Application.Commands.RefreshUserToken;
using Nylos.Helpdesk.Modules.Users.Application.Commands.RegisterUser;
using Nylos.Helpdesk.Modules.Users.Application.Queries.GetCurrentUser;
using Nylos.Helpdesk.Modules.Users.Application.Queries.GetAllUsers;
using Nylos.Helpdesk.Modules.Users.Presentation.Contracts;
using Nylos.Helpdesk.Shared.Infrastructure.Authentication;


namespace Nylos.Helpdesk.Modules.Users.Presentation;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        //  Auth Group (/api/v1/auth)
        var authGroup = app.MapGroup("/api/v1/auth").WithTags("Auth");

        authGroup.MapPost("/register", async (
            RegisterUserRequest request,
            ISender sender) =>
        {
            var command = new RegisterUserCommand(
                request.Email,
                request.FullName,
                request.Password
            );

            var userId = await sender.Send(command);

            return Results.Created(
                $"/api/v1/users/{userId}",
                new { id = userId, message = "Account created successfully" });
        });

        authGroup.MapPost("/login", async (
            LoginUserRequest request,
            ISender sender) =>
        {
            var command = new LoginUserCommand(
                request.Email,
                request.Password
            );
            await sender.Send(command);

            return Results.Ok(new { message = "Logged in successfully" });
        });

        authGroup.MapPost("/refresh", async (ISender sender) =>
        {
            var success = await sender.Send(new RefreshTokenCommand());
            return success ? Results.Ok(new { message = "Token refreshed successfully" }) : Results.Unauthorized();
        });

        authGroup.MapPost("/logout", (HttpContext context) =>
        {
            context.Response.ClearAuthCookies();
            return Results.Ok(new { message = "Logged out successfully" });
        });

        authGroup.MapGet("/me", async (
    ClaimsPrincipal userClaims,
    ISender sender,
    CancellationToken ct) =>
{
    var userId = userClaims.GetUserId();
    if (userId is null)
    {
        return Results.Unauthorized();
    }

    var query = new GetCurrentUserQuery(userId.Value);
    var currentUser = await sender.Send(query, ct);

    return Results.Ok(currentUser);
})
.WithName("GetCurrentUser")
.RequireAuthorization()
.Produces<CurrentUserDto>(StatusCodes.Status200OK)
.ProducesProblem(StatusCodes.Status401Unauthorized)
.ProducesProblem(StatusCodes.Status404NotFound);


        // Users Workspace Group (/api/v1/users)
        var usersGroup = app.MapGroup("/api/v1/users")
                            .RequireAuthorization()
                            .WithTags("Users");

        usersGroup.MapGet("/", async (
            ISender sender,
            CancellationToken ct) =>
        {
            var query = new GetAllUsersQuery();
            var users = await sender.Send(query, ct);
            return Results.Ok(users);
        })
        .WithName("GetUsers")
        .Produces<IReadOnlyList<UserResponse>>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status401Unauthorized);
    }
}
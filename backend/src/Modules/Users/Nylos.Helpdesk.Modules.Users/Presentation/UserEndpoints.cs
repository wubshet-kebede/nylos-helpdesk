using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Nylos.Helpdesk.Modules.Users.Application.Commands.LoginUser;
using Nylos.Helpdesk.Modules.Users.Application.Commands.RefreshUserToken;
using Nylos.Helpdesk.Modules.Users.Application.Commands.RegisterUser;
using Nylos.Helpdesk.Shared.Infrastructure.Authentication;
using Nylos.Helpdesk.Modules.Users.Presentation.Contracts;

namespace Nylos.Helpdesk.Modules.Users.Presentation;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/auth").WithTags("Auth");
       /// MapPost creates an HTTP POST endpoint
       /// ISender sender this is mediatR
       group.MapPost("/register",
    async (
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
            new { id = userId });
    });
        group.MapPost("/login", 
        async (
            LoginUserRequest request,
            ISender sender) =>
        {
            var command = new LoginUserCommand(
                request.Email,
                request.Password
            );
            var success = await sender.Send(command);
            return success ? Results.Ok(new { message = "Logged in successfully" }) : Results.Unauthorized();
        }); 
        group.MapPost("/refresh", async (ISender sender) =>
        {
            var success = await sender.Send(new RefreshTokenCommand());
            return success ? Results.Ok(new { message = "Token refreshed successfully" }) : Results.Unauthorized();
        });

        group.MapPost("/logout", (HttpContext context) =>
        {
            context.Response.ClearAuthCookies();
            return Results.Ok(new { message = "Logged out successfully" });
        });
    }
}
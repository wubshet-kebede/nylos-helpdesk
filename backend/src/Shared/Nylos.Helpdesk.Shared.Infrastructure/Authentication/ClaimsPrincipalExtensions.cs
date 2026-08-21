// Nylos.Helpdesk.Shared.Infrastructure.Authentication/ClaimsPrincipalExtensions.cs
using System.Security.Claims;

namespace Nylos.Helpdesk.Shared.Infrastructure.Authentication;

public static class ClaimsPrincipalExtensions
{
    /// <summary>
    /// Safely extracts and parses the authenticated User ID from claims.
    /// </summary>
    public static Guid? GetUserId(this ClaimsPrincipal userClaims)
    {
        var userIdClaim = userClaims.FindFirstValue(ClaimTypes.NameIdentifier)
                       ?? userClaims.FindFirstValue("sub");

        if (Guid.TryParse(userIdClaim, out var userId))
        {
            return userId;
        }

        return null;
    }
}
using Microsoft.AspNetCore.Http;

namespace Nylos.Helpdesk.Shared.Infrastructure.Authentication;

public static class CookieExtensions
{
    // Access Token Cookie (Short-lived: 15 minutes)
    public static void AppendAccessTokenCookie(this HttpResponse response, string token, int expireMinutes = 15)
    {
        response.Cookies.Append("accessToken", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddMinutes(expireMinutes)
        });
    }

    // Refresh Token Cookie (Long-lived: 7 days)
    public static void AppendRefreshTokenCookie(this HttpResponse response, string refreshToken, int expireDays = 7)
    {
        response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Path = "/api/v1/auth/refresh", // Restrict cookie transmission to ONLY the refresh endpoint
            Expires = DateTimeOffset.UtcNow.AddDays(expireDays)
        });
    }

    // Clear both cookies on Logout
    public static void ClearAuthCookies(this HttpResponse response)
    {
        var options = new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax
        };

        response.Cookies.Delete("accessToken", options);
        response.Cookies.Delete("refreshToken", new CookieOptions { HttpOnly = true, Secure = true, SameSite = SameSiteMode.Strict, Path = "/api/v1/auth/refresh" });
    }
}
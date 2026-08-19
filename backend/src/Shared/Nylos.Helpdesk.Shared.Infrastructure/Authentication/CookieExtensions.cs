using Microsoft.AspNetCore.Http;

namespace Nylos.Helpdesk.Shared.Infrastructure.Authentication;

public static class CookieExtensions
{
    public static void AppendAccessTokenCookie(this HttpResponse response, string token, int expireMinutes = 15)
    {
        response.Cookies.Append("accessToken", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Path = "/",
            Expires = DateTimeOffset.UtcNow.AddMinutes(expireMinutes)
        });
    }
    public static void AppendRefreshTokenCookie(this HttpResponse response, string refreshToken, int expireDays = 7)
    {
        response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Path = "/api/v1/auth/refresh",
            Expires = DateTimeOffset.UtcNow.AddDays(expireDays)
        });
    }
    public static void ClearAuthCookies(this HttpResponse response)
    {
        response.Cookies.Delete("accessToken", new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Path = "/"
        });
        response.Cookies.Delete("refreshToken", new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Path = "/api/v1/auth/refresh"
        });
    }
}
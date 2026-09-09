using Microsoft.AspNetCore.Http;

namespace Nylos.Helpdesk.Shared.Infrastructure.Authentication;

public static class CookieExtensions
{
    private static CookieOptions GetCrossDomainCookieOptions(string path, DateTimeOffset expires)
    {
        return new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Path = path,
            Expires = expires
        };
    }

    public static void AppendAccessTokenCookie(this HttpResponse response, string token, int expireMinutes = 15)
    {
        response.Cookies.Append(
            "accessToken",
            token,
            GetCrossDomainCookieOptions("/", DateTimeOffset.UtcNow.AddMinutes(expireMinutes))
        );
    }

    public static void AppendRefreshTokenCookie(this HttpResponse response, string refreshToken, int expireDays = 7)
    {
        response.Cookies.Append(
            "refreshToken",
            refreshToken,
            GetCrossDomainCookieOptions("/api/v1/auth/refresh", DateTimeOffset.UtcNow.AddDays(expireDays))
        );
    }

    public static void ClearAuthCookies(this HttpResponse response)
    {

        response.Cookies.Delete("accessToken", GetCrossDomainCookieOptions("/", DateTimeOffset.UtcNow.AddDays(-1)));
        response.Cookies.Delete("refreshToken", GetCrossDomainCookieOptions("/api/v1/auth/refresh", DateTimeOffset.UtcNow.AddDays(-1)));
    }
}
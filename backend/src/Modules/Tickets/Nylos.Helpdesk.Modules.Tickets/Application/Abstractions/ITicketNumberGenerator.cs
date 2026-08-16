namespace Nylos.Helpdesk.Modules.Tickets.Application.Abstractions;

public interface ITicketNumberGenerator
{
    Task<string> GenerateAsync(CancellationToken cancellationToken = default);
}
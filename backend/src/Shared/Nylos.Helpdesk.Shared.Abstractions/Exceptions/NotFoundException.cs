namespace Nylos.Helpdesk.Shared.Abstractions.Exceptions;

public class NotFoundException : DomainException
{
    public NotFoundException(string message) : base(message) { }
}
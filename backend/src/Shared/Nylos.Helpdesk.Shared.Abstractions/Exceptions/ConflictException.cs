namespace Nylos.Helpdesk.Shared.Abstractions.Exceptions;

public class ConflictException : DomainException
{
    public ConflictException(string message) : base(message) { }
}
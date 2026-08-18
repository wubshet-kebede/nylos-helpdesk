using FluentValidation;

namespace Nylos.Helpdesk.Modules.Tickets.Application.Commands.CreateTicket;

public sealed class CreateTicketCommandValidator : AbstractValidator<CreateTicketCommand>
{
    public CreateTicketCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Ticket title is required.")
            .MaximumLength(200).WithMessage("Title cannot exceed 200 characters.");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Ticket description is required.")
            .MaximumLength(4000).WithMessage("Description cannot exceed 4000 characters.");
        RuleFor(x => x.Priority)
            .IsInEnum().WithMessage("Invalid ticket priority value.");
    }
}
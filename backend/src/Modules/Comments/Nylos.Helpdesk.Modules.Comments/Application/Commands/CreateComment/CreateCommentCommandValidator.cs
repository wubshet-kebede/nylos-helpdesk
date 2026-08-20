using FluentValidation;

namespace Nylos.Helpdesk.Modules.Comments.Application.Commands.CreateComment;

public class CreateCommentCommandValidator : AbstractValidator<CreateCommentCommand>
{
    public CreateCommentCommandValidator()
    {
        RuleFor(x => x.TicketId)
            .NotEmpty()
            .WithMessage("Ticket ID is required.");

        RuleFor(x => x.AuthorId)
            .NotEmpty()
            .WithMessage("Author ID is required.");

        RuleFor(x => x.Content)
            .NotEmpty()
            .WithMessage("Comment content cannot be empty.")
            .MaximumLength(2000)
            .WithMessage("Comment content cannot exceed 2000 characters.");
    }
}
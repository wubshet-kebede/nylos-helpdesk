using MediatR;
using Nylos.Helpdesk.Modules.Comments.Domain;
using Nylos.Helpdesk.Modules.Comments.Infrastructure.Persistence;
using Nylos.Helpdesk.Modules.Tickets.Contracts;
using Nylos.Helpdesk.Shared.Abstractions.Exceptions;

namespace Nylos.Helpdesk.Modules.Comments.Application.Commands.CreateComment;

internal sealed class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, Guid>
{
    private readonly CommentsDbContext _dbContext;
    private readonly ITicketContractService _ticketContractService;

    public CreateCommentCommandHandler(
        CommentsDbContext dbContext,
        ITicketContractService ticketContractService)
    {
        _dbContext = dbContext;
        _ticketContractService = ticketContractService;
    }

    public async Task<Guid> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {
        // Fetch ticket status via module contract
        var ticketInfo = await _ticketContractService.GetTicketStatusAsync(request.TicketId, cancellationToken);

        //  Verify ticket exists
        if (ticketInfo is null)
        {
            throw new NotFoundException($"Ticket with ID {request.TicketId} was not found.");
        }

        //  Reject comment creation on Closed tickets
        if (ticketInfo.IsClosed)
        {
            throw new InvalidOperationException("Cannot add comments to a closed ticket.");
        }

        //  Create and persist comment
        var comment = new Comment(
            Guid.NewGuid(),
            request.TicketId,
            request.AuthorId,
            request.Content,
            request.IsInternal
        );

        _dbContext.Comments.Add(comment);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return comment.Id;
    }
}
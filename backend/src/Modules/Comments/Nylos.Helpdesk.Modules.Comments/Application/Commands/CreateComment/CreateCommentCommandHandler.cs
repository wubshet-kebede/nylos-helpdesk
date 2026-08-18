using MediatR;
using Nylos.Helpdesk.Modules.Comments.Domain;
using Nylos.Helpdesk.Modules.Comments.Infrastructure.Persistence;

namespace Nylos.Helpdesk.Modules.Comments.Application.Commands.CreateComment;

internal sealed class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, Guid>
{
    private readonly CommentsDbContext _dbContext;

    public CreateCommentCommandHandler(CommentsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Guid> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {
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
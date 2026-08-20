using MediatR;
using Microsoft.EntityFrameworkCore;
using Nylos.Helpdesk.Modules.Comments.Infrastructure.Persistence;
using Nylos.Helpdesk.Modules.Comments.Presentation.Contracts;

namespace Nylos.Helpdesk.Modules.Comments.Application.Queries;

internal sealed class GetCommentsByTicketIdQueryHandler
    : IRequestHandler<GetCommentsByTicketIdQuery, IReadOnlyList<CommentDto>>
{
    private readonly CommentsDbContext _dbContext;

    public GetCommentsByTicketIdQueryHandler(CommentsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<CommentDto>> Handle(
        GetCommentsByTicketIdQuery request,
        CancellationToken cancellationToken)
    {
        return await _dbContext.Comments
            .AsNoTracking()
            .Where(c => c.TicketId == request.TicketId)
            .OrderBy(c => c.CreatedAt)
            .Select(c => new CommentDto(
                c.Id,
                c.TicketId,
                c.AuthorId,
                c.Content,
                c.IsInternal,
                c.CreatedAt,
                c.UpdatedAt,
                c.UpdatedAt.HasValue
            ))
            .ToListAsync(cancellationToken);
    }
}
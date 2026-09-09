using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nylos.Helpdesk.Modules.Comments.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCommentsChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Comments_TicketId_CreatedAt",
                schema: "comments",
                table: "Comments",
                columns: new[] { "TicketId", "CreatedAt" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Comments_TicketId_CreatedAt",
                schema: "comments",
                table: "Comments");
        }
    }
}

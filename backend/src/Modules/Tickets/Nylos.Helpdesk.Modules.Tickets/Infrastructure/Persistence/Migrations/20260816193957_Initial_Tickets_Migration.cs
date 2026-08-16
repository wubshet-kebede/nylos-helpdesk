using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nylos.Helpdesk.Modules.Tickets.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial_Tickets_Migration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "tickets");

            migrationBuilder.CreateTable(
                name: "Tickets",
                schema: "tickets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TicketNumber = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: false),
                    Priority = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    CreatedById = table.Column<Guid>(type: "uuid", nullable: false),
                    AssigneeId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_AssigneeId",
                schema: "tickets",
                table: "Tickets",
                column: "AssigneeId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_CreatedById",
                schema: "tickets",
                table: "Tickets",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Priority",
                schema: "tickets",
                table: "Tickets",
                column: "Priority");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Status",
                schema: "tickets",
                table: "Tickets",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_TicketNumber",
                schema: "tickets",
                table: "Tickets",
                column: "TicketNumber",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tickets",
                schema: "tickets");
        }
    }
}

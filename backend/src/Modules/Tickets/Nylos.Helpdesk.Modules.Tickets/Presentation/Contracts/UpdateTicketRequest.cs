using System.Text.Json.Serialization;
using Nylos.Helpdesk.Modules.Tickets.Domain;

namespace Nylos.Helpdesk.Modules.Tickets.Presentation.Contracts;

public sealed record UpdateTicketRequest(
    string Title,
    string Description,
    [property: JsonConverter(typeof(JsonStringEnumConverter))] TicketPriority Priority
);
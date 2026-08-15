# Nylos Helpdesk

A compact internal issue and ticket tracker built for the Nylos Junior Software Developer technical assessment.

The application allows team members to create, assign, update, and track support tickets, move tickets through a defined status workflow, and discuss tickets through comments.

> Status: Backend architecture scaffolded. Core features are in progress.

## Tech stack

### Backend

- C# / ASP.NET Core Web API
- .NET 10
- PostgreSQL
- Entity Framework Core
- Npgsql PostgreSQL provider

### Frontend

- React
- TypeScript
- Vite

### Development tooling

- Docker Compose for local PostgreSQL
- Git and GitHub

## Architecture

The backend follows a **pragmatic layered modular monolith** architecture.

It runs as one ASP.NET Core API host and is deployed as a single application. Internally, the code is organized into business modules with explicit boundaries.

```text
backend/
├── src/
│   ├── Host/
│   │   └── Nylos.Helpdesk.Api
│   │
│   ├── Modules/
│   │   ├── Tickets/
│   │   │   ├── Nylos.Helpdesk.Modules.Tickets
│   │   │   └── Nylos.Helpdesk.Modules.Tickets.Contracts
│   │   ├── Comments/
│   │   │   ├── Nylos.Helpdesk.Modules.Comments
│   │   │   └── Nylos.Helpdesk.Modules.Comments.Contracts
│   │   └── Users/
│   │       ├── Nylos.Helpdesk.Modules.Users
│   │       └── Nylos.Helpdesk.Modules.Users.Contracts
│   │
│   └── Shared/
│       ├── Nylos.Helpdesk.Shared.Abstractions
│       └── Nylos.Helpdesk.Shared.Infrastructure
│
└── tests/
```

### Modules

- **Tickets**: Ticket creation, editing, assignment, status workflow, filtering, and pagination.
- **Comments**: Adding and retrieving ticket comments.
- **Users**: Listing users available for ticket assignment.

### Layer responsibilities

- **Host/API**: Application startup, dependency injection, middleware, OpenAPI configuration, and module registration.
- **Presentation**: HTTP endpoints and request/response mapping.
- **Application**: Use cases, validation, and orchestration of business operations.
- **Domain**: Entities, value objects, enums, and business rules.
- **Infrastructure**: PostgreSQL persistence, EF Core configuration, migrations, and seed data.
- **Contracts**: The intentional public surface of a module for cross-module communication.

### Dependency rules

- Modules must not directly reference another module's implementation.
- A module may reference another module's `*.Contracts` project when integration is needed.
- Shared projects contain only cross-cutting technical abstractions and infrastructure.
- Business rules belong in the module domain/application layers, never in React components.

## Planned features

- [ ] Ticket CRUD operations.
- [ ] Ticket status workflow: `Open → In Progress → Resolved → Closed`.
- [ ] Server-side validation of invalid status transitions.
- [ ] Ticket assignment to users.
- [ ] Ticket comments.
- [ ] Ticket filtering by status, priority, and assignee.
- [ ] Ticket pagination and sorting.
- [ ] PostgreSQL database integration using EF Core migrations.
- [ ] Sample data seeding.
- [ ] React ticket list, form, and ticket-detail views.
- [ ] Loading, empty, validation, and error states.
- [ ] Automated tests for core ticket workflow rules.

## Getting started

### Prerequisites

Install:

- .NET 10 SDK
- Node.js 20 or newer
- Docker and Docker Compose
- Git

### Clone the repository

```bash
git clone https://github.com/wubshet-kebede/nylos-helpdesk.git
cd nylos-helpdesk
```

### Backend

The backend solution is located in the `backend` directory.

```bash
cd backend
dotnet restore
dotnet build
dotnet run --project src/Host/Nylos.Helpdesk.Api
```

The API will be available at the URL shown in the terminal.

> PostgreSQL, EF Core migrations, and Docker Compose setup will be added as implementation progresses.

## API conventions

The API will use REST-style endpoints:

```text
GET    /api/tickets
GET    /api/tickets/{id}
POST   /api/tickets
PUT    /api/tickets/{id}
DELETE /api/tickets/{id}

GET    /api/tickets/{ticketId}/comments
POST   /api/tickets/{ticketId}/comments

GET    /api/users
```

Expected error responses will use a consistent `ProblemDetails`-style response shape.

## Key design decisions

- **Single deployable application**: A modular monolith avoids the deployment, networking, and operational overhead of microservices for a small internal helpdesk application.
- **Module boundaries**: Tickets, Comments, and Users are separated because they represent distinct responsibilities.
- **Contract-based integration**: Modules expose only deliberate public contracts, not their internal implementation details.
- **Domain-owned workflow rules**: Ticket status transitions are validated server-side to ensure the rule cannot be bypassed by the frontend.
- **EF Core migrations**: Database schema changes will be versioned, reproducible, and committed to the repository.
- **PostgreSQL in Docker**: Docker Compose will provide an easy and consistent local database setup.

## Trade-offs

The project uses module boundaries and layered separation to keep the code maintainable. However, it intentionally remains a single application and database because the problem scope is small and time-boxed.

I intentionally do not use microservices, a distributed message broker, separate databases per module, or complex event-driven infrastructure. Those approaches would introduce operational overhead without solving a demonstrated requirement for this assessment.

## Development progress

- [x] Create backend solution.
- [x] Create modular monolith project structure.
- [x] Add API host, module projects, contracts, and shared projects.
- [ ] Configure PostgreSQL and EF Core.
- [ ] Create database migrations.
- [ ] Implement tickets module.
- [ ] Implement comments module.
- [ ] Implement users module.
- [ ] Build React frontend.
- [ ] Add tests.
- [ ] Complete API documentation.

## License

This repository was created for the Nylos Junior Software Developer technical assessment.

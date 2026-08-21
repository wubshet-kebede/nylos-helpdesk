# Technical Decisions and Trade-offs

This project was implemented as a time-boxed technical assessment. The focus was to deliver a complete ticket-management workflow with clear boundaries, reliable validation, secure authentication, and a polished user experience.

## 1. Architecture: Modular monolith

**Decision:**  
The backend uses a pragmatic layered modular monolith architecture. The application is divided into `Users`, `Tickets`, and `Comments` modules, each with clear boundaries and internal layers for presentation, application logic, domain logic, and infrastructure/persistence.

**Why:**  
This structure keeps related code together by business capability while maintaining separation between HTTP concerns, use cases, business rules, and database access.

**Trade-off:**  
A flat project structure or traditional layered monolith would have been faster to create for a small helpdesk application. However, module boundaries provide better maintainability and clearer ownership as the application grows.

Microservices were deliberately avoided because they would add unnecessary complexity: independent deployments, service discovery, network failures, distributed communication, and operational overhead. The modular monolith preserves useful internal boundaries without those distributed-system costs.

## 2. Database design: Domain schemas

**Decision:**  
PostgreSQL tables are divided into module-specific schemas:

- `users`
- `tickets`
- `comments`

Each module owns its EF Core `DbContext`, entity configuration, migrations, and schema.

**Why:**  
Schema ownership reflects the module boundaries in the database as well as in code. It makes data ownership clearer and prevents the database from becoming a single unstructured collection of tables in the default `public` schema.

**Trade-off:**  
This requires additional EF Core configuration, including `HasDefaultSchema(...)`, separate DbContexts, and separate migration histories for each module. It also requires deliberate handling of cross-module references.

The added setup was accepted because it creates a more realistic modular design while retaining one PostgreSQL database and one Docker Compose setup for easy local development.

## 3. Authentication: Custom JWT and refresh tokens

**Decision:**  
Authentication uses custom JWT access tokens with HTTP-only refresh tokens. Refresh-token records are persisted in the `users.refresh_tokens` table to support expiration, revocation, and token rotation.

**Why:**  
A custom implementation keeps the authentication model focused on the requirements of the application. It also ensures that ticket creators are derived from the authenticated user session rather than being trusted from client-provided input.

**Trade-off:**  
ASP.NET Core Identity would provide mature built-in features such as email verification, password reset, account lockout, multi-factor authentication, and external login providers.

However, it also introduces more tables, conventions, and setup than required for this assessment. The custom implementation provides focused session management while keeping the schema and application behavior easy to understand.

## 4. Validation: FluentValidation and Zod

**Decision:**  
Validation is implemented in two layers:

- **Backend:** FluentValidation validates API requests and business input.
- **Frontend:** Zod and React Hook Form validate form input before requests are submitted.

**Why:**  
Frontend validation gives users immediate feedback, while backend validation remains the source of truth and protects the API from invalid or malicious requests.

FluentValidation keeps validation rules outside DTOs and supports more complex validation than basic data annotations. This is useful for rules such as validating ticket status changes and checking referenced data.

**Trade-off:**  
C# data annotations such as `[Required]` and `[StringLength]` are faster to add for simple fields. Using FluentValidation and Zod introduces additional packages and validation definitions in two places.

This trade-off was accepted because it provides clearer validation logic, better frontend UX, and more consistent API error responses.

## 5. Frontend data fetching: TanStack Query

**Decision:**  
TanStack Query manages server state for tickets, comments, and users. React Context is used only for client-side authentication state.

**Why:**  
TanStack Query provides caching, loading states, error states, request deduplication, mutation handling, and cache invalidation. For example, after creating a comment, the relevant ticket-comment query is invalidated and refreshed.

**Trade-off:**  
Redux Toolkit or a larger global state solution could centralize both server data and UI state in one store. However, that approach would require more boilerplate through reducers, actions, selectors, and manual async-state management.

TanStack Query was selected because most application data comes from the API, making it a better fit for this project’s server-state needs.

## 6. Comment updates: REST over real-time sockets

**Decision:**  
Comments are managed through standard REST endpoints. After a comment is created, TanStack Query invalidates and refreshes the comment list.

**Why:**  
REST is simple to test, easy to evaluate, and fully meets the assessment requirements for viewing and adding comments.

**Trade-off:**  
SignalR or WebSockets would allow real-time push updates when another user adds a comment or changes a ticket. That would improve collaboration for multiple users viewing the same ticket simultaneously.

Real-time communication was intentionally de-prioritized because it would add socket lifecycle management, connection-state handling, and additional testing complexity beyond the assessment scope.

## Future improvements

If the application were extended beyond the assessment, the next improvements would include:

1. SignalR notifications for ticket changes and new comments.
2. Email notifications for assignment, status changes, and comment activity.
3. File attachments for tickets and comments.
4. Audit history for ticket updates and status changes.
5. Role-based authorization policies with more granular permissions.
6. Password reset, email verification, account lockout, and multi-factor authentication.
7. Full-text search, saved filters, ticket tags, and reporting dashboards.
8. CI/CD automation for build validation, tests, linting, and migration checks.

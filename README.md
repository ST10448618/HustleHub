<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?color=00FF88&size=45&center=true&vCenter=true&width=1000&lines=HUSTLEHUB%2B;Secure+Freelance+Marketplace" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Architecture-MERN-00FF88?style=flat-square" />
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/API-Express-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/ODM-Mongoose-880000?style=flat-square" />
  <img src="https://img.shields.io/badge/Auth-JWT-000000?style=flat-square" />
  <img src="https://img.shields.io/badge/Security-DevSecOps-6f42c1?style=flat-square" />
  <img src="https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white" />
  <img src="https://img.shields.io/badge/Container-Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Transport-HTTPS%2FTLS-00A98F?style=flat-square" />
</p>

---

## Demonstration Video

<p align="center">
  <a href="https://www.youtube.com/watch?v=yLWS5cE6ITk">
    <img src="https://img.shields.io/badge/YouTube-Watch%20Demo-red?style=for-the-badge&logo=youtube&logoColor=white"/>
  </a>
</p>

> Click the badge above to watch a full walkthrough of the HustleHub+ application, covering all core and innovative features.

---

## Main Project Link
<p align="center">
  <a href="https://github.com/EMKNDW/insy7314-g2-2026-insy7314-2026-poe-st10448618.git">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

## Backup Project Link

<p align="center">
  <a href="https://github.com/ST10448618/HustleHub">
    <img src="https://img.shields.io/badge/GitHub-Repository-white?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

--- 

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account

### Installation

 **Clone and install dependencies**
   ```bash
   git clone <your-repository-url>
   cd hustlehub-plus

   # Backend
   cd backend
   npm install
   npm install --save-dev nodemon

   # Frontend (in a new terminal)
   cd ../frontend
   npm install
  ```

---
## 1. System Overview

HustleHub+ is a secure freelance marketplace platform that connects clients with freelancers. Freelancers can advertise their services through gigs, while clients can browse available services and create bookings. The platform also records simulated financial transactions generated from bookings and provides freelancers with information about income and estimated tax obligations. (MongoDB, 2023)

The system supports three main user roles: **Clients**, **Freelancers** and **Administrators**. Clients primarily use the marketplace and booking functionality, freelancers manage their gigs and financial information, and administrators manage and oversee the platform.

Security is a core requirement because HustleHub+ processes sensitive information, including authentication credentials, user information, roles, bookings, transactions and income-related data. The system therefore uses multiple security controls throughout the application rather than relying on a single security mechanism. (OWASP, 2021)

---

## 2. System Architecture

### 2.1 MERN Architecture

HustleHub+ follows the MERN architecture, consisting of MongoDB, Express, React and Node.js. The React frontend provides the user interface, while the Node.js and Express backend provides the REST API and handles application logic and security. MongoDB Atlas provides the database layer and is accessed through Mongoose. (React, 2024)

The architecture separates the presentation, application, security, business logic and data layers. This separation improves maintainability and allows functionality to be developed and tested without placing all responsibilities within a single component.

### 2.2 System Components

The main components of HustleHub+ are:

- **React Frontend**: Provides the user interface for authentication, marketplace functionality, gig management, bookings and financial information (React, 2024).
- **Node.js and Express API**: Handles HTTP requests, API routes, middleware and communication between the frontend and application logic (ExpressJS, 2024).
- **Security Middleware**: Performs authentication, validation and authorisation-related checks (OWASP, 2021).
- **Controllers**: Receive requests and coordinate the appropriate application operations.
- **Services/Business Logic**: Contains the rules and processing required by the application.
- **Mongoose**: Provides the object modelling layer used to communicate with MongoDB (MongooseJS, 2024).
- **MongoDB Atlas**: Stores application data such as users, gigs, bookings and transactions (MongoDB, 2023).
- **Logging and Monitoring**: Records important application, security and operational events.

### 2.3 Backend Architecture

The backend uses a layered structure. Requests are processed by security middleware before reaching the relevant routes and controllers. Controllers coordinate the request and pass the required operation to the service or business-logic layer. Where data is required, the service communicates with MongoDB through Mongoose.

This separation gives each backend component a clear responsibility. It also supports future development because additional functionality can be introduced without placing all application logic directly inside routes or controllers.

### 2.4 System Boundaries

The main HustleHub+ application boundary contains the React frontend, Node.js/Express backend, security controls, business logic and application-level logging.

External services include MongoDB Atlas, cloud logging and monitoring services, and GitHub/GitHub Actions. These services support the application but are not part of the core application codebase.

HTTPS/TLS forms the secure communication boundary between users and the application. The security controls within the backend then determine whether a request is valid and authorised.

---

## 3. Request Flow

A normal request begins when a user interacts with the React frontend. The frontend is responsible for providing the user interface and collecting the information required for a particular operation. Once the user performs an action, such as logging in, viewing a gig, creating a booking or updating their profile, the frontend sends the required request to the Express API over HTTPS. Using HTTPS ensures that information transmitted between the client and backend is encrypted while travelling across the network.

When the request reaches the Express backend, it passes through the relevant security middleware before reaching the application route and controller. Middleware provides an important security layer because it allows common checks to be performed consistently across multiple endpoints. Depending on the endpoint, these checks can include authentication, authorisation, rate limiting, input validation, sanitisation and security-related request processing.

For protected resources, the backend first verifies the user's authentication token. The JWT is checked to determine whether it is valid, has not expired and was issued using the application's trusted signing secret. Once the user's identity has been established, additional authorisation checks can be performed. These checks may include role-based access control or ownership verification to determine whether the authenticated user is permitted to perform the requested action. (Auth0, 2024)

After the required security checks succeed, the request is passed to the appropriate controller. The controller manages the request and passes the required operation to the service layer. The service layer contains the application's business logic and helps keep security, routing and business operations separated. When database information is required, the service layer uses Mongoose to communicate with MongoDB Atlas.

The result of the operation is then returned from the service layer to the controller. The controller sends an appropriate HTTP response through the Express API to the React frontend. The frontend processes the response and displays the relevant information or feedback to the user.

This request flow creates a structured separation between the frontend, API, security middleware, controllers, services and database. More importantly, it ensures that security checks occur before protected functionality is executed, reducing the possibility of unauthorised users accessing sensitive operations or data.

---

## 4. Authentication and JWT

### 4.1 Registration

During registration, the user supplies the information required to create an account, such as their name, email address, password and selected user role where applicable. This information is treated as untrusted input and must be validated before being processed by the backend. Validation helps ensure that required fields are present and that information follows the expected application format.

The backend should also check whether an account already exists using the supplied email address. Preventing duplicate accounts helps maintain data integrity and avoids unnecessary authentication conflicts.

The user's password is securely hashed before it is stored in the database. A password hash is a one-way representation of the original password, meaning that the application does not need to retain the user's plaintext password. A suitable password-hashing algorithm such as bcrypt can be used to make password storage more resistant to common password-cracking techniques.

Only the resulting password hash is retained in the database. This means that even if stored user information were exposed, the database would not directly contain users' original passwords. Password security is therefore treated as a separate concern from authentication itself.

### 4.2 Login

During login, the user submits their credentials through the React frontend, which sends them to the backend over HTTPS. The backend validates the supplied input before attempting authentication. The relevant user account is then retrieved from MongoDB.

The supplied password is compared against the stored password hash using the password-hashing mechanism. If the credentials are valid, authentication succeeds and the backend generates a JSON Web Token (JWT) representing the authenticated session.

If the credentials are invalid, the backend returns a controlled authentication failure. The response should avoid revealing whether the email address or password was specifically incorrect, as providing excessive information can assist attackers in identifying valid accounts.

### 4.3 JWT Generation

A JWT is generated after successful authentication and is used to identify the authenticated user during subsequent protected requests. The token contains only information required by the application, such as a user identifier, role and token-related claims.

Sensitive information, particularly passwords or other confidential user information, should never be stored inside the JWT. JWTs are designed to carry authentication-related claims, not to act as secure storage for sensitive information.

The token is digitally signed by the backend, allowing the server to verify that it was generated by a trusted source and has not been modified. The backend can also check token expiration to ensure that an old or expired token cannot be used indefinitely.

### 4.4 Protected Requests

For protected API requests, the client sends the JWT using the HTTP Authorization header with the Bearer scheme. The backend verifies the token before allowing access to protected functionality.

JWT authentication establishes the identity of the user, but authentication alone does not determine whether that user should be allowed to perform every operation. Additional controls such as role-based access control and ownership checks determine whether the authenticated user is authorised to perform the requested operation.

This distinction between authentication and authorisation is important within HustleHub+. For example, a valid Freelancer JWT proves that the request belongs to an authenticated Freelancer, but it does not automatically give that user permission to access another user's private resources or perform Admin-only functions.

---

## 5. Security Architecture

### 5.1 Password Security

Passwords are securely hashed before storage, and plaintext passwords are never retained by the application. During login, the supplied password is compared against the stored password hash rather than being directly compared with a stored plaintext value.

Password hashing reduces the impact of a potential database compromise because attackers cannot immediately retrieve users' original passwords from the database. Strong password-handling practices therefore provide an important first layer of protection for user accounts and credentials. (NIST, 2020)

### 5.2 Input Validation

All user input is treated as untrusted and must be validated before processing. Validation checks that information follows the expected format and application rules, including required fields, email addresses, passwords, IDs, financial information and other user-supplied values.

Backend validation is particularly important because users can bypass the React frontend and send requests directly to the API. Frontend validation improves usability, but it cannot be relied upon as the primary security mechanism. (Snyk, 2024)

By performing validation on the backend, HustleHub+ can reject malformed, incomplete or unexpected requests before they reach sensitive business logic or database operations.

### 5.3 Input Sanitisation

Sanitisation complements validation by reducing potentially harmful content in user-supplied data. This is especially important for information that may later be displayed to other users, such as gig descriptions, profile information or other marketplace content. (OWASP, 2021)

Sanitisation helps reduce the risk of malicious content being interpreted as executable input, including XSS-style attacks. Validation determines whether input follows the expected rules, while sanitisation helps ensure that accepted content is safe to process or display. (OWASP, 2021)

Together, these controls provide stronger protection against malicious user input and help prevent unsafe content from moving through the application.

### 5.4 HTTPS/TLS

HTTPS/TLS protects communication between users and the HustleHub+ application. This is important because credentials, JWTs, personal information and transactional data may be transmitted between the client and server. (Cloudflare, 2024)

Encryption of the communication channel reduces the risk of sensitive information being intercepted or modified during transmission. This is particularly important when users access the platform over public or untrusted networks. (Cloudflare, 2024)

HTTPS protects the communication channel, while JWT provides authentication, so both controls address different security requirements. HTTPS helps protect data while it is being transmitted, whereas JWT allows the backend to establish the identity of the user making a protected request.

### 5.5 RBAC

Role-Based Access Control (RBAC) restricts functionality according to the authenticated user's role. HustleHub+ supports Client, Freelancer and Admin roles, with permissions appropriate to each role.

For example, a client may be permitted to book freelance services, while a Freelancer may manage their own gigs and bookings. Administrative functionality should be restricted to Admin users.

RBAC follows the principle of least privilege by preventing users from accessing functionality outside their authorised responsibilities. Role checks are performed on the backend so that users cannot simply modify frontend elements to gain access to restricted functionality. (OWASP, 2021)

### 5.6 Ownership Checks

Ownership checks provide protection at the individual resource level. A valid Freelancer JWT should not automatically allow that freelancer to modify another freelancer's gig, profile or other resources.

The backend can therefore verify both the user's identity and whether the requested resource belongs to that user where ownership is required. This provides a more granular security layer than RBAC alone. (Auth0, 2024)

For example, RBAC may establish that a user is a Freelancer and can manage gigs, while an ownership check confirms that the gig being edited belongs to that Freelancer. Combining these controls helps prevent horizontal privilege escalation between users with the same role.

### 5.7 Rate Limiting

Rate limiting restricts excessive requests to the API. It is particularly useful for sensitive endpoints such as authentication endpoints, where repeated automated requests could be used for brute-force attacks or other abusive activity.

A rate limiter can restrict how frequently a client or IP address is allowed to make requests within a defined period. If the configured threshold is exceeded, additional requests can temporarily be rejected. (Snyk, 2024)

Rate limiting therefore provides an additional layer of protection against excessive or automated requests. It can also help protect application resources from unnecessary traffic and reduce the potential impact of automated attacks.

### 5.8 Security Headers

Security headers provide additional browser-level protection. Helmet can be used to configure security-related HTTP headers, while Content Security Policy (CSP) can restrict which scripts and other resources the browser is allowed to load. (MDN, 2024)

These controls can help reduce the impact of browser-based attacks by controlling how the browser interprets and executes content received from the application. Security headers therefore complement authentication, validation and sanitisation rather than replacing them.

### 5.9 Secure Error Handling

API errors are controlled so that internal implementation details are not unnecessarily exposed. Responses should not reveal stack traces, internal file paths, database credentials, secret keys or configuration values (Snyk, 2024).

Instead, the backend should return appropriate HTTP status codes and clear but controlled error messages. For example, a failed request can inform the user that authentication failed or that the supplied data is invalid without exposing the underlying implementation details. (Snyk, 2024)

Controlled error responses provide useful information to legitimate users while reducing information that could assist an attacker in understanding the application's internal structure.

---

## 6. Security Rationale

The security controls used by HustleHub+ were selected according to the risks associated with processing authentication, user, booking and financial information.

| Security Control          | Purpose                                                       |
|---------------------------|---------------------------------------------------------------|
| Password hashing          | Protects stored credentials                                   |
| JWT authentication        | Identifies authenticated users                                |
| Input validation          | Rejects unexpected or invalid input                           |
| Sanitisation              | Reduces malicious content and XSS risks                       |
| HTTPS/TLS                 | Protects information during transmission                      |
| RBAC                      | Restricts functionality by role                               |
| Ownership checks          | Protects individual user resources                            |
| Rate limiting             | Reduces excessive and automated requests                      |
| Security headers          | Provides additional browser protection                        |
| Secure error handling     | Reduces information leakage                                   |

These controls provide defence in depth. Multiple security mechanisms operate at different stages of a request, meaning the system does not depend on a single control to protect sensitive functionality.

---

## 7. DevSecOps / CI‑CD Overview

Security and testing are incorporated into the development lifecycle through a GitHub Actions CI/CD pipeline. Rather than treating security as a final step before deployment, HustleHub+ integrates testing and security checks throughout the development and delivery process. (Snyk, 2024)

The pipeline can perform backend and frontend unit testing to verify that individual components behave as expected. Automated testing helps identify defects early and reduces the likelihood of introducing regressions when new functionality is added. (Mocha, 2024)

Newman can also be used to execute automated API endpoint tests against the Express backend. These tests can verify authentication, authorisation, validation and expected API responses. This provides an additional level of confidence that security controls continue to operate correctly as the application develops. (Snyk, 2024)

Static analysis and security checks can also be incorporated into the pipeline. These checks can identify potential coding issues, insecure dependencies or other weaknesses before the application progresses towards deployment. (GitHub, 2024) Automated checks provide developers with earlier feedback, allowing issues to be addressed before they reach production.

Only when the required checks succeed should the application proceed towards the build stage. Successful pipeline execution can then lead to Docker image creation and containerisation of the application. Containerisation provides a consistent environment for packaging and running the application and helps reduce differences between development and deployment environments.

The CI/CD pipeline therefore supports the DevSecOps approach by integrating development, testing, security and deployment into a continuous process. This reduces reliance on manual security checks and encourages security to be considered throughout the software development lifecycle.

The final architecture treats testing, security analysis and deployment processes as connected parts of the application's lifecycle rather than activities performed only at the end of development. This approach supports a more reliable and secure application while allowing the HustleHub+ team to identify and address issues earlier in the development process.

---

## References

- Auth0 (2024). *Get started with JSON web tokens*. [online] Available at: https://auth0.com/learn/json-web-tokens [Accessed 5 Sept. 2026].
- Cloudflare (2024). *What is HTTPS?* [online] Available at: https://www.cloudflare.com/en-gb/learning/ssl/what-is-https/ [Accessed 5 Sept. 2026].
- ExpressJS (2024). *Express - Node.js web application framework*. [online] Available at: https://expressjs.com/ [Accessed 5 Sept. 2026].
- GitHub (2024). *GitHub actions documentation*. [online] Available at: https://docs.github.com/en/actions [Accessed 5 Sept. 2026].
- Grassi, P. et al. (2020). *Digital identity guidelines: Authentication and lifecycle management*. NIST Special Publication 800-63B. Available at: https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final [Accessed 5 Sept. 2026].
- MDN (2024). *Content security policy (CSP)*. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP [Accessed 5 Sept. 2026].
- Mocha (2024). *Mocha - the fun, simple, flexible JavaScript test framework*. [online] Available at: https://mochajs.org/ [Accessed 5 Sept. 2026].
- MongoDB (2023). *MongoDB documentation*. [online] Available at: https://www.mongodb.com/docs/ [Accessed 5 Sept. 2026].
- Mongoose (2024). *Mongoose ODM v5.8.2*. [online] Available at: https://mongoosejs.com/ [Accessed 5 Sept. 2026].
- OWASP (2021). *OWASP Top 10:2021*. [online] Available at: https://owasp.org/Top10/2021/ [Accessed 5 Sept. 2026].
- React (2024). *React documentation*. [online] Available at: https://react.dev/ [Accessed 5 Sept. 2026].
- Snyk (2024). *Snyk user documentation*. [online] Available at: https://docs.snyk.io/ [Accessed 5 Sept. 2026].

---

<p align="center">
  INSY7314 · Group 6 · 2026
</p>

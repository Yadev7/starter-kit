# 🚀 Production-Ready NestJS SaaS Starter Kit

<p center="align">
  <b>An enterprise-grade, battle-tested, and secure NestJS Boilerplate</b><br>
  Save 40+ hours of setup and kickstart your next SaaS product in minutes!
</p>

---

## 🌟 Overview

Building a SaaS requires a rock-solid foundation. This Starter Kit provides everything you need—from **JWT Authentication with Refresh Token Rotation** and **Role-Based Access Control (RBAC)** to **Prisma ORM integration** and **Production-Ready Security (Helmet & Rate Limiting)**.

Designed with clean architecture and scalable NestJS best practices.

---

## ✨ Key Features

* **🔐 Authentication & Session Management:**
  * JWT Access Tokens (Short-lived) & Refresh Tokens (Long-lived & Hashed).
  * Secure password hashing using `bcrypt`.
  * Automatic token rotation and revocation on logout.
* **🛡️ Role-Based Access Control (RBAC):**
  * Pre-configured roles: `ADMIN`, `USER`, `PROVIDER`.
  * Custom `@Roles()` decorator and `RolesGuard`.
* **🗄️ Database & ORM:**
  * **PostgreSQL** ready with **Prisma ORM**.
  * Pre-configured migrations and schema setups.
* **⚡ Enterprise Security:**
  * **Rate Limiting / Throttling:** Brute-force attack protection via `@nestjs/throttler`.
  * **HTTP Security Headers:** Protected against common vulnerabilities using `helmet`.
  * Global Validation Pipes for strict Request DTO validation.
* **📖 Interactive API Documentation:**
  * Full OpenAPI / **Swagger UI** configured out-of-the-box (`/api/docs`).

---

## 🏗️ Project Architecture

```text
src/
├── common/             # Global Decorators, Guards, and Utilities
│   ├── decorators/     # Custom decorators (@Public, @Roles, @GetCurrentUser)
│   └── guards/         # Security guards (AtGuard, RtGuard, RolesGuard)
├── modules/            # Domain Modules
│   └── auth/           # Complete Auth System (Controllers, Services, Strategies)
├── prisma/             # Prisma Database Service & Config
├── app.module.ts       # Root Application Module
└── main.ts             # Application Entrypoint & Middleware Setup


🚀 Getting Started1. PrerequisitesEnsure you have the following installed on your machine:Node.js: v18+npm: v9+PostgreSQL Database2. InstallationClone or download the project, then install dependencies:Bashnpm install
3. Environment ConfigurationCreate a .env file in the root directory and update the credentials:Extrait de code# Server Config
PORT=3000

# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/saas_db?schema=public"

# JWT Secrets
AT_SECRET="your-super-secret-access-token-key"
RT_SECRET="your-super-secret-refresh-token-key"
4. Database SetupPush the Prisma schema to your database:Bashnpx prisma db push
(Optional) Launch Prisma Studio to manage database records visually:Bashnpx prisma studio
5. Running the ApplicationBash# Development mode with Hot-Reload
npm run start:dev

# Production build & execution
npm run build
npm run start:prod
Once running, access the API at http://localhost:3000/api/v1.🌐 API Reference & EndpointsMethodEndpointAccessDescriptionGET/api/docsPublicInteractive Swagger API DocumentationGET/api/v1/healthPublicSystem Health CheckPOST/api/v1/auth/local/signupPublicRegister a new userPOST/api/v1/auth/local/signinPublicAuthenticate user & receive tokensPOST/api/v1/auth/refreshRefresh TokenIssue new Access & Refresh Token pairPOST/api/v1/auth/logoutBearer TokenRevoke session & invalidate Refresh TokenGET/api/v1/admin-only-dataAdmin OnlyProtected route example for RBAC testing🛡️ Security Features OverviewBrute-Force Protection: Rate limited to 10 requests per minute per IP address.Global Auth Guard: Every endpoint is protected by default unless explicitly marked with @Public().Data Sanitization: DTOs automatically strip unapproved properties from incoming requests.📄 LicenseCommercial License — Feel free to use this Starter Kit to build and monetize as many SaaS products as you like!
---

### 💡 أشنو تدير دابا؟
1. افتح ملف **`README.md`** فـ الجذر (Root) ديال المشروع واستبدل المحتوى ديالو بهاذ النص.
2. تأكد بلي عندك ملف **`.env.example`** كيشبه لفقرة الـ Environment Configuration.
3. مسح `node_modules` و `dist` وزيب (Zip) المشروع، وها المنتج ديالك واجد للرفع على Gumroad! 
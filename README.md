# SECURE - Next.js Authentication & User Management Platform

A fully-featured authentication and user management system built for SaaS applications, combining Next.js 14, NextAuth v5, and role-based access control (RBAC) with two-factor authentication for maximum security and flexibility.

---

## What is SECURE?

SECURE provides developers with a ready-to-use authentication stack, supporting email/password login, social OAuth, email verification, two-factor authentication, and admin/user role management.

It is designed for SaaS, marketplaces, and applications where security, scalability, and user experience are critical.

---

## Core Features

### Authentication

* NextAuth v5 (Auth.js) integration
* Next.js 14 with server actions support
* Credentials Provider (Email/Password login)
* OAuth Providers (Google & GitHub)
* Forgot password functionality
* Email verification after signup
* Two-factor authentication (2FA)

### User Roles & Permissions

* Role-based access control (Admin & User)
* RoleGate component for rendering content conditionally
* Protected API routes for admin-only access
* Protected server actions for secure admin functionality

### Components

* Login component (redirect or modal)
* Register component
* Forgot password component
* Verification component
* Error handling component
* Login button
* Logout button

### Utilities & Hooks

* useCurrentUser hook – Access the currently logged-in user
* useRole hook – Access and check user roles

  * currentUser utility
  * currentRole utility

### Examples & Use Cases

* Server component example
* Client component example
* Render content for admins using RoleGate
* Change email with new verification in Settings page
* Change password with old password confirmation in Settings page
* Enable/disable two-factor authentication in Settings page
* Change user role in Settings page (for development only)

---

## Tech Stack

* Frontend: Next.js 14 (SSR + Server Actions)
* Authentication: NextAuth v5
* Database: MySQL / PostgreSQL / MongoDB (configurable)
* Two-factor authentication & security: TOTP / Email verification

---

## Getting Started

### Requirements

* Node.js (LTS version)
* Next.js 14
* Database of your choice (MySQL/PostgreSQL/MongoDB)

### Installation

```bash
git clone https://github.com/your-username/SECURE.git
cd SECURE
npm install
```

### Configuration

Create a `.env` file in the root:

```env
DATABASE_URL=mysql://user:password@localhost:3306/secure
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-secret
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access SECURE.

---

## Contributing

Currently not accepting contributions, but feel free to fork and adapt for your own projects.

---

## License

MIT License – do what you want with it.

---

SECURE is built for developers who prioritize secure authentication, role management, and a professional user experience.

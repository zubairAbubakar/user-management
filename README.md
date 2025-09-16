# 🔐 User Management System

A comprehensive, secure user management system built with **Next.js 15**, **NextAuth.js v5**, **Prisma**, and **PostgreSQL**. This project provides enterprise-grade authentication features including email verification, two-factor authentication, role-based access control, and OAuth integration.

## ✨ Features

### 🔑 Authentication & Authorization

- **Multi-provider Authentication**: Email/Password, Google OAuth, GitHub OAuth
- **Email Verification**: Secure email confirmation with token-based verification
- **Two-Factor Authentication (2FA)**: TOTP-based 2FA for enhanced security
- **Password Reset**: Secure password reset flow with email tokens
- **Role-Based Access Control**: Admin and User roles with protected routes
- **Session Management**: JWT-based sessions with NextAuth.js v5

### 🛡️ Security Features

- **Account Linking**: Safe OAuth account linking for existing users
- **Password Hashing**: bcryptjs for secure password storage
- **Token-based Security**: Secure verification and reset tokens
- **Middleware Protection**: Route-level authentication middleware
- **Input Validation**: Zod schema validation for all forms

### 💻 User Experience

- **Responsive Design**: Mobile-first responsive UI with Tailwind CSS
- **Real-time Updates**: Optimistic UI updates and session refresh
- **Error Handling**: Comprehensive error pages and user feedback
- **Loading States**: Smooth loading indicators and transitions
- **Form Validation**: Real-time form validation with react-hook-form

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: NextAuth.js v5
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API for transactional emails
- **UI Components**: Radix UI primitives

### Project Structure

```
user-management/
├── app/                          # Next.js App Router
│   ├── (protected)/             # Protected routes group
│   │   ├── admin/              # Admin-only pages
│   │   ├── client/             # Client component demos
│   │   ├── server/             # Server component demos
│   │   └── settings/           # User settings page
│   ├── auth/                   # Authentication pages
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── error/              # Auth error handling
│   │   ├── email-verification/ # Email verification
│   │   ├── password-reset/     # Password reset request
│   │   └── new-password/       # New password creation
│   └── api/                    # API routes
│       ├── auth/               # NextAuth.js API routes
│       └── admin/              # Admin API endpoints
├── actions/                    # Server actions
│   ├── login.ts               # Login logic
│   ├── register.ts            # Registration logic
│   ├── settings.ts            # User settings updates
│   ├── email-verification.ts  # Email verification
│   ├── reset-password.ts      # Password reset
│   ├── new-password.ts        # New password setting
│   └── admin.ts               # Admin operations
├── components/                 # Reusable components
│   ├── auth/                  # Authentication components
│   ├── ui/                    # shadcn/ui components
│   └── ...                    # Other shared components
├── lib/                       # Utility libraries
│   ├── auth.ts               # Auth utilities
│   ├── db.ts                 # Database client
│   ├── mail.ts               # Email utilities
│   └── token.ts              # Token generation
├── prisma/                    # Database schema and migrations
│   └── schema.prisma         # Prisma schema
├── schemas/                   # Zod validation schemas
│   └── index.ts              # Form validation schemas
├── auth.ts                   # NextAuth.js configuration
├── auth.config.ts            # Auth providers configuration
├── middleware.ts             # Route protection middleware
└── routes.ts                 # Route definitions
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** database
- **npm/yarn/pnpm** package manager

### 1. Clone and Install

```bash
git clone <repository-url>
cd user-management
npm install
```

### 2. Environment Setup

Create `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/user_management"

# NextAuth.js
AUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email Service (Resend)
RESEND_API_KEY="your-resend-api-key"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed database
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Database Schema

### Core Models

- **User**: Main user entity with roles and 2FA settings
- **Account**: OAuth provider accounts linked to users
- **VerificationToken**: Email verification tokens
- **PasswordResetToken**: Password reset tokens
- **TwoFactorToken**: 2FA verification tokens
- **TwoFactorConfirmation**: 2FA confirmation records

### User Roles

- **USER**: Standard user with basic access
- **ADMIN**: Administrator with elevated permissions

## 🔐 Authentication Flow

### Registration Flow

1. User submits registration form
2. Server validates input and creates user
3. Verification email sent via Resend
4. User clicks verification link
5. Email verified, account activated

### Login Flow

1. User submits credentials
2. Server validates credentials
3. If 2FA enabled, request 2FA token
4. Session created and user redirected

### OAuth Flow

1. User clicks OAuth provider button
2. Redirected to provider authorization
3. Account linked or new user created
4. Session established

## 🛣️ Routes & Permissions

### Public Routes

- `/` - Landing page
- `/auth/email-verification` - Email verification

### Authentication Routes

- `/auth/login` - User login
- `/auth/register` - User registration
- `/auth/error` - Authentication errors
- `/auth/password-reset` - Password reset request
- `/auth/new-password` - New password creation

### Protected Routes

- `/settings` - User settings and profile
- `/client` - Client component examples
- `/server` - Server component examples
- `/admin` - Admin dashboard (Admin only)

### API Endpoints

- `/api/auth/*` - NextAuth.js authentication
- `/api/admin` - Admin operations

## 🎨 UI Components

Built with **shadcn/ui** and **Radix UI**:

- Form components with validation
- Loading states and spinners
- Error and success messages
- Responsive navigation
- Modal dialogs
- Card layouts
- Badge components

## 📧 Email Integration

### Email Types

- **Verification emails**: Account activation
- **Password reset emails**: Secure password reset
- **Two-factor tokens**: 2FA codes

### Email Provider

- **Resend API**: Modern email delivery service
- Custom email templates
- Delivery tracking and monitoring

## 🔒 Security Best Practices

- **Password Hashing**: bcryptjs with salt rounds
- **Input Validation**: Zod schemas for all inputs
- **CSRF Protection**: Built-in NextAuth.js protection
- **Session Security**: Secure JWT configuration
- **Rate Limiting**: (Recommended for production)
- **Environment Variables**: Secure secret management

## 🧪 Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (recommended)
- **Husky**: Git hooks (recommended)

## 🚀 Deployment

### Environment Variables (Production)

```env
# Database (Production)
DATABASE_URL="your-production-database-url"

# NextAuth.js (Production)
AUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://yourdomain.com"

# OAuth (Production)
GOOGLE_CLIENT_ID="your-production-google-id"
GOOGLE_CLIENT_SECRET="your-production-google-secret"
GITHUB_CLIENT_ID="your-production-github-id"
GITHUB_CLIENT_SECRET="your-production-github-secret"

# Email (Production)
RESEND_API_KEY="your-production-resend-key"
```

### Deployment Platforms

- **Vercel**: Optimal for Next.js (recommended)
- **Netlify**: Alternative deployment option
- **Railway**: PostgreSQL + Next.js hosting
- **Docker**: Containerized deployment

### Production Checklist

- [ ] Set up production database
- [ ] Configure production OAuth apps
- [ ] Set up email service
- [ ] Configure environment variables
- [ ] Set up monitoring and logging
- [ ] Configure domain and SSL
- [ ] Set up database backups

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the code comments and this README
- **Issues**: Open GitHub issues for bugs and feature requests
- **Community**: Join discussions in GitHub Discussions

---

**Built with ❤️ using Next.js, NextAuth.js, and modern web technologies.**

# Cypress FE

A modern web application built with **Next.js 15**, **React**, **TypeScript**, and **Tailwind CSS**. The project follows a **Feature-Based Architecture**, organizing business logic into independent modules while keeping shared resources centralized. This structure improves scalability, maintainability, and code organization for large-scale applications.

---

# Getting Started

Install project dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev
```

Open your browser at:

```
http://localhost:3000
```

The application will automatically reload whenever source files are modified.

---

# Project Structure

```text
CYPRESS_FE/
│
├── app/                 # Next.js App Router
├── modules/             # Business features (Auth, Booking, Payment, ...)
├── components/          # Shared UI components
├── providers/           # Global Providers
├── store/               # Global State Management
├── lib/                 # Library Configurations
├── config/              # Application Configurations
├── constants/           # Global Constants
├── hooks/               # Shared Custom Hooks
├── types/               # Global Type Definitions
├── utils/               # Shared Utility Functions
├── styles/              # Global Styles
├── public/              # Static Assets
│
├── middleware.ts
├── package.json
└── README.md
```

---

# Architecture

The project adopts a **Feature-Based Architecture**, where each business domain is organized into its own module.

Example:

```text
modules/
│
├── auth/
│   ├── api/
│   ├── services/
│   ├── hooks/
│   ├── components/
│   ├── schemas/
│   ├── types/
│   └── index.ts
│
├── booking/
│   ├── api/
│   ├── services/
│   ├── hooks/
│   ├── components/
│   ├── schemas/
│   ├── types/
│   └── index.ts
│
├── payment/
├── subscription/
├── profile/
└── shared/
```

Each feature encapsulates its own business logic, making the project easier to develop, maintain, and extend.

---

# Technologies

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- Zustand
- TanStack Query
- ESLint
- Prettier

---

# Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

# Deployment

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

The application can be deployed to:

- Vercel
- AWS
- Azure
- DigitalOcean
- Docker

---

# License

This project is intended for learning and internal development purposes.


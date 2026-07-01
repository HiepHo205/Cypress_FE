# Cypress FE

A modern web application built with **Next.js 15**, **React**, **TypeScript**, and **Tailwind CSS**. The project follows a **Feature-Based Architecture** combined with **Internationalization (i18n)** to support multiple languages while keeping business logic modular, scalable, and maintainable.

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

Open your browser:

```text
http://localhost:3000
```

The application automatically reloads whenever source files are modified.

---

# Project Structure

```text
CYPRESS_FE/
│
├── app/
│   ├── [locale]/              # Localized routes (Next.js App Router)
│   │   ├── (public)/          # Public pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── layout.tsx         # Locale layout
│   │   ├── page.tsx           # Home page
│   │   ├── loading.tsx        # Loading UI
│   │   ├── error.tsx          # Error page
│   │   └── not-found.tsx      # 404 page
│
├── messages/                  # Translation resources
│   ├── en.json                # English translations
│   └── vi.json                # Vietnamese translations
│
├── i18n/                      # Internationalization configuration
│   ├── config.ts
│   └── request.ts
│
├── modules/                   # Feature modules
│   ├── auth/
│   ├── booking/
│   ├── payment/
│   ├── subscription/
│   ├── service/
│   ├── blog/
│   ├── case-study/
│   ├── pricing/
│   ├── faq/
│   ├── contact/
│   ├── profile/
│   └── shared/
│
├── components/                # Shared UI Components
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── providers/                 # Global Providers
├── store/                     # Zustand Store
├── lib/                       # Library Configuration
├── config/                    # Application Configuration
├── constants/                 # Global Constants
├── hooks/                     # Shared Hooks
├── types/                     # Global Types
├── utils/                     # Utility Functions
├── styles/                    # Global Styles
├── public/                    # Static Assets
│
├── middleware.ts              # Locale & Route Middleware
├── package.json
└── README.md
```

---

# Feature Module Structure

Each business feature is organized independently.

Example:

```text
modules/
└── auth/
    ├── api/               # API requests
    ├── services/          # Business logic
    ├── hooks/             # Feature hooks
    ├── components/        # Feature UI
    ├── schemas/           # Zod validation schemas
    ├── types/             # TypeScript types
    └── index.ts           # Module exports
```

This architecture keeps each feature self-contained, making the project easier to maintain and extend.

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
- next-intl (Internationalization)
- ESLint
- Prettier

---

# Available Scripts

```bash
npm run dev      # Start development server

npm run build    # Build production bundle

npm run start    # Start production server

npm run lint     # Run ESLint
```

---

# Deployment

Build the project:

```bash
npm run build
```

Run the production server:

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
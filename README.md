#### Lumina Collective — E-Commerce Platform

A full-stack e-commerce web application built with **Next.js 15 (App Router)**, **TypeScript**, **Prisma ORM**, **PostgreSQL (Supabase)**, **Stripe**, and **Clerk**. 

**Live Demo:** https://next-ecommerce-sigma-red.vercel.app/ 

#### Tech Stack

- **Framework:** Next.js 15 (App Router, Server Actions, Route Handlers)
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL (Supabase), Prisma ORM
- **Authentication:** Clerk (with Svix Webhook Verification)
- **Payments:** Stripe (PaymentIntents & Webhooks)
- **State Management:** Zustand
- **Styling:** Tailwind CSS

#### Key Features & Implementation

- **Server-Side Checkout Calculation:** Calculates cart totals and shipping fees on the server using database prices (priceCents) to prevent client-side price tampering.
- **Stripe Payments & Webhooks:** Processes card payments via Stripe PaymentIntents and listens to payment_intent.succeeded webhooks (with signature verification) to create orders, clear checked cart items, and save the database orderId back to Stripe metadata.
- **Clerk Auth & Webhook Sync:** Uses Clerk for user authentication and verifies incoming Svix webhook signatures to sync new users into PostgreSQL via idempotent prisma.user.upsert() operations.
- **Database Integrity & Transactions:** Uses Prisma $transaction to handle order creation and cart cleanup atomically, and composite unique keys (userId, productId, color, size) to avoid duplicate cart entries.
- **Optimized Queries & UI State:** Uses Prisma select projections to fetch only required fields, and React 19 useOptimistic and useTransition hooks for responsive cart updates.

#### Getting Started

#### 1. Clone the repository

bash

git clone https://github.com/dev-dabid/next-ecommerce.git
cd next-ecommerce

Use code with caution.

Copy code text to clipboard.

#### 2. Install dependencies

bash

npm install

Use code with caution.

Copy code text to clipboard.

#### 3. Set up environment variables

Create a .env file in the root directory and add the following keys: 

env

DATABASE_URL="your_postgresql_connection_string"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
WEBHOOK_SECRET="your_clerk_svix_webhook_secret"
STRIPE_SECRET_KEY="your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

Use code with caution.

Copy code text to clipboard.

#### 4. Run database migrations & start the dev server

bash

npx prisma generate
npm run dev

Use code with caution.

Copy code text to clipboard.

Open http://localhost:3000 in your browser to view the app.

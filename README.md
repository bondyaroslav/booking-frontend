# Booking

Booking Frontend (Next.js + Stripe)

A production-ready booking frontend built with **Next.js (App Router)**, **TypeScript**, **Tailwind/shadcn-ui**, **Zustand** for state, and **Stripe Checkout** for payments. The app guides a user through booking (“Your details” → “Summary” → payment), redirects to Stripe Checkout, and then lands on a result screen (success/cancel/error), styled per the provided design.

---

## ✨ Features

- **Booking flow**: captures user details and creates a booking.
- **Summary & payment**: multiple payment buttons; Stripe Checkout redirect.
- **Result pages**: success, cancelled, generic error, and 404 screens.
- **Enterprise-grade UI**: shadcn/Button, Tailwind.
- **State management**: `zustand` store for cross-step data (email, bookingId, etc.).
- **API integration**: call your backend directly or via Next API routes.
- **Type-safe utilities**: strict types, forwardRef, a11y-minded components.

---

## 🧱 Tech Stack

- **Next.js** (App Router) + React
- **TypeScript**
- **Tailwind CSS** (+ shadcn/ui)
- **Zustand** (booking store)
- **Stripe Checkout** (redirect flow)
- **ESLint/Prettier** (optional but recommended)


### ENV Examle
```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

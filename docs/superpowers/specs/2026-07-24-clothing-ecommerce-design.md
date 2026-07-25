# Clothing E-commerce Design

## Goal
Build a responsive clothing e-commerce demo that covers customer shopping, membership, cart, checkout, payment selection, stock-aware ordering, and an admin dashboard for products, categories, inventory, and orders.

## Scope
- Customer storefront with product listing, filters, product detail, cart, checkout, and order confirmation.
- Frontend demo membership with login/register state stored locally.
- Admin dashboard for metrics, product/category management UI, stock overview, and order status management UI.
- Payment support as selectable demo methods: QR transfer, bank transfer, and cash on delivery.
- Inventory is reduced when an order is placed in the local demo state.

## Architecture
Use a single-page React app with local state and localStorage persistence. Data lives in focused modules for catalog seed data, cart/order helpers, and UI pages. This keeps the demo installable and easy to later replace with a real API, database, auth provider, and payment gateway.

## User Experience
The app opens directly to the shop experience. It uses a fashion retail visual style, responsive product grids, a mobile-friendly cart flow, and an admin area reachable from the navigation. Admin views prioritize dense, scannable tables and controls rather than marketing layout.

## Testing
Use Vitest for core behavior: cart totals, stock validation, order creation, and inventory deduction.

## Out of Scope For First Build
- Real payment gateway integration.
- Real backend, database, file upload, and password security.
- Multi-admin roles and production deployment.

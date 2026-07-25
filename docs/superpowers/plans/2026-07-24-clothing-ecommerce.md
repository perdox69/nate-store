# Clothing E-commerce Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive React clothing e-commerce demo with storefront, membership, cart, checkout, stock handling, payment options, and admin dashboard.

**Architecture:** A Vite React single-page app stores demo data in localStorage and isolates behavior in utility modules. UI state is coordinated in `App.jsx`, while cart/order rules are tested independently.

**Tech Stack:** React, Vite, Vitest, CSS modules via plain CSS, localStorage.

## Global Constraints

- Responsive on mobile and desktop.
- Include membership, product/category management, cart, ordering, payment selection, stock management, admin dashboard, and order management.
- Payment is demo-only with QR transfer, bank transfer, and cash on delivery.
- No real backend or payment gateway in this first build.

---

### Task 1: Project Scaffold And Core Tests

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles.css`
- Create: `src/data/catalog.js`
- Create: `src/lib/store.js`
- Create: `src/lib/ecommerce.js`
- Create: `src/lib/ecommerce.test.js`

**Interfaces:**
- Produces: `calculateCartTotals(items, products)`, `createOrder({ cartItems, products, customer, paymentMethod, shippingAddress })`, `applyOrderToInventory(products, order)`.

Steps:
- Write Vitest tests for cart totals, stock errors, order creation, and inventory deduction.
- Run tests and verify they fail because implementation is missing.
- Implement minimal data helpers and app scaffold.
- Run tests and verify they pass.

### Task 2: Storefront And Cart UI

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: catalog products/categories and cart helper functions.
- Produces: responsive storefront, filtering, product detail panel, and cart drawer.

Steps:
- Add customer navigation, hero/shop area, product grid, filters, size selection, and cart controls.
- Ensure stock and selected size are respected before adding to cart.
- Verify manually in desktop and mobile browser widths.

### Task 3: Checkout, Membership, And Orders

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `createOrder` and localStorage store helpers.
- Produces: login/register UI, checkout form, payment selection, local order persistence, inventory update.

Steps:
- Add account modal with register/login demo.
- Add checkout form for shipping address and payment method.
- On submit, create order, reduce inventory, clear cart, and show confirmation.
- Run tests and manual order flow.

### Task 4: Admin Dashboard

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: product/order/customer state.
- Produces: dashboard metrics, product/category tables, stock controls, and order status controls.

Steps:
- Add admin view with summary metrics.
- Add product table with editable price and stock.
- Add category summary and order management table.
- Verify responsive admin layout.

### Task 5: Final Verification

**Files:**
- Modify: `README.md`

Steps:
- Document setup, demo account behavior, admin features, and payment limitations.
- Run `npm test`.
- Start local dev server and provide URL.

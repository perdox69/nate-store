# Ari-style Sports Store Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the demo from a fashion store into a football/running sports store inspired by Ari Online functions.

**Architecture:** Keep the existing Vite React single-page app and localStorage demo backend. Replace catalog data, add sports-aware filtering helpers, and update the storefront sections/detail page to expose football categories, brands, pitch-surface options, sale badges, shop-the-look, brand blocks, and football guides.

**Tech Stack:** React, Vite, Vitest, localStorage.

## Global Constraints

- Keep membership, cart, checkout, stock, admin, and order handling working.
- Use local demo data only; no real Ari API, backend, or payment gateway.
- Do not copy Ari source code or branding assets; use an Ari-inspired sports retail structure.

---

### Task 1: Sports Catalog And Filters

**Files:**
- Modify: `src/data/catalog.js`
- Create: `src/lib/catalog.js`
- Create: `src/lib/catalog.test.js`

**Steps:**
- Add sports categories, popular searches, brands, surface types, guide articles, and football/running products.
- Add `filterProducts({ products, category, brand, query, priceRange })`.
- Test category, brand, query, and sale filtering.

### Task 2: Ari-style Storefront UI

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

**Steps:**
- Update brand copy to ARI SPORT.
- Add football/running navigation sections, popular search chips, brand filters, sale filters, shop-the-look, shop-by-brand, and guide cards.
- Update detail page to show brand, badge, surface type, old price, and sports size labels.

### Task 3: Verification

**Files:**
- Modify: `README.md`

**Steps:**
- Run `npm test`.
- Run `npm run build`.
- Verify the dev server responds at `http://localhost:5173`.

# DropOff — Landing Page Build Prompt

## Your Task

Build a production-ready landing page for **DropOff**, a lightweight SaaS product for small service repair businesses. The page's single job is to explain the value proposition clearly and capture an email address. Nothing else.

### Tech Stack

- **Framework:** SvelteKit with Svelte 5 Runes (`$state`, `$derived`, `$effect` — no legacy Options API)
- **Styling:** Tailwind CSS v4 + shadcn-svelte components
- **Fonts:** Google Fonts loaded via `<link>` in `app.html`

### Output Structure

```
src/
  routes/
    +page.svelte          ← main landing page
    +page.server.ts       ← form action (see Form Handling below)
  lib/
    components/
      WaitlistForm.svelte ← reusable email capture + shop type survey
      HowItWorks.svelte   ← the three-step flow section
      Nav.svelte
      Footer.svelte
```

Use SvelteKit **form actions** (not a raw `fetch`) for the waitlist submission. The `+page.server.ts` action should insert the email and optional shop type into the database via a server function call — stub the DB call with a `// TODO: replace with your db insert (e.g. Drizzle)` comment and return appropriate success/error responses. Progressive enhancement via `use:enhance` from `$app/forms` so the form works without JS and improves with it.

---

## Product Context

**What DropOff is:** A SaaS tool for small independent repair shops — tailors, dry cleaners, cobblers, jewelers, watch repair counters, bike shops — that digitizes order intake and gives customers a passive, no-login order tracking experience via SMS link.

**The core problem it solves:** When a customer drops off a garment, pair of shoes, or watch for repair, they have zero visibility until the shop calls them. Clerks waste time making reminder calls. Customers call the shop to check in. Both sides find it frustrating.

**The solution:** When a clerk takes in an order, they enter the customer's phone number and a description. The customer immediately gets an SMS with a link to a branded tracking page — like "track your package" but for their neighborhood tailor. When the order is ready, they get a second SMS. No app download. No account. Just a link.

**Who this is for:** Solo operators and small shops (1–5 staff) who are still on pen and paper. Not tech-savvy. Overwhelmed by existing tools like RepairDesk or Geelus, which are full POS systems. DropOff's wedge is radical simplicity — a shop owner should go from signup to sending their first tracking link in under 10 minutes.

**Differentiator vs. competitors:** Competitors (Geelus, RepairDesk, RepairShopr) are feature-heavy and complex. DropOff is dead simple. The customer tracking experience requires zero effort from the customer — no download, no login, just a link in a text message.

---

## Page Structure

### 1. Nav

- Logo / wordmark: "DropOff" (left-aligned)
- Single CTA button: "Join the waitlist" (right-aligned, links to `#waitlist`)
- Minimal — no nav links needed

### 2. Hero

The headline should name the pain, not describe the product. Target the shop owner who is still calling customers one by one. Options to consider (pick the strongest or write a better one):

- _"Stop calling customers to tell them their order is ready."_
- _"Your customers want to know if their order is done. Now they can check themselves."_
- _"Give every customer a tracking link. No app. No account. Just a text."_

Subheadline (1–2 sentences): clarify who this is for and what happens. Keep it plain and specific. Example: _"DropOff sends your customers an automatic SMS with a real-time status link the moment you take in their order. When it's ready, they get another text. You stop playing phone tag."_

CTA: email input + "Join the waitlist" button, centered below the subhead.

Below the CTA, include a subtle line listing the target verticals: _"Built for tailors · dry cleaners · cobblers · jewelers · watch repair · bike shops"_

**No hero image or mockup required.** The design should carry the weight here. If you want to include a visual element, use a simple animated or illustrated representation of the SMS/tracking flow — not a product screenshot (there's no product yet).

### 3. How It Works

Three steps. Keep the copy tight — one line per step, two max.

1. **Take in the order** — Enter the customer's name, phone, and what they dropped off. Takes under 60 seconds.
2. **Customer gets a text** — They receive an SMS with a link to track their order in real time. No app. No account.
3. **Mark it ready** — One click sends a "Your order is ready for pickup" text automatically.

### 4. Who It's For

A short section that makes the target customer feel seen. Call out the specific types of shops. Speak plainly — this is someone who may not consider themselves "a tech person." Something like:

> _"If you're running a tailor shop, shoe repair counter, dry cleaner, or jewelry bench and you're still tracking orders in a notebook — DropOff is for you. Setup takes 10 minutes. No training required."_

### 5. Waitlist CTA (the `#waitlist` anchor)

Repeat the email capture here. Heading: _"Be the first to know when we launch."_ Subtext: _"No spam. Just an update when DropOff is ready."_

Form fields: **email only**. After submit, show an inline confirmation message — no page redirect. Example: _"You're on the list. We'll be in touch."_

Below the form, add a single optional post-submit question: _"What kind of shop do you run?"_ — shown only after the email is captured. Radio buttons:

- Tailor / alterations
- Dry cleaner
- Shoe repair / cobbler
- Jewelry / watch repair
- Bike shop
- Other

This second step is low-stakes and shouldn't block the submission — make it visually feel optional.

### 6. Footer

- "DropOff" wordmark
- "© 2025 DropOff. All rights reserved."
- One line: contact email placeholder — `hello@getdropoff.com`
- No social links needed

---

## Form Handling

Use a **SvelteKit form action** — not a raw `fetch`. The form in `WaitlistForm.svelte` should POST to `?/joinWaitlist` using `use:enhance` for progressive enhancement.

### `+page.server.ts`

Define a `joinWaitlist` action that:

1. Parses `email` (required) and `shopType` (optional) from `formData`
2. Validates email format — return `fail(400, { error: 'Please enter a valid email address.' })` on bad input
3. Stubs the DB insert with a comment: `// TODO: replace with Drizzle insert — e.g. await db.insert(waitlist).values({ email, shopType, createdAt: new Date() })`
4. Returns `{ success: true }` on completion

### `WaitlistForm.svelte` (Svelte 5 Runes)

Manage UI state with `$state`:

```ts
let submitted = $state(false)
let loading = $state(false)
```

Use the `form` prop (typed as `ActionData`) to reactively read server responses. Drive the two-step UI — email input first, shop type survey revealed after `form?.success` — from this prop and local state.

Use `use:enhance` with a submit callback to:

- Set `loading = true` on submit start
- Set `loading = false` and `submitted = true` on completion

On success: show inline confirmation ("You're on the list. We'll be in touch.") and reveal the shop type question.
On error: show the server's error message inline below the form field — never a page redirect.

Use shadcn-svelte components: `<Input>`, `<Button>`, `<Label>`, `<RadioGroup>` / `<RadioGroupItem>` for the shop type step. Import from `$lib/components/ui/...`.

---

## Design Direction

**Aesthetic:** Clean, trustworthy, and unpretentious. This is a tool for tradespeople — people who work with their hands, run small shops, and don't have time for anything complicated. The design should feel approachable and direct, not slick or startup-y. Think: a well-designed receipt or a tasteful shop sign, not a VC-backed SaaS homepage.

**Color palette:**

- Background: off-white or warm white — not pure `#ffffff`, something with texture/warmth (e.g. `#FAF8F5`)
- Primary accent: a single muted, earthy tone — consider a deep slate blue (`#2C3E5D`), a warm charcoal, or a muted indigo. Not a bright tech-startup blue.
- CTA button: the accent color, high contrast
- Text: near-black (`#1A1A1A`) for body, slightly lighter for secondary text
- Avoid gradients, avoid glassmorphism, avoid dark mode toggle

**Typography:**

- Display / headline: a characterful serif or semi-serif. Consider loading from Google Fonts: _Playfair Display_, _Lora_, _DM Serif Display_, or _Fraunces_. The headline should feel like it belongs above a shop door.
- Body: a clean, readable sans-serif — _Inter_, _DM Sans_, or _Plus Jakarta Sans_
- Set a clear type scale. The hero headline should be large and confident (clamp between 2.5rem and 4rem). Body at 1rem–1.125rem with comfortable line-height (1.6–1.75).

**Signature element:** The "How It Works" flow should be visualized as a horizontal (desktop) / vertical (mobile) connector — like a timeline or receipt tape — with the three steps hung off it. This grounds the design in the physical world of receipts and order slips without being cliché.

**Motion:** Minimal. A subtle fade-in on scroll for sections is fine. No parallax, no heavy animations. Respect `prefers-reduced-motion`.

**Responsive:** Must work cleanly on mobile (375px+) and desktop (1200px+). The hero email capture should stack vertically on mobile.

---

## Code Quality Requirements

- **Svelte 5 Runes only** — no `$:`, no `export let` for props (use `$props()`), no Options API. All reactive state via `$state`, `$derived`, `$effect`.
- **Tailwind CSS v4** for all layout and spacing. Use Tailwind utility classes directly — no custom CSS files unless unavoidable. Extend the theme in `tailwind.config.ts` for brand colors and fonts rather than inline arbitrary values.
- **shadcn-svelte** for form controls (`Input`, `Button`, `Label`, `RadioGroup`). Don't rebuild what shadcn provides.
- Semantic HTML — `<main>`, `<section>`, `<nav>`, `<footer>` with `aria-label` where needed
- Keyboard accessible — visible focus styles (shadcn handles most of this), form fields correctly labelled
- `prefers-reduced-motion` respected — wrap any transitions/animations in a check or use Svelte's built-in `prefersReducedMotion`
- Svelte `<svelte:head>` in `+page.svelte` for: `<title>`, `<meta name="description">`, and Open Graph basics (`og:title`, `og:description`)
- Google Fonts `<link>` goes in `src/app.html`, not in a component
- Progressive enhancement: the waitlist form must work without JavaScript (native form POST), and improve with it via `use:enhance`

---

## Tone Notes for Copy

- Write for a shop owner, not a developer or investor
- Plain language — no jargon, no buzzwords ("streamline," "seamless," "leverage," etc.)
- Active voice throughout
- Specific over vague: "under 60 seconds" beats "fast and easy"
- The customer tracking experience is the magic — lean on "your customers get a text with a tracking link" as the core image

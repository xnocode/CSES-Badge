# CSES Profile Badge & Card Generator

[![CI Status](https://github.com/your-username/cses-readme-badge/workflows/CI/badge.svg)](https://github.com/your-username/cses-readme-badge/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready Next.js 15 application that dynamically generates stunning, responsive SVG statistics badges and profile cards for your **CSES (Computer Science Education Society)** profile. Ideal for displaying directly on your GitHub profile README or personal portfolio.

---

## 🚀 Live Demo & Generator
Deploy this project to your Vercel account and generate your custom codes instantly using the clean, interactive generator UI at the root path (`/`).

---

## 🏆 Visual Examples

### 1. Simple Badge
Customizable layout with total count, logo, percentage, and border styling.

```markdown
![CSES Badge](https://cses-readme-badge.vercel.app/api/badge?user=3&theme=github&style=modern)
```

### 2. Complete Profile Card
A statistics-rich layout showing solved count, submission history, language share, and category progress.

```markdown
![CSES Profile Card](https://cses-readme-badge.vercel.app/api/card?user=3&theme=dark&style=modern)
```

---

## 🛠 Query Parameters Reference

You can customize badges and cards by appending query parameters:

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `user` | `string` | **Required** | Your numeric CSES User ID (e.g. `3` from `cses.fi/user/3`). |
| `theme` | `light` \| `dark` \| `github` | `github` | Visual color palette theme. |
| `style` | `flat` \| `rounded` \| `modern` | `rounded` | Shape style (`modern` adds gradients, shadows, and loading animations). |
| `color` | `string` | Theme default | Custom accent color in hex format (e.g., `ff00ff`) or CSS color name. |
| `label` | `string` | `CSES` | Badge prefix text (Badge only). |
| `showTotal`| `boolean` | `true` | Display the denominator (e.g. `/400`) (Badge only). |
| `showPercent`| `boolean` | `true` | Display computed percentage completed. |
| `logo` | `boolean` | `true` | Include the stylized CSES grid icon (Badge only). |
| `solved` | `number` | Scraped value | Override solved count manually for customized profiles. |
| `submissions` | `number` | Scraped value | Override total submissions count manually. |

---

## ⚡ Deployment to Vercel

Deploying your own instance to Vercel takes less than a minute:

1. **Deploy using Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel
   ```
2. **Configure caching**:
   The API is built using Next.js route handlers. It returns premium headers:
   `Cache-Control: public, max-age=1800, s-maxage=1800, stale-while-revalidate=60`
   This caches profiles on Vercel's Edge CDN for 30 minutes, preventing rate-limiting on CSES while keeping statistics fresh.

---

## 🛠 Local Development

To run the application locally or contribute:

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the development server**:
   ```bash
   npm run dev
   ```
3. **Run unit tests**:
   ```bash
   npm test
   ```
4. **Format & Lint**:
   ```bash
   npm run lint
   npx prettier --write .
   ```

---

## 📝 MIT License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

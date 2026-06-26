# 📊 CSES GitHub Profile Badge & Card Generator

Showcase your **CSES (Computer Science Education Society)** competitive programming stats directly on your GitHub Profile README! This Next.js service dynamically scrapes only your public profile data to generate customizable, production-ready SVG badges and cards.

---

## 🚀 Quick Start (Add to your Profile)

Copy the Markdown code below, replace `YOUR_CSES_ID` (e.g., `3`) with your numeric CSES ID, and paste it into your GitHub profile README:

### 1. CSES Stats Card (Recommended)

Displays your total submissions count, first submission date, and your programming languages breakdown:

```markdown
[![CSES Stats Card](https://cses-readme-badge.vercel.app/api/card?user=YOUR_CSES_ID&theme=github&style=modern)](https://cses.fi/user/YOUR_CSES_ID)
```

### 2. CSES Submissions Badge

Displays a clean, compact badge showing your total submissions count:

```markdown
[![CSES Submissions Badge](https://cses-readme-badge.vercel.app/api/badge?user=YOUR_CSES_ID&theme=github&style=modern)](https://cses.fi/user/YOUR_CSES_ID)
```

---

## 🎨 Themes & Styles

Match your profile aesthetic with 10 curated themes and 3 different layout styles.

### Themes

`github` | `dark` | `light` | `ocean` | `sunset` | `emerald` | `rose` | `purple` | `nord` | `dracula`

### Styles

- `rounded` (Default) — Smooth rounded corners
- `modern` — Added gradients, subtle shadows, and a premium look
- `flat` — Sharp corners, clean design

---

## 🛠 Query Parameters Reference

Append these query parameters to `/api/badge` or `/api/card` to customize the output:

| Parameter | Type      | Default       | Description                                         |
| :-------- | :-------- | :------------ | :-------------------------------------------------- |
| `user`    | `string`  | **Required**  | Your numeric CSES User ID (e.g., `3`).              |
| `theme`   | `string`  | `github`      | Visual color palette theme.                         |
| `style`   | `string`  | `rounded`     | Shape style (`rounded`, `modern`, `flat`).          |
| `color`   | `string`  | Theme default | Custom accent color in hex format (e.g., `10b981`). |
| `label`   | `string`  | `CSES`        | Badge prefix text (Badge only).                     |
| `logo`    | `boolean` | `true`        | Include the stylized CSES grid icon (Badge only).   |

---

## ⚡ Deploy Your Own (Vercel)

You can easily deploy your own instance to Vercel in seconds:

1. Fork this repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import your fork.
3. Click **Deploy**.
4. Use your custom Vercel URL instead:
   `https://your-project.vercel.app/api/card?user=YOUR_CSES_ID`

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start local server
npm run dev

# Run unit tests
npm test

# Check linting and formatting
npm run lint
npm run format
```

---

## 📝 MIT License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

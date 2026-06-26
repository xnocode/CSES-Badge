# CSES Readme Badge & Card Generator

[![CI Status](https://github.com/your-username/cses-readme-badge/workflows/CI/badge.svg)](https://github.com/your-username/cses-readme-badge/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready Next.js 15 application that dynamically generates stunning SVG badges and profile cards for your **CSES** profile. Shows only publicly available data — no login required.

---

## 🚀 Live Demo & Generator

Deploy to Vercel and generate your custom badges instantly using the interactive UI at `/`.

---

## 🏆 Visual Examples

### Simple Badge

```markdown
![CSES Badge](https://your-app.vercel.app/api/badge?user=3&theme=github&style=modern)
```

### Profile Card

```markdown
![CSES Card](https://your-app.vercel.app/api/card?user=3&theme=dark&style=modern)
```

---

## 🎨 Available Themes

10 curated themes: `github` `dark` `light` `ocean` `sunset` `emerald` `rose` `purple` `nord` `dracula`

---

## 🛠 Query Parameters

| Parameter | Type                                                                                                           | Default       | Description                                     |
| :-------- | :------------------------------------------------------------------------------------------------------------- | :------------ | :---------------------------------------------- |
| `user`    | `string`                                                                                                       | _Required_    | Your numeric CSES User ID (e.g. `3`).           |
| `theme`   | `github` \| `dark` \| `light` \| `ocean` \| `sunset` \| `emerald` \| `rose` \| `purple` \| `nord` \| `dracula` | `github`      | Color palette theme.                            |
| `style`   | `flat` \| `rounded` \| `modern`                                                                                | `rounded`     | Shape style. `modern` adds shadows & gradients. |
| `color`   | `string`                                                                                                       | Theme default | Custom accent color (hex, e.g. `ff00ff`).       |
| `label`   | `string`                                                                                                       | `CSES`        | Badge prefix text (badge only).                 |
| `logo`    | `boolean`                                                                                                      | `true`        | Include CSES icon (badge only).                 |

### What data is shown (public CSES profile)

- **Total Submissions** — number of submissions made
- **First Submission** — date of first submission
- **Languages** — breakdown by programming language (card only)

---

## ⚡ Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repo → Deploy

Your live URL will be:

```
https://your-app.vercel.app/api/badge?user=YOUR_CSES_ID
```

---

## 🛠 Local Development

```bash
npm install
npm run dev       # Start dev server at localhost:3000
npm test          # Run unit tests
npm run lint      # Lint code
npm run format    # Format with Prettier
```

---
## 📝 MIT License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

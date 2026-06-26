# 📊 CSES GitHub Profile Badge & Card Generator

Showcase your **CSES (Computer Science Education Society)** competitive programming stats directly on your GitHub Profile README! This Next.js service dynamically scrapes only your public profile data to generate customizable, production-ready SVG badges and cards.

---

## 🚀 How to Use in your GitHub Profile

You don't need to configure or code anything to use this. Simply follow these steps:

### Step 1: Copy the Markdown Code

Choose either a complete statistics card or a compact badge:

#### Option A: CSES Profile Card (Recommended)

Displays your total submissions, first submission date, and programming languages breakdown:

```markdown
[![CSES Profile Card](https://cses-badge.vercel.app/api/card?user=YOUR_CSES_ID&theme=github&style=modern)](https://cses.fi/user/YOUR_CSES_ID)
```

#### Option B: CSES Submissions Badge

Displays a simple badge with your total submissions:

```markdown
[![CSES Submissions Badge](https://cses-badge.vercel.app/api/badge?user=YOUR_CSES_ID&theme=github&style=modern)](https://cses.fi/user/YOUR_CSES_ID)
```

### Step 2: Get Your CSES User ID

1. Log in to [cses.fi](https://cses.fi).
2. Click on your username in the top right to go to your profile.
3. Look at the URL in your browser. It will look like `https://cses.fi/user/12345/`.
4. Your **CSES User ID** is the number (e.g., `12345`).

### Step 3: Paste and Customize

Replace `YOUR_CSES_ID` in the markdown code with your actual CSES User ID, and paste it into your GitHub profile README file (`README.md`).

---

## 🎨 Theme & Style Previews

Customize the card or badge appearance to match your GitHub profile README design.

### Card Theme Previews

| Theme                | Preview                                                                                    |
| :------------------- | :----------------------------------------------------------------------------------------- |
| **Github** (Default) | ![Github Theme](https://cses-badge.vercel.app/api/card?user=3&theme=github&style=modern)   |
| **Dracula**          | ![Dracula Theme](https://cses-badge.vercel.app/api/card?user=3&theme=dracula&style=modern) |
| **Dark**             | ![Dark Theme](https://cses-badge.vercel.app/api/card?user=3&theme=dark&style=modern)       |
| **Ocean**            | ![Ocean Theme](https://cses-badge.vercel.app/api/card?user=3&theme=ocean&style=modern)     |
| **Sunset**           | ![Sunset Theme](https://cses-badge.vercel.app/api/card?user=3&theme=sunset&style=modern)   |
| **Emerald**          | ![Emerald Theme](https://cses-badge.vercel.app/api/card?user=3&theme=emerald&style=modern) |
| **Nord**             | ![Nord Theme](https://cses-badge.vercel.app/api/card?user=3&theme=nord&style=modern)       |

### Compact Badge Styles

| Style       | Preview                                                                                     |
| :---------- | :------------------------------------------------------------------------------------------ |
| **Modern**  | ![Modern Style](https://cses-badge.vercel.app/api/badge?user=3&theme=github&style=modern)   |
| **Rounded** | ![Rounded Style](https://cses-badge.vercel.app/api/badge?user=3&theme=github&style=rounded) |
| **Flat**    | ![Flat Style](https://cses-badge.vercel.app/api/badge?user=3&theme=github&style=flat)       |

---

## 🛠 Query Parameters Reference

Append these query parameters to `/api/badge` or `/api/card` to customize the output:

| Parameter | Type      | Default       | Description                                                                                            |
| :-------- | :-------- | :------------ | :----------------------------------------------------------------------------------------------------- |
| `user`    | `string`  | **Required**  | Your numeric CSES User ID (e.g., `3`).                                                                 |
| `theme`   | `string`  | `github`      | Palette: `github`, `dark`, `light`, `ocean`, `sunset`, `emerald`, `rose`, `purple`, `nord`, `dracula`. |
| `style`   | `string`  | `rounded`     | Shape layout: `rounded`, `modern`, `flat`.                                                             |
| `color`   | `string`  | Theme default | Custom accent color in hex format (e.g., `10b981`).                                                    |
| `label`   | `string`  | `CSES`        | Badge prefix text (Badge only).                                                                        |
| `logo`    | `boolean` | `true`        | Include the stylized CSES grid icon (Badge only).                                                      |

---

## 📝 MIT License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
****

# Contributing to CSES Readme Badge

Thank you for your interest in contributing to the **cses-readme-badge** project! We welcome all contributions to make this project better for the competitive programming community.

## Development Workflow

### 1. Requirements

- Node.js >= 20.x
- npm

### 2. Getting Started

Clone the repository, navigate to the directory, and install dependencies:

```bash
git clone https://github.com/your-username/cses-readme-badge.git
cd cses-readme-badge
npm install
```

### 3. Running Locally

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` to access the interactive badge and card builder.
You can hit the endpoints at `/api/badge?user=3` or `/api/card?user=3`.

### 4. Running Tests

Run the unit tests:

```bash
npm test
```

### 5. Formatting and Linting

To check and fix code formatting:

```bash
npm run lint
npx prettier --write .
```

## Pull Request Process

1. Fork the repository and create a new feature branch from `main`.
2. Ensure all unit tests pass and code is formatted.
3. Commit with clear, concise messages.
4. Submit a Pull Request describing your changes and verification steps.
5. Code reviews are required before merging.

Thank you for contributing!

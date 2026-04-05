# Contributing to Patrins OneClick

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to Patrins OneClick. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. Be kind, be respectful, and help us build an inclusive community.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [issue tracker](https://github.com/Perpelix/Patrins-OneClick/issues) as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment details** (Windows version, app version, etc.)

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:

- **A clear and descriptive title**
- **A detailed description of the proposed feature**
- **Why this feature would be useful**
- **Any examples of how it might work**

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following our style guidelines
3. **Test your changes thoroughly**
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit the pull request**

#### Pull Request Guidelines:

- Keep PRs focused on a single feature/fix
- Include relevant issue numbers in the PR description
- Update the README if you're adding features
- Make sure all tests pass (when we have tests set up)
- Follow the existing code style

## Development Setup

### Prerequisites

- Node.js 18+
- Rust (latest stable)
- Windows 10/11 (for development)

### Setup Steps

1. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Patrins-OneClick.git
   cd Patrins-OneClick
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Rust & Tauri CLI:**
   ```bash
   # Install Rust from https://rustup.rs/
   npm install -g @tauri-apps/cli
   ```

4. **Run in development mode:**
   ```bash
   npm run tauri dev
   ```

5. **Build for production:**
   ```bash
   npm run tauri build
   ```

## Style Guidelines

### TypeScript/React

- Use TypeScript for all new code
- Follow existing patterns in the codebase
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable names

### Rust

- Follow Rust standard style guidelines (`cargo fmt`)
- Run `cargo clippy` before submitting
- Write safe, idiomatic Rust
- Document complex functions

### General

- Use 2 spaces for indentation (JavaScript/TypeScript)
- Use 4 spaces for Rust
- No trailing whitespace
- End files with a newline

## Commit Messages

Write clear, concise commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests when relevant

### Examples:

```
Add WiFi password export feature

- Implement WiFi password retrieval
- Add encryption for stored passwords
- Update UI to show WiFi backup status

Fixes #123
```

```
Fix crash when scanning large directories

Resolves #456
```

## Areas We Need Help With

- 🧪 **Testing** - Writing tests for Rust and TypeScript code
- 📝 **Documentation** - Improving docs and adding code comments
- 🐛 **Bug Fixes** - Check the [issues](https://github.com/Perpelix/Patrins-OneClick/issues)
- ✨ **Features** - Implement features from the roadmap
- 🎨 **UI/UX** - Design improvements and accessibility
- 🌍 **Localization** - Help translate the app to other languages

## Questions?

Feel free to:
- Open an issue for discussion
- Reach out to the maintainers
- Check existing issues and PRs for similar questions

---

**Thank you for contributing to Patrins OneClick! Your help makes this project better for everyone.** 🚀

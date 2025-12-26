# Learning Management System (LMS) - Frontend

A modern, responsive Learning Management System built with React, TypeScript, and Vite, featuring role-based access control for students, librarians, and administrators.

## 🚀 Features

- **User Authentication**

  - Sign up, Sign in, and Password recovery
  - OTP verification
  - Role-based access control (Student, Librarian, Admin)

- **Role-Specific Dashboards**
  - Student portal for course enrollment and progress tracking
  - Librarian interface for resource management
  - Admin panel for user and system
- **Multi-Language Support (i18n)**
  - Support for multiple languages
  - Easy language switching
  - Persistent language preferences
  - Simple framework for adding new languages
- **Modern Tech Stack**
  - ⚡ Vite for fast development and building
  - ⚛️ React 19 with TypeScript for type safety
  - 🎨 TailwindCSS for utility-first styling
  - 🔄 Redux Toolkit for state management
  - 🛣️ React Router for navigation

## 🛠️ Prerequisites

- Node.js (v18 or later)
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone [your-repo-url]
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Available Scripts

### 🔧 Development

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

### 🧪 Testing

- `npm run test` - Run tests in watch mode
- `npm run test:ui` - Run tests with visual UI
- `npm run test:run` - Run tests once (CI/CD)
- `npm run test:watch` - Run tests in watch mode (explicit)
- `npm run test:coverage` - Generate coverage report
- `npm run test:coverage:ui` - Coverage report with UI- `npm run test` - Run tests

### 🧪 Testing Setup

This project uses **Vitest** and **React Testing Library** for comprehensive testing.

## Configure Vitest

- Create `vitest.config.ts` in project root
- Set test environment to `jsdom`
- Add setup files, globals, coverage options, and aliases

## Testing Stack

- Vitest – Fast unit & component testing.
- React Testing Library – UI testing focused on user behavior.
- jsdom – Browser-like test environment.
- @vitest/ui – Interactive test UI.
- @vitest/coverage-v8 – Code coverage reporting.
- jest-dom – Extended DOM matchers.

#### Install Testing Dependencies

```bash
npm install --save-dev vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom @vitest/coverage-v8 @vitest/ui
```

### Writing Tests

#### Test File Naming

- Component tests: `ComponentName.test.tsx`
- Place test files next to source files

### Running Tests

```bash
# Watch mode (recommended during development)
npm run test

# Run all tests once
npm run test:run

# Open visual test UI in browser
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Troubleshooting Tests

#### Tests Not Running

- Check `vitest.config.ts` exists in root
- Verify `setupFiles` path is correct
- Ensure test files end with `.test.tsx` or `.spec.tsx`

#### Coverage Not Generating

- Ensure `@vitest/coverage-v8` is installed
- Check `include` pattern matches your files
- Verify you have actual tests running

## 🎨 Styling

This project uses:

- TailwindCSS for utility-first styling
- Lucide React for icons
- Custom CSS modules for component-specific styles

## 🧩 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
│   ├── dashboard/  # Dashboard page
│   ├── signin/     # Sign in page
│   └── ...         # Other pages
├── role/           # Role-specific components
│   ├── admin/      # Admin components
│   ├── student/    # Student components
│   └── librarian/  # Librarian components
├── store/          # Redux store and API slices
└── utils/          # Utility functions
```

### Adding a New Language

1. **Create a new JSON file** in `/src/i18n/`

   - `en.json` is the **default (fallback) language**
   - All translation keys are defined in `en.json`

2. **Copy the same keys** into the new language file

   - **Do not change keys**
   - Change **only the translated values**

3. **Register the language** in `i18n/index.ts`

4. **Use translation keys in the UI**

   - No hard-coded strings
   - All text is rendered using translation keys

5. **Add a language switch option** in the UI
   - Selected language is persisted

#### Fallback & Missing Translation Behavior

- `en.json` acts as the **fallback language**
- If a translation key is missing in the selected language, the value from `en.json` is used automatically
- If a key is missing in all language files, the **key name itself** is rendered
- Ensures the UI never breaks due to missing translations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Commit Format (example)

#Feature - Add multi-language support using i18n
#Info - Update README with setup instructions
#Improvement

- Refactor user service to reduce duplication
  #Fix
- Resolve issue with user authentication
  #Test
- Add unit tests for login validation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Vite for the blazing fast development experience
- React and TypeScript teams for their amazing work
- All contributors who helped shape this project
- react-i18next for making internationalization simple

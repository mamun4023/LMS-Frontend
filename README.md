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
  - Admin panel for user and system management

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

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Commit Format (example)
  #Feature
    - Add multi-language support using i18n
  #Info 
    - Update README with setup instructions
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

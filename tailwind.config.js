export default {
  darkMode: "class", // This enables class-based dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    colors:{
      //These will use CSS variables defined below
      primary: 'var(--color-primary)',
      background: 'var(--color-background)',
      surface: 'var(--color-surface)',
      text:{
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
      },
      border: 'var(--color-border)'
    }
  }
},
  plugins: []
};

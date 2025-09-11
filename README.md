# Jharkhand Tourism - Clean & Responsive

A clean, responsive tourism website for Jharkhand with no fake data and mobile-first design.

## 🚀 Features

- ⚛️ **React 19** with TypeScript for type-safe development
- ⚡ **Vite** for lightning-fast development and builds
- 🎨 **Tailwind CSS** for utility-first styling
- 🎯 **shadcn/ui** components for modern UI design
- 🔧 **ReactBits** ready integration for advanced components
- 📱 **Responsive design** with mobile-first approach
- 🌙 **Dark/Light theme** support built-in
- 🚀 **Vercel deployment** ready

## 📦 Project Structure

```
├── src/
│   ├── components/
│   │   └── ui/           # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles with Tailwind
│   └── main.tsx          # Application entry point
├── components.json       # shadcn/ui configuration
├── tailwind.config.js    # Tailwind configuration
├── vite.config.ts        # Vite configuration
└── vercel.json           # Vercel deployment config
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Getting Started

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎨 UI Components

### shadcn/ui Integration

This project comes pre-configured with shadcn/ui components. The setup includes:

- ✅ Button component with variants
- ✅ Tailwind CSS custom variables
- ✅ Dark/light theme support
- ✅ Accessible components by default

### Adding New Components

To add more shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

Examples:
```bash
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

### ReactBits Integration

Ready for ReactBits components integration:

1. Browse components at [ReactBits.dev](https://reactbits.dev/)
2. Copy components into `src/components/`
3. Import and use in your application

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub repository**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Deploy automatically

3. **Environment Variables:**
   Set any required environment variables in Vercel dashboard.

### Build Settings
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

## 🎯 Development Tips

### File Organization
- Place reusable components in `src/components/`
- Use `src/lib/utils.ts` for utility functions
- Store types in `src/types/` (create as needed)
- Add pages in `src/pages/` for routing

### Styling Guidelines
- Use Tailwind utility classes
- Leverage CSS variables for theming
- Use shadcn/ui components for consistency
- Follow mobile-first responsive design

### Code Quality
- TypeScript strict mode enabled
- ESLint configuration included
- Follow React best practices
- Use proper component composition

## 📚 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [ReactBits Components](https://reactbits.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

## 🎨 Theme Customization

The project uses CSS variables for theming. Edit `src/index.css` to customize colors:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96%;
  /* ... other variables */
}
```

## 📱 Responsive Design

Built with mobile-first approach using Tailwind breakpoints:

- `sm:` - Small devices (640px+)
- `md:` - Medium devices (768px+)
- `lg:` - Large devices (1024px+)
- `xl:` - Extra large devices (1280px+)

---

Ready to build exceptional UI experiences! 🚀

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

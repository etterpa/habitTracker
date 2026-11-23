# React + TypeScript + Vite

original repository https://github.com/WebDevSimplified/react-habit-tracker/tree/main
original youtbe video https://www.youtube.com/watch?v=9aTRnV6g0eQ

## 🚀 Key Changes and Architecture Update

This application has been upgraded from using client-side storage (cookies) for persistence to utilize an **asynchronous mock database service**. All habit data is now persisted in a simulated backend, allowing for more robust state management and future integration with real databases.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:



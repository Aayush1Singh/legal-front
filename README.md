# KANUN-LegalAI

A modern, full-stack web application for secure, authenticated chat and Retrieval-Augmented Generation (RAG) workflows. Built with React, Vite, TypeScript, Redux, and Tailwind CSS, this project offers a robust, extensible platform for advanced query interfaces.

## Technologies Used

- **React**: For building dynamic, component-based user interfaces.
- **Vite**: For fast development server and optimized builds.
- **TypeScript**: Ensures type safety and better developer experience.
- **Redux**: Advanced state management for user, chat, and authentication flows.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **React Router**: For client-side routing and protected routes.

## SEO Implementation

- **SEO Component**: The project includes a dedicated `Seo.tsx` component to manage meta tags, titles, and descriptions for each page, improving search engine visibility.
- **Dynamic Metadata**: Page-specific metadata is set dynamically, ensuring relevant information for crawlers and social sharing.
- **Sitemap Generation**: Automated sitemap generation via scripts in the `scripts/` directory helps search engines index all important pages.
- **Performance**: Fast load times and optimized assets via Vite further boost SEO rankings.

## Why This Project is Unique

- **Seamless RAG Integration**: Designed for next-generation AI applications, enabling retrieval-augmented generation directly in the chat interface.
- **Enterprise-Ready Security**: Implements protected routes and robust authentication, ensuring only authorized users access sensitive features.
- **Component-Driven UI**: Highly modular, with reusable UI components and hooks for rapid feature development.
- **Modern Developer Experience**: Fast builds and hot reloads with Vite, strict type safety with TypeScript, and easy state management via Redux.
- **Customizable & Scalable**: Easily adapt the interface, authentication, and chat logic for your own use case or product.
- **Advanced State Management**: Utilizes Redux for predictable, centralized state management, making it easy to handle complex user, chat, and authentication flows across the app.

## Features

- 🔒 **Protected Routes**: Only authenticated users can access key pages, enforced via a custom `ProtectedRoute` component.
- 💬 **Chat Interface**: Real-time chat UI with message display, typing indicators, and file upload support.
- 🧠 **RAG Workflow**: Components and services designed for retrieval-augmented generation, ideal for AI-powered search and Q&A.
- 🎨 **Modern UI**: Built with Tailwind CSS and a library of reusable UI components for a beautiful, responsive experience.
- 🗂️ **State Management**: Redux-based user and chat state for predictable, scalable data flow.
- ⚡ **Fast & Easy Setup**: Powered by Vite for instant dev server start and lightning-fast builds.

## Project Structure

```
├── public/                # Static assets
│   ├── png-1.png
│   ├── png-2.png
│   ├── png-3.png
│   └── png-4.png
├── src/
│   ├── components/        # UI and app components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components (Home, Login, Signup, etc.)
│   └── services/          # API and state management (Redux)
├── ...
```

## App Screenshots

<p align="center">
  <img src="./public/png-1.png" alt="Document Analysis Storage" width="400"/>
  <br><b>Document Analysis Storage:</b> The app stores and organizes the analysis of legal documents for easy reference and review.
  <br><br>
  <img src="./public/png-2.png" alt="Context-Aware Assistant" width="400"/>
  <br><b>Context-Aware Assistant:</b> The assistant understands and leverages context from previous queries, providing more relevant and accurate responses.
  <br><br>
  <img src="./public/png-3.png" alt="Document Analysis Report" width="400"/>
  <br><b>Document Analysis Report:</b> Detailed reports are generated for each legal document, offering insights and structured information.
  <br><br>
  <img src="./public/png-4.png" alt="Similar Case Search" width="400"/>
  <br><b>Similar Case Search:</b> Instantly search for and discover similar legal cases, enhancing research and decision-making.
</p>

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Bun (if using bun.lockb)

### Installation

```sh
npm install
# or
bun install
```

### Running the App

```sh
npm run dev
# or
bun run dev
```

### Building for Production

```sh
npm run build
# or
bun run build
```

## License

MIT

---

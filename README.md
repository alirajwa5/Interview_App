# Qredentials - Your Secure QR Identity

Qredentials is a Next.js web application designed to manage user identities securely and provide personalized experiences through unique QR codes and AI-generated content. Users can register, log in, view their dashboard with account details, and receive a unique QR code tied to their user ID. The application also features an AI-powered component that generates an interesting fact for the user based on their profile information.

## Tech Stack

This project is built with a modern, robust tech stack:

*   **Frontend:**
    *   **Next.js 15+:** Leveraging the App Router, Server Components, and other modern Next.js features.
    *   **React 18+:** For building dynamic and responsive user interfaces.
    *   **TypeScript:** For static typing, enhancing code quality and maintainability.
    *   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
    *   **ShadCN UI:** Beautifully designed, accessible React components built on Tailwind CSS.
*   **Backend & AI:**
    *   **Firebase Authentication:** For secure user registration and login (Email/Password).
    *   **Genkit (by Google):** An open-source framework for building AI-powered features, used here with:
        *   **Google Gemini:** To generate unique user facts.
*   **Development & Tooling:**
    *   **npm:** Package manager.
    *   **ESLint & Prettier:** For code linting and formatting (implicitly configured).
    *   **Lucide React:** For icons.

## Key Features

*   **Secure User Authentication:** Email and password-based registration and login using Firebase Authentication.
*   **Personalized User Dashboard:** Displays user-specific information like email, join date, and a unique User ID.
*   **Unique QR Code Generation:** Generates a QR code based on the user's unique ID.
*   **AI-Powered Unique Fact:** Utilizes Genkit and Google Gemini to generate a personalized, interesting fact for the logged-in user.
*   **Responsive Design:** Adapts to various screen sizes for a seamless experience on desktop and mobile.
*   **Client-Side Routing:** Smooth navigation handled by Next.js.
*   **Loading States & Toasts:** Provides user feedback during operations.

## Project Structure Highlights

```
qredentials/
├── src/
│   ├── ai/                     # Genkit AI flows and configuration
│   │   ├── flows/
│   │   └── genkit.ts
│   ├── app/                    # Next.js App Router (pages, layouts, loading states)
│   │   ├── (auth)/             # Route group for auth pages (if used)
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── register/
│   │   ├── globals.css         # Global styles & ShadCN theme
│   │   └── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page (redirects)
│   ├── components/             # Reusable React components
│   │   ├── auth/               # Authentication-specific components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── layout/             # Layout components (e.g., Navbar)
│   │   ├── shared/             # General shared components
│   │   └── ui/                 # ShadCN UI components
│   ├── context/                # React Context (e.g., AuthContext)
│   ├── hooks/                  # Custom React hooks (e.g., useToast, useMobile)
│   ├── lib/                    # Utility functions, Firebase setup, type definitions
│   │   ├── firebase.ts
│   │   ├── types.ts
│   │   └── utils.ts
├── public/                     # Static assets
├── .env.example                # Example environment variables
├── next.config.ts              # Next.js configuration
├── package.json
└── tsconfig.json
```

## Setup and Running Locally

Follow these steps to get the project running on your local machine:

1.  **Prerequisites:**
    *   Node.js (v18 or later recommended)
    *   npm (comes with Node.js)

2.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd qredentials
    ```

3.  **Set up Firebase:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (or use an existing one).
    *   In your Firebase project, navigate to **Authentication** (under Build) and enable the **Email/Password** sign-in provider.
    *   Go to **Project settings** (click the gear icon next to "Project Overview") and find your Firebase SDK setup snippet. You'll need these web app configuration values:
        *   `apiKey`
        *   `authDomain`
        *   `projectId`
        *   `storageBucket`
        *   `messagingSenderId`
        *   `appId`

4.  **Set up Google AI (for Genkit):**
    *   Ensure you have a Google Cloud Project.
    *   In your Google Cloud Project, enable the **Vertex AI API** or **Generative Language API**. You can find these in the "APIs & Services" -> "Library" section.
    *   Authenticate your local environment for Google Cloud. The simplest way for local development is often using Application Default Credentials:
        ```bash
        gcloud auth application-default login
        ```
    *   Alternatively, you can create an API key in your Google Cloud project and set it as `GOOGLE_API_KEY` in your `.env` file.

5.  **Environment Variables:**
    *   Create a `.env` file in the root of the project by copying `.env.example`:
        ```bash
        cp .env.example .env
        ```
    *   Open the `.env` file and fill in your Firebase project credentials obtained in step 3. Also, if you're using an API key for Genkit, add it here.

    ```env
    # Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
    NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID

    # Genkit / Google AI Configuration (Optional, but required for AI features)
    # If using Application Default Credentials (gcloud auth application-default login),
    # GOOGLE_API_KEY is not strictly needed by Genkit for Gemini, but other Google services might.
    # If explicitly using an API Key for Genkit:
    # GOOGLE_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY
    ```

6.  **Install Dependencies:**
    ```bash
    npm install
    ```

7.  **Run the Development Servers:**
    *   **Next.js App (Frontend & Main Backend Logic):**
        ```bash
        npm run dev
        ```
        The application will be available at `http://localhost:9002`.

    *   **Genkit Development Server (for AI features, in a separate terminal):**
        ```bash
        npm run genkit:dev
        ```
        This starts the Genkit development environment, typically on `http://localhost:4000`.

8.  **Explore the App:**
    *   Navigate to `http://localhost:9002`.
    *   Register a new user or log in if you have an account.
    *   Explore the dashboard and see your QR code and AI-generated fact.

## Building for Production

To create a production build:
```bash
npm run build
```
This will generate an optimized version of your application in the `.next` folder. You can then deploy this build to a hosting provider like Vercel, Firebase Hosting, etc.

## Linting and Type Checking

*   **Lint:**
    ```bash
    npm run lint
    ```
*   **Type Check:**
    ```bash
    npm run typecheck
    ```

This README should give a good overview for anyone looking at the project.

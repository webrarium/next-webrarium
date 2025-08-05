# Next.js Project

This is a [Next.js](https://nextjs.org/) project using various third-party libraries and integrations to enhance functionality. This project incorporates content management, animations, form handling, and internationalization.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Features](#features)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [License](#license)

## Technologies Used

- [@calcom/embed-react](https://github.com/calcom/embed-react) `^1.4.0` - Embed Cal.com scheduling component.
- [@gsap/react](https://greensock.com/gsap/) `^2.1.0` - GreenSock Animation Platform for React.
- [@lottiefiles/lottie-player](https://github.com/LottieFiles/lottie-react) `^2.0.4` - Lottie animations.
- [@next/third-parties](https://github.com/vercel/next.js) `^14.2.2` - Official Next.js third-party plugins.
- [@storyblok/react](https://github.com/storyblok/storyblok-react) `^3.0.8` - Storyblok CMS integration.
- [@vercel/analytics](https://vercel.com/docs/concepts/analytics) `^1.3.1` - Vercel analytics for serverless apps.
- [@vercel/blob](https://vercel.com/docs/storage/vercel-blob) `^0.23.4` - Vercel Blob for file storage.
- ["@vercel/speed-insights](https://vercel.com/docs/speed-insights)" `^1.0.12` - Vercel Speed Insights provides you with a detailed view of your website's performance metrics, facilitating informed decisions for its optimization.
- [axios](https://axios-http.com/) `^1.7.3` - HTTP client for API requests.
- [next](https://nextjs.org/) `^14.2.13` - The React Framework for Production.
- [next-i18n-router](https://github.com/VicFrank/next-i18n-router) `^5.3.1` - i18n routing for Next.js.
- [nodemailer](https://nodemailer.com/) `^6.9.13` - Email sending service.
- [nookies](https://github.com/maticzav/nookies) `^2.5.2` - Cookie management for Next.js.
- [react](https://reactjs.org/) `^18.2.0` - JavaScript library for building user interfaces.
- [react-dom](https://reactjs.org/docs/react-dom.html) `^18.2.0` - React package for working with the DOM.
- [react-fast-marquee](https://www.react-fast-marquee.com/) `^1.6.4` - React Marquee component for animated scrolling.
- [react-google-recaptcha-v3](https://github.com/t49tran/react-google-recaptcha-v3) `^1.10.1` - Google ReCAPTCHA v3 component for React.
- [react-hook-form](https://react-hook-form.com/) `^7.51.2` - Performant form library for React.
- [storyblok-rich-text-react-renderer](https://www.storyblok.com/docs/rich-text) `^2.9.1` - Renderer for Storyblok's Rich Text field.

## Getting Started

To run this project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/markoleg/next-webrarium.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env.local` file and configure your environment variables.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Features

- **Storyblok Integration**: Use Storyblok CMS to manage content dynamically.
- **Internationalization**: Localization support with `next-i18n-router`.
- **Forms**: Form handling with `react-hook-form`, including Google reCAPTCHA for spam protection.
- **Animations**: GSAP and Lottie animations for enhanced UI/UX.
- **Email Support**: Email functionality via Nodemailer.
- **Vercel Integration**: Analytics and Blob storage via Vercel.

## Project Structure

/api - Apis

/components - Reusable components

/utils - Utility functions

/lib - Library

## Scripts

- `npm run dev`: Runs the development server.
- `npm run build`: Builds the project for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase.

## License

This project is licensed under the MIT License.

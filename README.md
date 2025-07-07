# Auth Dashboard App

A simple and responsive authentication project developed with **Next.js (App Router)**, **TypeScript**, and **SCSS Modules** .

---

## Task Overview

This project was completed based on the following requirements:

- Build a basic **authentication system** with two pages:
  - `/auth` – Login page with a phone number input and login button
  - `/dashboard` – Simple dashboard with a welcome message
- Fetch random user data from API and redirect after login
- Validate Iranian phone numbers
- Use **SCSS Modules** with **nesting**
- Ensure the layout is fully **responsive**
- Store user data using `localStorage`

---

## Features

- Built with **Next.js (App Router)**
- Developed in **TypeScript**
- Styled using **SCSS Modules** with nested class selectors
- Custom reusable **Input** and **Button** components
- Validates Iranian phone numbers (only frontend validation)
- Calls `https://randomuser.me/api/?results=1&nat=us` on login
- Stores user data in `localStorage`
- Redirects authenticated users to `/dashboard`
- Protects `/dashboard` route – redirects unauthenticated users to `/auth`
- Responsive layout for mobile and desktop


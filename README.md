# React Authentication UI with DummyJSON

This project is a modern React authentication UI featuring both Login and Signup pages, styled for a compact and elegant user experience. It uses [DummyJSON](https://dummyjson.com/) — a free fake REST API — to provide backend functionality and streamline development and testing without requiring a custom backend server.

## Features

- **Authentication:** Uses DummyJSON’s `/auth/login` endpoint for user authentication and token handling.
- **Signup:** Simulates user creation using DummyJSON’s `/users/add` endpoint. (Note: DummyJSON does not persist new users on the backend; your signup form demonstrates logic and UI only.)
- **Demo Credentials:** To test login, use credentials included in DummyJSON’s docs:
  - Username: `kminchelle`
  - Password: `0lelplR`
  - Or Email: `emily.johnson@x.dummyjson.com`
  - Password: `emilyspass`
- **Frontend:** Responsive React components with clean, minimal UI using Tailwind CSS utility classes.
- **No local backend required:** All data and user flows leverage DummyJSON’s online endpoints for instant testing.

## Usage

Replace dummy credentials with real ones as needed. This setup lets developers focus on UI and user flows with realistic placeholder data before building or connecting a real backend.

## Resources

- [DummyJSON API Documentation](https://dummyjson.com/docs)
- [DummyJSON Authentication Docs](https://dummyjson.com/docs/auth)

---

This project demonstrates clean authentication flows using a fake API in React, ideal for prototyping and learning.

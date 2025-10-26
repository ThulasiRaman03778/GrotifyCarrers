# Grotify Careers - Client

This is the frontend of the **Grotify Careers** Job Application Tracker, a full-stack MERN application that allows users to manage job applications with complete CRUD functionality. The frontend is built with **React**, **Tailwind CSS**, **GSAP** for animations, and **SVG** for custom graphics.

## Features

- **Home Page**: Welcomes users with an engaging interface and project overview.
- **Dashboard**: Displays a list of job applications with options to view, edit, or delete.
- **Job Management**:
  - **Job Form**: Add or edit job applications with validation for company name (min 3 chars), job title, application date (no future dates), and status.
  - **Job List**: Displays all job applications in a table with edit/delete options.
  - **Job Details**: View detailed information about a specific job application.
  - **Confirm Delete Modal**: Prompts user confirmation before deleting a job application.
- **Authentication**: Login and Register pages for user authentication.
- **Responsive Design**: Built with Tailwind CSS for a clean, user-friendly interface.
- **Animations**: GSAP used for smooth transitions and visual effects.

## Project Structure
```
client/
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration for Tailwind CSS
├── public/                   # Static assets
│   ├── favicon.ico
│   ├── index.html            # Main HTML file
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.css               # Global styles
│   ├── App.jsx               # Main App component
│   ├── App.test.js           # Test file for App
│   ├── Assets/               # Static assets like images and SVGs
│   │   ├── hiring-portal.png
│   │   └── loading.svg
│   ├── Components/           # Reusable React components
│   │   ├── AuthPage.jsx      # Wrapper for login/register
│   │   ├── Header.jsx        # Navigation bar
│   │   ├── Jobs/             # Job-related components
│   │   │   ├── ConfirmDeleteModal.jsx
│   │   │   ├── JobDetails.jsx
│   │   │   ├── JobForm.jsx
│   │   │   └── JobList.jsx
│   │   ├── Login.jsx         # Login form
│   │   ├── PrivateRoute.jsx  # Protects routes for authenticated users
│   │   ├── ProfileDropdown.jsx # User profile dropdown menu
│   │   └── Register.jsx      # Registration form
│   ├── Pages/                # Page components
│   │   ├── Dashboard.jsx     # Dashboard for job applications
│   │   └── Home.jsx          # Landing page
│   ├── ThemeContext.jsx      # Context for theme management
│   ├── UserContext.jsx       # Context for user authentication
│   ├── api.js                # API call utilities
│   ├── api.jsx               # Additional API-related components
│   ├── index.css             # Tailwind CSS imports and global styles
│   ├── index.js              # Entry point for React
│   ├── logo.svg              # Application logo
│   ├── reportWebVitals.js    # Performance monitoring
│   └── setupTests.js         # Testing setup
├── tailwind.config.js        # Tailwind CSS configuration
text## Prerequisites
```
- Node.js (v16 or higher)
- npm or yarn
- A running backend server (see `server/README.md`)

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd client

Install Dependencies:
bashnpm install

Create .env File:
In the client directory, create a .env file with:
env_API_URL=http://localhost:5000/api

Run the Application:
bashnpm run dev
The app runs on http://localhost:5173 (or the port specified by Vite).
Build for Production:
bashnpm run build


## Tools Used

React: Frontend library for building the UI.
Tailwind CSS: Utility-first CSS framework for styling.
GSAP: Animation library for smooth transitions and effects.
SVG: Used for custom graphics and icons.

## Notes

Ensure the backend server is running before starting the frontend.
The application uses Vite as the build tool for faster development.
Frontend validation is implemented using React form libraries (e.g., Formik or React Hook Form) and custom validation logic.

## Troubleshooting

If the app doesn't connect to the backend, verify the URL in the .env file.
Clear the browser cache if you encounter stale data issues.
Check the console for network or rendering errors.

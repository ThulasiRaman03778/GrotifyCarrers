# GrotifyCarrers

![Node.js](https://img.shields.io/badge/-Node.js-blue?logo=nodejs&logoColor=white)

## 📝 Description

Grotify Careers is a modern and intuitive job application tracker built using the MERN stack (MongoDB, Express.js, React, Node.js). This application empowers users to efficiently manage their job search process through a comprehensive suite of features, including Create, Read, Update, and Delete (CRUD) operations for seamless job application management. Security is paramount, with robust authentication protocols safeguarding user data. Input validation ensures data integrity and a smooth user experience. The responsive user interface, crafted with Tailwind CSS, provides an optimal viewing experience across all devices. Engaging GSAP animations and custom SVGs enhance the visual appeal and user interaction. The intuitive dashboard offers a centralized hub for managing job applications, with convenient edit and delete options, complemented by confirmation modals to prevent accidental data loss, making Grotify Careers an indispensable tool for anyone navigating the job market.

## 🛠️ Tech Stack

- ⬢ Node.js


## 📦 Key Dependencies

```
@fortawesome/fontawesome-free: ^7.1.0
@gsap/react: ^2.1.2
@heroicons/react: ^2.2.0
gsap: ^3.13.0
split-text: ^1.0.0
```

## 🚀 Run Commands

- **start**: `npm run start`
- **build**: `npm run build`
- **test**: `npm run test`
- **eject**: `npm run eject`


## 📁 Project Structure

```
.
├── client
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── App.test.js
│   │   ├── Assets
│   │   │   ├── hiring-portal.png
│   │   │   └── loading.svg
│   │   ├── Components
│   │   │   ├── AuthPage.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Jobs
│   │   │   │   ├── ConfirmDeleteModal.jsx
│   │   │   │   ├── JobDetails.jsx
│   │   │   │   ├── JobForm.jsx
│   │   │   │   └── JobList.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── ProfileDropdown.jsx
│   │   │   └── Register.jsx
│   │   ├── Pages
│   │   │   ├── Dashboard.jsx
│   │   │   └── Home.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── UserContext.jsx
│   │   ├── api.js
│   │   ├── api.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   └── tailwind.config.js
├── note
├── package.json
└── server
    ├── config
    │   └── db.js
    ├── controllers
    │   ├── authController.js
    │   └── jobController.js
    ├── middleware
    │   └── auth.js
    ├── models
    │   ├── JobApplication.js
    │   └── User.js
    ├── package.json
    ├── routes
    │   ├── auth.js
    │   └── jobRoutes.js
    └── server.js
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/ThulasiRaman03778/GrotifyCarrers/blob/main/client.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

---
*This README was generated with ❤️ by ReadmeBuddy*# GrotifyCarrers

![Node.js](https://img.shields.io/badge/-Node.js-blue?logo=nodejs&logoColor=white)

## 📝 Description

Grotify Careers is a modern and intuitive job application tracker built using the MERN stack (MongoDB, Express.js, React, Node.js). This application empowers users to efficiently manage their job search process through a comprehensive suite of features, including Create, Read, Update, and Delete (CRUD) operations for seamless job application management. Security is paramount, with robust authentication protocols safeguarding user data. Input validation ensures data integrity and a smooth user experience. The responsive user interface, crafted with Tailwind CSS, provides an optimal viewing experience across all devices. Engaging GSAP animations and custom SVGs enhance the visual appeal and user interaction. The intuitive dashboard offers a centralized hub for managing job applications, with convenient edit and delete options, complemented by confirmation modals to prevent accidental data loss, making Grotify Careers an indispensable tool for anyone navigating the job market.

## 🛠️ Tech Stack

- ⬢ Node.js


## 📦 Key Dependencies

```
@fortawesome/fontawesome-free: ^7.1.0
@gsap/react: ^2.1.2
@heroicons/react: ^2.2.0
gsap: ^3.13.0
split-text: ^1.0.0
```

## 🚀 Run Commands

- **start**: `npm run start`
- **build**: `npm run build`
- **test**: `npm run test`
- **eject**: `npm run eject`


## 📁 Project Structure

```
.
├── client
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── App.test.js
│   │   ├── Assets
│   │   │   ├── hiring-portal.png
│   │   │   └── loading.svg
│   │   ├── Components
│   │   │   ├── AuthPage.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Jobs
│   │   │   │   ├── ConfirmDeleteModal.jsx
│   │   │   │   ├── JobDetails.jsx
│   │   │   │   ├── JobForm.jsx
│   │   │   │   └── JobList.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── ProfileDropdown.jsx
│   │   │   └── Register.jsx
│   │   ├── Pages
│   │   │   ├── Dashboard.jsx
│   │   │   └── Home.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── UserContext.jsx
│   │   ├── api.js
│   │   ├── api.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   └── tailwind.config.js
├── note
├── package.json
└── server
    ├── config
    │   └── db.js
    ├── controllers
    │   ├── authController.js
    │   └── jobController.js
    ├── middleware
    │   └── auth.js
    ├── models
    │   ├── JobApplication.js
    │   └── User.js
    ├── package.json
    ├── routes
    │   ├── auth.js
    │   └── jobRoutes.js
    └── server.js
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/ThulasiRaman03778/GrotifyCarrers/blob/main/client.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

---
*This README was generated with ❤️ by ReadmeBuddy*

# Grotify Careers-MERN Stack Assessment – Job Application Tracker 🚀

![Node.js](https://img.shields.io/badge/-Node.js-blue?logo=nodejs&logoColor=white)

## 📝 Description

**Grotify Careers** is a modern and intuitive job application tracker built using the **MERN stack** (MongoDB, Express.js, React, Node.js). This application empowers users to efficiently manage their job search process through a comprehensive suite of features, including **Create, Read, Update, and Delete (CRUD)** operations for seamless job application management. Security is paramount, with robust authentication protocols safeguarding user data. Input validation ensures data integrity and a smooth user experience. The responsive user interface, crafted with **Tailwind CSS**, provides an optimal viewing experience across all devices. Engaging **GSAP animations** and custom SVGs enhance the visual appeal and user interaction. The intuitive dashboard offers a centralized hub for managing job applications, with convenient edit and delete options, complemented by confirmation modals to prevent accidental data loss, making **Grotify Careers** an indispensable tool for anyone navigating the job market.

Developed for **Gidy.ai** as part of the **MERN Stack Assessment – Job Application Tracker**.
## 🎥 Demo

🔗 **Live Demo:** [https://carrer.grotify.com)
## 🛠️ Tech Stack

- ⬢ **Node.js**
- ⚛️ **React**
- 🚀 **Express.js**
- 🍃 **MongoDB**
- 🎨 **Tailwind CSS**
- ✨ **GSAP (GreenSock Animation Platform)**

## 📦 Key Dependencies

```json
{
  "@fortawesome/fontawesome-free": "^7.1.0",
  "@gsap/react": "^2.1.2",
  "@heroicons/react": "^2.2.0",
  "gsap": "^3.13.0",
  "split-text": "^1.0.0"
}
```
## 🚀 Run Commands
```
Start: npm run start
Build: npm run build
Test: npm run test
Eject: npm run eject
```
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

Install Node.js (v18+ recommended):
bashnode -v

### Install dependencies:
```
cd client && npm install
cd ../server && npm install
```
### Start development servers:
```
Frontend:
bashcd client && npm start

Backend:
bashcd server && npm run dev
```
## Environment Variables
Create a .env file in the server directory:
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/grotify
JWT_SECRET=your_jwt_secret
```
📬 Contact
For inquiries, feedback, or support related to Grotify Careers, please reach out to the Gidy.ai team:

- ***Email***:``s.thulasiraman@gmail.com``
- ***Website***: https://gidy.ai
- ***GitHub Repository***: https://github.com/ThulasiRaman03778/GrotifyCarrers
- ***Issues***: https://github.com/ThulasiRaman03778/GrotifyCarrers/issues
- ***Support:*** Contact support@gidy.ai or open a GitHub issue.

## 📋 Important Information
## 📜 License
Grotify Careers is licensed under the MIT License. See the LICENSE file for details.
🌟 Features Implemented (MERN Stack Assessment Compliance)
The application meets all requirements of the Gidy.ai MERN Stack Assessment – Job Application Tracker:

### Add Job Application (Create)

- Fields: Company Name (required, min. 3 characters), Job Title (required), Application Date (required, no future dates), Status (Applied/Interview/Offer/Rejected).
- ***Validation***:

-Frontend: Real-time validation in JobForm.jsx using React state and error messages.
-Backend: jobController.js uses express-validator for input validation, returning 400 errors for invalid data.

UI: Tailwind CSS form with GSAP animations for submission feedback.


### View All Job Applications (Read All)

Display: JobList.jsx renders a responsive table/list with Company Name, Job Title, Application Date, and Status.
Actions: Edit/Delete buttons styled with @heroicons/react.
Responsive: Tailwind CSS ensures mobile-friendly design.


### View Single Job Details (Read One)

Details View: JobDetails.jsx displays full job details in a modal/page, with GSAP transitions.
Navigation: Uses React Router for seamless routing.


### Edit Job Application (Update)

- Form: JobForm.jsx pre-populates fields for editing, with frontend/backend validation.
- Feedback: GSAP animations and confirmation messages enhance UX.


### Delete Job Application (Delete)

- Prompt: ConfirmDeleteModal.jsx uses Tailwind CSS and @heroicons/react for a confirmation modal.
- Security: Backend route in jobRoutes.js ensures authenticated deletion.



## 🔒 Authentication & Security

- Authentication: JWT-based login/registration in authController.js and auth.js.
- Protected Routes: PrivateRoute.jsx restricts access to authenticated users.
- Data Security: MongoDB models (JobApplication.js, User.js) use input sanitization to prevent injection attacks.

## 🖼️ User Interface

- Responsive Design: Tailwind CSS (tailwind.config.js) ensures cross-device compatibility.
- Animations: GSAP (@gsap/react, split-text) for smooth transitions.
- Icons: @fortawesome/fontawesome-free and @heroicons/react for consistent visuals.
- Custom Assets: SVGs (hiring-portal.png, loading.svg) enhance branding.

## 🗂️ Project Organization

1.Structure: Clear separation of frontend (client) and backend (server).
2.Git: Hosted on GitHub with descriptive commits (e.g., feature/job-form, fix/auth-bug).
3.Code Quality: ESLint/Prettier configured in package.json.

## 🚀 Deployment

***Frontend***: Deploy to Vercel/Netlify using:
``cd client && npm run build``

***Backend***: Deploy to Render/Heroku, ensuring MongoDB connection in config/db.js.
CORS: Configured in server.js for secure frontend-backend communication.

## 🧪 Testing

1.Frontend: Jest/React Testing Library in App.test.js, setupTests.js. Run:
bashcd client && npm run test

 2. Backend: Mocha/Jest for API testing (authController.js, jobController.js).
E2E: Add Cypress for end-to-end testing (optional).

## 📈 Future Enhancements
```
Search & Filter: Add job search by status/company.
Analytics: Visualize application trends with Chart.js.
Notifications: Use Nodemailer for interview reminders.
Dark Mode: Implement via ThemeContext.jsx.
```
## 👥 Contributing
Contributions are welcome! Follow these steps:
```
Fork the repository:
bashgit clone https://github.com/ThulasiRaman03778/GrotifyCarrers.git

Create a branch:
bashgit checkout -b feature/your-feature

Commit changes:
bashgit commit -am 'Add some feature'

Push:
bashgit push origin feature/your-feature

Open a pull request on GitHub.
```
Ensure code follows style guidelines and includes tests.

##📜 MongoDB Schema

1.User Model (models/User.js):

```
javascriptconst userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});
```
2. Job Application Model (models/JobApplication.js):
```
javascriptconst jobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true, minlength: 3 },
  jobTitle: { type: String, required: true },
  applicationDate: { type: Date, required: true, max: Date.now },
  status: { type: String, enum: ['Applied', 'Interview', 'Offer', 'Rejected'], required: true },
});
```

## 🌐 API Endpoints
```
Auth Routes (routes/auth.js):

POST /api/auth/register: Register a user.
POST /api/auth/login: Login and return JWT.
```

## Job Routes (routes/jobRoutes.js):
```
POST /api/jobs: Create job application (authenticated).
GET /api/jobs: List all job applications.
GET /api/jobs/:id: Get single job application.
PUT /api/jobs/:id: Update job application.
DELETE /api/jobs/:id: Delete job application.

```

## 🎉 Acknowledgments

Gidy.ai: For the MERN Stack Assessment opportunity.
Open Source Community: For tools like React, Express, MongoDB, Tailwind CSS, and GSAP.
Contributors: All developers enhancing Grotify Careers.


Grotify Careers is a fully functional job application tracker built for Gidy.ai. For more details, visit https://gidy.ai or contact support@gidy.ai.

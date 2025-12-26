# 📸 SnapIt – A Social Platform for College Students

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge&logo=netlify)](https://snapitapp1.netlify.app)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)

SnapIt is a **full-stack social media platform** designed specifically for college students to share images of events, social clubs, and campus activities. Built with modern web technologies, it provides a **Pinterest-like experience** with features like infinite scrolling, user authentication, and content organization.

## 🚀 Key Features

### 🔐 Authentication System
- **User Registration & Login** with email/password validation
- **JWT-based Authentication** for secure sessions
- **Profile Management** with display pictures via Cloudinary

### 👤 User Profiles
- **Personal Profile Pages** with user information
- **Follow/Unfollow System** for building connections
- **Followers/Following Lists** with counts
- **Profile Picture Upload** with Cloudinary optimization
- **Profile Update** capabilities

### 📸 Content Management
- **Multi-Image Upload** with Cloudinary storage
- **Create, Edit & Delete Posts** with captions and tags
- **Infinite Scroll Feed** for content discovery
- **Individual Post Pages** with detailed views

### 💬 Social Interactions
- **Like System** with instant feedback
- **Comment System** for post discussions
- **Real-time Reactions** to posts

### 📁 Collections Feature
- **Create Collections** to organize posts by themes
- **Add/Remove Posts** from collections
- **Delete Collections** with cleanup
- **View All Collections** in grid layout

### 🔍 Discovery Features
- **Explore Page** for content discovery
- **Tag-based Browsing** for specific topics
- **User Profile Discovery** through following

### 📱 UI/UX Design
- **Mobile-First Design** built with Tailwind CSS
- **Responsive Layout** adapting to all screen sizes
- **Smooth Animations** using Framer Motion

### ⚡ Performance Features
- **Infinite Scrolling** with intersection observer
- **Redux State Management** for efficient data flow

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Hook Form** for form handling
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Cloudinary** for image storage
- **Multer** for file uploads
- **Bcrypt** for password hashing

### DevOps & Deployment
- **Netlify** for frontend deployment
- **MongoDB Atlas** for database
- **Cloudinary** for media storage

## 🏗️ Architecture & Design

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │   Express Backend│    │   MongoDB Atlas │
│   (Vite + Redux)│◄──►│   (Node.js API)  │◄──►│   (Database)    │
│                 │    │                 │    │                 │
│ - Components    │    │ - Controllers   │    │ - Users         │
│ - Pages         │    │ - Routes        │    │ - Posts         │
│ - State Mgmt    │    │ - Middleware    │    │ - Collections   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Cloudinary    │
                    │ (Image Storage) │
                    └─────────────────┘
```

### Database Schema
- **Users**: Profile info, authentication, followers/following
- **Posts**: Content, images, metadata, reactions, comments
- **Collections**: User-created groups for organizing posts
- **Comments**: Threaded conversation system

## 📁 Detailed Project Structure

```
SnapIt/
├── frontend/                          # React 18 + Vite frontend
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── common/              # Shared components (Navbar, Footer)
│   │   │   ├── core/                # Core features (Auth, Posts, Dashboard)
│   │   │   │   ├── Auth/            # Login, Signup, PrivateRoute
│   │   │   │   ├── Posts/           # PostCard, CreatePost, LoggedHomePage
│   │   │   │   └── Dashboard/       # User dashboard components
│   │   │   └── collections/         # Collection management
│   │   ├── pages/                   # Route-based page components
│   │   ├── services/                # API integration layer
│   │   │   ├── operations/          # Redux async thunks
│   │   │   └── apis.js             # Axios configuration
│   │   ├── slices/                  # Redux state slices
│   │   ├── reducer/                 # Redux store configuration
│   │   ├── AnimationsFile/          # Framer Motion animations
│   │   └── assets/                  # Static assets & images
│   ├── public/                      # Public static files
│   └── package.json                 # Dependencies & scripts
├── backend/                          # Node.js + Express backend
│   ├── controllers/                 # Business logic controllers
│   │   ├── userController.js       # User management
│   │   ├── postController.js       # Post operations
│   │   └── collectionController.js # Collection handling
│   ├── middlewares/                # Custom middleware
│   │   ├── isAuth.js              # JWT authentication
│   │   └── multer.js              # File upload handling
│   ├── model/                      # Mongoose data models
│   │   ├── userModel.js           # User schema
│   │   ├── postModel.js           # Post schema
│   │   └── collectionModel.js     # Collection schema
│   ├── routes/                     # API route definitions
│   ├── config/                     # Configuration files
│   │   ├── database.js            # MongoDB connection
│   │   └── cloudinary.js          # Cloudinary setup
│   ├── utils/                      # Utility functions
│   │   ├── generateToken.js       # JWT token generation
│   │   └── imageUploader.js       # Image processing
│   └── package.json                # Dependencies & scripts
└── README.md                        # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sahilpate-221s/SnapIt.git
cd SnapIt
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

4. **Environment Variables**

Create `.env` file in `backend/`:
```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Create `.env` file in `frontend/`:
```env
VITE_BASE_URL=http://localhost:4000/api/v1
```

5. **Run Development Servers**

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## 📸 API Endpoints

### Authentication
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `GET /api/v1/users/logout` - User logout
- `GET /api/v1/users/myProfile` - Get current user profile

### Users
- `GET /api/v1/users/:id` - Get user profile
- `PUT /api/v1/users/updateProfile` - Update user profile
- `POST /api/v1/users/follow/:id` - Follow/unfollow user
- `GET /api/v1/users/followersAndFollowing/:id` - Get followers/following

### Posts
- `POST /api/v1/posts/newPost` - Create new post
- `GET /api/v1/posts/allPosts` - Get all posts
- `GET /api/v1/posts/:id` - Get single post
- `PUT /api/v1/posts/update/:id` - Update post
- `DELETE /api/v1/posts/:id` - Delete post
- `POST /api/v1/posts/:id/comments` - Add comment
- `POST /api/v1/posts/:id/reactions` - React to post

### Collections
- `POST /api/v1/collections/createCollection` - Create collection
- `GET /api/v1/collections/all-Collections` - Get user collections
- `POST /api/v1/collections/:collectionId/posts` - Add post to collection
- `DELETE /api/v1/collections/:collectionId` - Delete collection


## 🚀 Deployment

### Frontend Deployment (Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to Netlify

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy the backend folder to services like:
   - Heroku
   - Railway
   - DigitalOcean

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact
For any questions or suggestions, please reach out to the project maintainers.

---

**SnapIt** - Connecting college students through shared moments and memories 📸

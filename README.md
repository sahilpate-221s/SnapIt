# 📸 SnapIt – A Social Platform for College Students

SnapIt is a full-stack social media platform designed specifically for college students to share images of events, social clubs, and campus activities. Built with modern web technologies, it provides a Pinterest-like experience tailored for the college community.

## 🌐 Live Demo
**Live Link:** https://snapitapp1.netlify.app

## 🚀 Key Features

### 🔐 Authentication & User Management
- **Secure Registration & Login** with email/password
- **JWT-based Authentication** with token refresh
- **Profile Management** with custom display pictures
- **Password Change** functionality
- **Account Deletion** option

### 👤 User Profiles
- **Personal Profile Pages** with user information
- **Follow/Unfollow System** for connecting with other students
- **Followers/Following Lists** with counts
- **Profile Picture Upload** with Cloudinary integration
- **Profile Update** capabilities

### 📸 Posts & Content Sharing
- **Image Upload** with Cloudinary storage
- **Create, Edit & Delete Posts**
- **Rich Post Details** with captions and tags
- **All Posts Feed** for discovering campus events
- **Individual Post Pages** with detailed views

### 💬 Social Interactions
- **Like System** for posts
- **Comment System** with nested comments
- **Real-time Reactions** to posts
- **Follow Notifications** for user connections

### 📁 Collections Feature
- **Create Collections** to organize posts by themes
- **Add Posts to Collections** for better organization
- **Remove Posts from Collections**
- **Delete Collections** when no longer needed
- **View All Collections** per user

### 🔍 Discovery & Search
- **Explore Page** for discovering new content
- **Tag-based Browsing** for specific topics
- **User Profile Discovery** through follows

### 📱 Responsive Design
- **Mobile-First Design** with Tailwind CSS
- **Responsive Layout** for all screen sizes
- **Modern UI/UX** with smooth animations

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
- **Docker** containerization
- **Netlify** for frontend deployment
- **MongoDB Atlas** for database
- **Cloudinary** for media storage

## 📁 Project Structure

```
SnapIt/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── slices/         # Redux slices
│   │   └── assets/         # Static assets
│   ├── public/             # Public files
│   └── Dockerfile          # Frontend container
├── backend/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middlewares
│   ├── model/             # Mongoose models
│   ├── routes/            # API routes
│   ├── config/            # Configuration files
│   ├── utils/             # Utility functions
│   └── Dockerfile         # Backend container
├── docker-compose.yml      # Docker orchestration
└── README.md              # Project documentation
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

### Docker Setup

1. **Build and run with Docker Compose**
```bash
docker-compose up --build
```

2. **Access the application**
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

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

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Profile creation and updates
- [ ] Image upload functionality
- [ ] Post creation, editing, and deletion
- [ ] Comment system
- [ ] Like/reaction system
- [ ] Follow/unfollow functionality
- [ ] Collection creation and management
- [ ] Responsive design on mobile devices

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

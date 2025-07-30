# SnapStudy - Interactive Learning Platform

SnapStudy is a comprehensive learning platform built with React.js and Node.js that helps students study smarter using AI-powered tools.

## Features

- **AI Quiz Generation**: Upload images or text to automatically generate quiz cards
- **Group Study**: Collaborate with peers in real-time study sessions
- **Multiple Choice Questions**: Practice with auto-generated MCQs
- **Bookmarks**: Save your favorite quiz cards for later review
- **PDF Export**: Download your quiz cards as PDF files
- **User Authentication**: Secure login with Google, GitHub, and email verification
- **Credit System**: Daily credit refresh for fair usage

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Vite
- React Router
- Material UI
- Framer Motion
- Ant Design

### Backend
- Node.js
- Express.js
- MongoDB
- Google Cloud Gemini AI
- JWT Authentication
- Socket.io
- Nodemailer
- Tesseract.js for OCR

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB database
- Google Cloud API key for Gemini AI

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm start
```

## Project Structure

### Frontend
```
frontend/
├── src/
│   ├── Components/
│   ├── Pages/
│   ├── Utils/
│   ├── Assets/
│   ├── UserScreensPage/
│   ├── AxiosInstance/
│   └── App.jsx
├── ReactBits/
└── package.json
```

### Backend
```
backend/
├── Routes/
├── Controllers/
├── Models/
├── Services/
├── Utils/
├── libs/
├── app.js
└── server.js
```

## Key Features in Detail

### AI Quiz Generation
- Upload study material as text or images
- AI processes content using Google Gemini
- Generates interactive quiz cards with multiple choice questions
- OCR support for extracting text from images

### Group Study Rooms
- Create or join study groups
- Real-time collaboration using Socket.io
- Share quiz cards with group members
- Group chat functionality

### Voice Features
- Voice input for questions
- Audio explanations for answers
- Hands-free learning experience

### User Management
- Multiple authentication methods (Google, GitHub, Email)
- Email verification system
- Password reset functionality
- User profile management

### Credit System
- Daily credit allocation for fair usage
- Automatic credit refresh using cron jobs
- Usage tracking and limits

## API Endpoints

### Authentication
- `POST /auth/google` - Google OAuth login
- `POST /auth/github` - GitHub OAuth login
- `POST /auth/magic` - Email-based authentication

### Quiz Management
- `POST /api/quiz/generate` - Generate quiz from text/image
- `GET /api/quiz/user` - Get user quiz cards
- `PUT /api/quiz/update` - Update quiz card
- `DELETE /api/quiz/delete` - Delete quiz card

### Room Management
- `POST /api/room/create` - Create study room
- `POST /api/room/join` - Join study room
- `POST /api/room/bookmark` - Bookmark quiz card

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License

## Support

For support or questions, please create an issue on GitHub or contact the development team.
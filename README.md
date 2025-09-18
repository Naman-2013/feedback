# Product Feedback System

This is a [Next.js](https://nextjs.org) project for collecting and managing product feedback with MongoDB integration.

## Features

- 🎯 **Lab-based Product Feedback**: Organize products by labs (Robotics & AI, VR/AR, IoT, Web & Blockchain)
- 💝 **Heart Rating System**: Interactive heart-based rating system
- 🎮 **Minecraft-themed UI**: Gamified interface with achievements and XP system
- 📊 **Real-time Feedback Collection**: Submit and view feedback instantly
- 🗄️ **MongoDB Integration**: Scalable database with proper data models

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Styling**: CSS Modules, Tailwind CSS
- **State Management**: React Context API

## Getting Started

### Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up MongoDB**:
   - Install MongoDB locally or set up MongoDB Atlas
   - Create a `.env.local` file with your MongoDB connection string:
     ```bash
     MONGODB_URI=mongodb://localhost:27017/feedback-app
     ```

3. **Migrate existing data** (if you have data in `db.json`):
   ```bash
   npm run migrate
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## MongoDB Setup

For detailed MongoDB setup instructions, see [MONGODB_SETUP.md](./MONGODB_SETUP.md).

## API Endpoints

- `GET /api/feedback` - Get all feedback entries
- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback/[tableId]` - Get feedback for a specific table
- `GET /api/labs` - Get all labs
- `POST /api/labs` - Create new lab

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

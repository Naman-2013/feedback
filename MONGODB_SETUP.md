# MongoDB Setup Guide

This project has been updated to use MongoDB instead of the JSON file system. Follow these steps to set up MongoDB for your project.

## Prerequisites

1. **Install MongoDB**: 
   - Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud-hosted MongoDB)

2. **Start MongoDB**:
   - If using local MongoDB: Start the MongoDB service
   - If using MongoDB Atlas: Get your connection string

## Environment Setup

1. **Create Environment File**:
   Create a `.env.local` file in the root directory with your MongoDB connection string:

   ```bash
   # For local MongoDB
   MONGODB_URI=mongodb://localhost:27017/feedback-app
   
   # For MongoDB Atlas (replace with your actual connection string)
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/feedback-app?retryWrites=true&w=majority
   ```

2. **Update Your Connection String**:
   - Replace `username` and `password` with your MongoDB Atlas credentials
   - Replace `cluster` with your actual cluster name
   - Ensure the database name is `feedback-app` (or change it in the connection string)

## Data Migration

To migrate your existing data from `db.json` to MongoDB:

1. **Run the Migration Script**:
   ```bash
   npm run migrate
   ```

   This will:
   - Connect to your MongoDB database
   - Clear existing collections (if any)
   - Import all labs and feedback data from `db.json`
   - Confirm successful migration

2. **Verify Migration**:
   After running the migration, you can verify the data by:
   - Checking your MongoDB database directly
   - Testing the API endpoints
   - Running the application

## API Endpoints

The following API endpoints are now available:

- `GET /api/feedback` - Get all feedback entries
- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback/[tableId]` - Get feedback for a specific table
- `GET /api/labs` - Get all labs
- `POST /api/labs` - Create new lab

## Project Structure

```
feedback/
├── lib/
│   └── mongodb.ts          # MongoDB connection utility
├── models/
│   ├── Feedback.ts         # Feedback data model
│   └── Lab.ts             # Lab data model
├── scripts/
│   └── migrate-to-mongodb.ts # Data migration script
├── src/app/api/
│   ├── feedback/
│   │   ├── route.ts       # Feedback API routes
│   │   └── [tableId]/
│   │       └── route.ts   # Table-specific feedback routes
│   └── labs/
│       └── route.ts       # Labs API routes
└── .env.local             # Environment variables (create this)
```

## Troubleshooting

1. **Connection Issues**:
   - Ensure MongoDB is running
   - Check your connection string in `.env.local`
   - Verify network access for MongoDB Atlas

2. **Migration Issues**:
   - Ensure MongoDB is accessible
   - Check that `db.json` exists and is readable
   - Review console output for specific error messages

3. **API Issues**:
   - Check MongoDB connection
   - Verify environment variables
   - Review server logs for detailed error messages

## Development

To start development with MongoDB:

1. Ensure MongoDB is running
2. Set up your `.env.local` file
3. Run the migration script if needed
4. Start the development server:
   ```bash
   npm run dev
   ```

## Production Deployment

For production deployment:

1. Set up MongoDB Atlas or a production MongoDB instance
2. Update the `MONGODB_URI` environment variable
3. Run the migration script in your production environment
4. Deploy your application

The application will automatically connect to MongoDB and use the database for all data operations.

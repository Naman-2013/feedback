import dotenv from 'dotenv';
import path from 'path';
import connectDB from '../lib/mongodb';
import Feedback from '../models/Feedback';
import Lab from '../models/Lab';
import fs from 'fs/promises';

// Load .env.local file
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function migrateData() {
  try {
    console.log('Starting data migration to MongoDB...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');
    
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Read the existing db.json file
    const dbPath = path.join(process.cwd(), 'db.json');
    const fileData = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(fileData);
    
    console.log('Read existing data from db.json');

    // Clear existing collections
    await Feedback.deleteMany({});
    await Lab.deleteMany({});
    console.log('Cleared existing collections');

    // Migrate labs data
    if (data.labs && data.labs.length > 0) {
      await Lab.insertMany(data.labs);
      console.log(`Migrated ${data.labs.length} labs to MongoDB`);
    }

    // Migrate feedback data
    if (data.feedback && data.feedback.length > 0) {
      await Feedback.insertMany(data.feedback);
      console.log(`Migrated ${data.feedback.length} feedback entries to MongoDB`);
    }

    console.log('Data migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateData();

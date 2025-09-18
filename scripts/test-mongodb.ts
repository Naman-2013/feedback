import dotenv from 'dotenv';
import path from 'path';
import connectDB from '../lib/mongodb';
import Feedback from '../models/Feedback';
import Lab from '../models/Lab';

// Load .env.local file
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function testMongoDB() {
  try {
    console.log('Testing MongoDB connection...');
    
    // Connect to MongoDB
    await connectDB();
    console.log('✅ Connected to MongoDB successfully');

    // Test Labs collection
    const labCount = await Lab.countDocuments();
    console.log(`✅ Labs collection: ${labCount} documents found`);

    // Test Feedback collection
    const feedbackCount = await Feedback.countDocuments();
    console.log(`✅ Feedback collection: ${feedbackCount} documents found`);

    // Test fetching labs
    const labs = await Lab.find({}).limit(1);
    if (labs.length > 0) {
      console.log(`✅ Sample lab: ${labs[0].labName} with ${labs[0].products.length} products`);
    }

    // Test fetching recent feedback
    const recentFeedback = await Feedback.find({}).sort({ timestamp: -1 }).limit(1);
    if (recentFeedback.length > 0) {
      console.log(`✅ Recent feedback: ${recentFeedback[0].studentName} rated ${recentFeedback[0].rating} stars`);
    }

    console.log('🎉 All MongoDB tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB test failed:', error);
    process.exit(1);
  }
}

testMongoDB();

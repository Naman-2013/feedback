import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Feedback from '../../../../models/Feedback';

export async function POST(request: Request) {
  try {
    console.log('API route received a POST request.');
    
    const newFeedback = await request.json();
    console.log('Received feedback:', newFeedback);

    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Create new feedback document
    const feedback = new Feedback(newFeedback);
    await feedback.save();
    console.log('Feedback saved to MongoDB successfully.');

    return NextResponse.json({ message: 'Feedback submitted successfully!' }, { status: 201 });
  } catch (error) {
    // This will log the detailed error to your server terminal
    console.error('API Route Error:', error);
    return NextResponse.json({ message: 'Error submitting feedback.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log('API route received a GET request.');
    
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Fetch all feedback
    const feedback = await Feedback.find({}).sort({ timestamp: -1 });
    console.log(`Retrieved ${feedback.length} feedback entries from MongoDB.`);

    return NextResponse.json(feedback, { status: 200 });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ message: 'Error fetching feedback.' }, { status: 500 });
  }
}
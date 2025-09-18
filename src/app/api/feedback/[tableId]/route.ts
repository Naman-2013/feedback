import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import Feedback from '../../../../../models/Feedback';

export async function GET(
  request: Request,
  { params }: { params: { tableId: string } }
) {
  try {
    const { tableId } = params;
    console.log(`API route received a GET request for tableId: ${tableId}`);
    
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Fetch feedback for specific table
    const feedback = await Feedback.find({ tableId }).sort({ timestamp: -1 });
    console.log(`Retrieved ${feedback.length} feedback entries for table ${tableId} from MongoDB.`);

    return NextResponse.json(feedback, { status: 200 });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ message: 'Error fetching feedback.' }, { status: 500 });
  }
}

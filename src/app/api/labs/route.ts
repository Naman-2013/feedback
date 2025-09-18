import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Lab from '../../../../models/Lab';

export async function GET() {
  try {
    console.log('API route received a GET request for labs.');
    
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Fetch all labs
    const labs = await Lab.find({});
    console.log(`Retrieved ${labs.length} labs from MongoDB.`);

    return NextResponse.json(labs, { status: 200 });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ message: 'Error fetching labs.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('API route received a POST request for labs.');
    
    const newLab = await request.json();
    console.log('Received lab data:', newLab);

    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Create new lab document
    const lab = new Lab(newLab);
    await lab.save();
    console.log('Lab saved to MongoDB successfully.');

    return NextResponse.json({ message: 'Lab created successfully!' }, { status: 201 });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ message: 'Error creating lab.' }, { status: 500 });
  }
}

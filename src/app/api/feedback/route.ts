import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

export async function POST(request: Request) {
  try {
    console.log('API route received a POST request.');
    
    const newFeedback = await request.json();
    console.log('Received feedback:', newFeedback);

    console.log('Reading database file from:', dbPath);
    const fileData = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(fileData);
    console.log('Current data read successfully.');

    data.feedback.push(newFeedback);
    console.log('New feedback pushed to data array.');

    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
    console.log('Successfully wrote updated data to db.json.');

    return NextResponse.json({ message: 'Feedback submitted successfully!' }, { status: 201 });
  } catch (error) {
    // This will log the detailed error to your server terminal
    console.error('API Route Error:', error);
    return NextResponse.json({ message: 'Error submitting feedback.' }, { status: 500 });
  }
}
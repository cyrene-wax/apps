export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import connectDB from '@/lib/mongodb';
import drivers from '@/models/drivers.model';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const data = await drivers.find();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 },
    );
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import connectDB from '@/lib/mongodb';
import drivers from '@/models/drivers.model';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const { rfidTag, ...data } = await req.json();

  try {
    connectDB();
    const res = await drivers.findOneAndUpdate({ rfidTag }, data, {
      new: true,
    });

    if (!res) {
      return NextResponse.json(
        { message: 'Driver not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Driver updated successfully', driver: res },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating driver:', error);
    return NextResponse.json(
      { message: 'Failed to update driver' },
      { status: 500 },
    );
  }
}

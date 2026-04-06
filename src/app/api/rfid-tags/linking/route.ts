export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import connectDB from '@/lib/mongodb';
import drivers from '@/models/drivers.model';
import rfidTags from '@/models/rfid-tags.model';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const { rfidTag } = await req.json();
  try {
    await connectDB();

    const driver = await drivers.findOne({ rfidTag });

    if (!driver) {
      return NextResponse.json(
        { message: 'Driver not found with this RFID tag' },
        { status: 404 },
      );
    }
    await rfidTags.updateOne({ rfidTag: rfidTag }, { status: 'assigned' });

    return NextResponse.json(
      { message: 'Driver Rfid Tag linked successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error linking driver:', error);
    return NextResponse.json(
      { message: 'Failed to link driver' },
      { status: 500 },
    );
  }
}

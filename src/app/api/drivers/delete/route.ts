export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import connectDB from '@/lib/mongodb';
import drivers from '@/models/drivers.model';
import rfidTags from '@/models/rfid-tags.model';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
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
    await drivers.findByIdAndDelete(driver._id);

    await rfidTags.updateOne({ rfidTag: rfidTag }, { status: 'available' });

    return NextResponse.json(
      { message: 'Driver deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting driver:', error);
    return NextResponse.json(
      { message: 'Failed to delete driver' },
      { status: 500 },
    );
  }
}

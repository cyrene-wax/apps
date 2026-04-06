export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import connectDB from '@/lib/mongodb';
import drivers from '@/models/drivers.model';
import rfidTags from '@/models/rfid-tags.model';
import { NextResponse } from 'next/server';

export async function DELETE() {
  try {
    await connectDB();

    const driversToDelete = await drivers.find({}, 'rfidTag').lean();
    const rfidTagList = driversToDelete.map((driver) => driver.rfidTag);

    const deleteResult = await drivers.deleteMany({});

    if (rfidTagList.length > 0) {
      await rfidTags.updateMany(
        { rfidTag: { $in: rfidTagList } },
        { status: 'available' },
      );
    }

    return NextResponse.json(
      {
        message: `Deleted ${deleteResult.deletedCount || 0} driver(s)`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting all Drivers:', error);
    return NextResponse.json(
      { message: 'Failed to delete all Drivers' },
      { status: 500 },
    );
  }
}

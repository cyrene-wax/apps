export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import connectDB from '@/lib/mongodb';
import rfidTags from '@/models/rfid-tags.model';
import { NextResponse } from 'next/server';

export async function DELETE() {
  try {
    await connectDB();

    const deleteResult = await rfidTags.deleteMany({});

    return NextResponse.json(
      {
        message: `Deleted ${deleteResult.deletedCount || 0} RFID tag(s)`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting all RfidTags:', error);
    return NextResponse.json(
      { message: 'Failed to delete all RfidTags' },
      { status: 500 },
    );
  }
}

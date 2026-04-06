export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import connectDB from '@/lib/mongodb';
import rfidTags from '@/models/rfid-tags.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { rfidTag, status } = await req.json();

  try {
    await connectDB();

    const tag = await rfidTags.create({
      rfidTag,
      status,
    });

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to add RFID tag',
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'RFID tag added successfully',
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add RFID tag. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

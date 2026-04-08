export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import connectDB from '@/lib/mongodb';
import drivers from '@/models/drivers.model';
import rfidTags from '@/models/rfid-tags.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { driverName, plateNumber, rfidTag, status, contactNumber, vehicleModel } =
    await req.json();

  try {
    await connectDB();

    const isRfidInUse = await drivers.findOne({ rfidTag });
    const isDrierWithThisPlateNumberExists = await drivers.findOne({
      plateNumber,
      driverName,
    });

    const isPlateNumberExists = await drivers.findOne({ plateNumber });
    switch (true) {
      case !!isRfidInUse:
        return NextResponse.json(
          {
            success: false,
            message: 'RFID tag is already in use',
          },
          { status: 400 },
        );
      case !!isDrierWithThisPlateNumberExists:
        return NextResponse.json(
          {
            success: false,
            message: 'Driver with this plate number already exists',
          },
          { status: 400 },
        );
      case !!isPlateNumberExists:
        return NextResponse.json(
          {
            success: false,
            message: 'Plate number is already registered to another driver',
          },
          { status: 400 },
        );
      default:
        break;
    }

    const tag = drivers.create({
      driverName,
      plateNumber,
      rfidTag,
      status,
      contactNumber,
      vehicleModel,
      registeredAt: new Date().toISOString(),
    });

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to register driver',
        },
        { status: 500 },
      );
    }
    await rfidTags.updateOne(
      { rfidTag: rfidTag },
      { $set: { status: 'assigned' } },
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Driver registered successfully',
      },
      { status: 201 },
    );
  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to register driver. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

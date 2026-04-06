export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import connectDB from '@/lib/mongodb';
import adminProfile from '@/models/admin.model';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const { username, data } = await req.json();

  if (!username || !data || typeof data !== 'object') {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }

  try {
    await connectDB();
    const res = await adminProfile.findOneAndUpdate({ username }, data, {
      new: true,
    });
    if (!res) {
      return NextResponse.json(
        { message: 'Admin Profile not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Admin Profile updated successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating admin profile:', error);
    return NextResponse.json(
      { message: 'Failed to update admin profile' },
      { status: 500 },
    );
  }
}

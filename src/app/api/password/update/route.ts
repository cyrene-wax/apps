export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import connectDB from '@/lib/mongodb';
import AdminProfile from '@/models/admin.model';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const { username, currentPassword, newPassword } = await req.json();

  if (
    !username ||
    typeof username !== 'string' ||
    !currentPassword ||
    typeof currentPassword !== 'string' ||
    !newPassword ||
    typeof newPassword !== 'string'
  ) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }

  if (newPassword.length < 6) {
    return NextResponse.json(
      { message: 'New password must be at least 6 characters' },
      { status: 400 },
    );
  }

  try {
    await connectDB();

    const admin = await AdminProfile.findOne({ username });
    if (!admin) {
      return NextResponse.json(
        { message: 'Admin account not found' },
        { status: 404 },
      );
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      admin.password,
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: 'Current password is incorrect' },
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    admin.password = hashedPassword;
    await admin.save();

    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      { message: 'Failed to update password' },
      { status: 500 },
    );
  }
}

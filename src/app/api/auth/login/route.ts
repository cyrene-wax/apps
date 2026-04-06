export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import {
  createAdmin,
  createSession,
  getAdminCount,
  verifyAdmin,
} from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, username, password } = await req.json();

    if (!username?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 },
      );
    }

    const count = await getAdminCount();

    if (count === 0) {
      await createAdmin(name, username, password);
      await createSession(username);
      return NextResponse.json({ success: true, firstSetup: true });
    }

    const valid = await verifyAdmin(username, password);
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid credentials. Please try again.' },
        { status: 401 },
      );
    }

    await createSession(username);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[LOGIN ERROR]', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}

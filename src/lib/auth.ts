import connectDB from '@/lib/mongodb';
import Admin from '@/models/admin.model';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'apps_session';

export async function getAdminCount(): Promise<number> {
  await connectDB();
  return Admin.countDocuments();
}

export async function createAdmin(
  name: string,
  username: string,
  password: string,
) {
  await connectDB();
  const hashed = await bcrypt.hash(password, 12);
  await Admin.create({ name, username, password: hashed });
}

export async function verifyAdmin(
  username: string,
  password: string,
): Promise<boolean> {
  await connectDB();
  const admin = await Admin.findOne({ username });
  if (!admin) return false;
  return bcrypt.compare(password, admin.password);
}

export async function createSession(username: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

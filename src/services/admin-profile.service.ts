import { AdminProfile } from '@/types';

async function getAdminProfile() {
  const res = await fetch('/api/profile/get', {
    method: 'GET',
  });
  return res;
}

async function updateAdminProfile({
  username,
  data,
}: {
  username: AdminProfile['username'];
  data: Partial<AdminProfile>;
}) {
  const res = await fetch('/api/profile/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, data }),
  });
  return res;
}

async function updatePassword({
  username,
  currentPassword,
  newPassword,
}: {
  username: AdminProfile['username'];
  currentPassword: string;
  newPassword: string;
}) {
  const res = await fetch('/api/password/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, currentPassword, newPassword }),
  });
  return res;
}

export { getAdminProfile, updateAdminProfile, updatePassword };

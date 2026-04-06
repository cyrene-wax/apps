async function loginAuth({
  name,
  username,
  password,
}: {
  name: string;
  username: string;
  password: string;
}) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, username, password }),
  });
  return res;
}

async function logoutAuth() {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
  });
  return res;
}

export { loginAuth, logoutAuth };

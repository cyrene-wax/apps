import { authService } from '@/services';

export function useLogoutAuth() {
  async function handleLogout() {
    try {
      const res = await authService.logoutAuth();
      if (!res.ok) throw new Error('Logout failed');
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
      alert('Logout failed. Please try again.');
    }
  }

  return { handleLogout };
}

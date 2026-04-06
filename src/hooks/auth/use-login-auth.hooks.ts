import { authService } from '@/services';
import { useState } from 'react';

export function useLoginAuth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFirstSetup, setIsFirstSetup] = useState(false);
  const [navigate, setNavigate] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authService.loginAuth({
        name: 'System Admin',
        username,
        password,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      if (data.firstSetup) setIsFirstSetup(true);
      setNavigate(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    isFirstSetup,
    handleLogin,
    navigate,
  };
}

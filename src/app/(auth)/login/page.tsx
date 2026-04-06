'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { images } from '@/constant/images';
import { useLoginAuth } from '@/hooks/auth/use-login-auth.hooks';
import { Eye, EyeOff, Lock, LogIn, User } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    isFirstSetup,
    handleLogin,
    navigate,
  } = useLoginAuth();
  const [showPassword, setShowPassword] = useState(false);

  if (navigate) {
    redirect('/dashboard');
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 p-6">
      <div className="absolute top-[-10%] left-[-10%] h-150 w-150 rounded-full bg-green-500/40 blur-[300px]" />
      <div className="absolute right-[-10%] bottom-[-10%] h-150 w-150 rounded-full bg-emerald-400/40 blur-[300px]" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 3px, transparent 2px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-green-500/20 blur-md" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/30 bg-gray-900">
              <Image src={images.logo} alt="Logo" className="h-10 w-10" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-[0.2em] text-white">
              A.P.P.S
            </h1>
            <p className="mt-0.5 text-xs font-medium tracking-wider text-gray-400">
              Automated Parking Positioning System
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-green-500/20 bg-green-500/10">
              <Lock className="h-3.5 w-3.5 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-black text-white">
                {isFirstSetup ? 'First Time Setup' : 'Admin Portal'}
              </p>
              <p className="text-[10px] text-gray-400">
                {isFirstSetup
                  ? 'Your credentials have been saved'
                  : 'Authorized access only'}
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                Username
              </Label>
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-600" />
                <Input
                  type="text"
                  placeholder="admin"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-xl border-white/10 bg-white/5 pl-9 text-sm font-semibold text-white placeholder:text-gray-600 focus:bg-white/10 focus-visible:ring-1 focus-visible:ring-green-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-600" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-white/10 bg-white/5 pr-10 pl-9 text-sm font-semibold text-white placeholder:text-gray-600 focus:bg-white/10 focus-visible:ring-1 focus-visible:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 transition-colors hover:text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5">
                <span className="text-sm">⚠️</span>
                <p className="text-xs font-semibold text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="mt-1 gap-2 rounded-xl bg-green-600 py-5 text-xs font-black tracking-wider hover:bg-green-500 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="h-3.5 w-3.5" />
                  Sign in to Dashboard
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-[10px] font-medium tracking-wider text-gray-400 uppercase">
          🔒 Protected · Authorized Admins Only
        </p>
      </div>
    </div>
  );
}

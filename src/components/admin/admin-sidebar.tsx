'use client';

import { images } from '@/constant/images';
import { useLogoutAuth } from '@/hooks/auth/use-logout-auth.hooks';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  LogOut,
  ParkingSquare,
  Settings,
  Tag,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    group: 'Main',
  },
  {
    label: 'Parking Map',
    href: '/dashboard/parking',
    icon: ParkingSquare,
    group: 'Main',
  },

  {
    label: 'All Drivers',
    href: '/dashboard/drivers',
    icon: Users,
    group: 'Drivers',
  },
  {
    label: 'RFID Tags',
    href: '/dashboard/rfid-tags',
    icon: Tag,
    group: 'System',
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    group: 'System',
  },
];

const groups = ['Main', 'Drivers', 'System'];

export function AdminSidebar() {
  const pathname = usePathname();
  const { handleLogout } = useLogoutAuth();

  return (
    <aside className="sticky top-20 h-fit w-52.5 shrink-0 rounded-2xl border border-green-200 bg-white p-4 shadow-sm">
      <div className="mb-5 flex items-center gap-2 border-b border-green-100 pb-4">
        <Image src={images.logo} alt="Logo" className="h-8 w-8" />
        <span className="text-sm font-black tracking-widest text-green-700">
          A.P.P.S.
        </span>
      </div>

      {groups.map((group) => (
        <div key={group} className="mb-1">
          <p className="mt-3 mb-1 px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            {group}
          </p>
          {navItems
            .filter((item) => item.group === group)
            .map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all',
                    active
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-500 hover:bg-green-50 hover:text-green-700',
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
        </div>
      ))}

      <button
        onClick={handleLogout}
        className="mt-4 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition-all hover:cursor-pointer hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </aside>
  );
}

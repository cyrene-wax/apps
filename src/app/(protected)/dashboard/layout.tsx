import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { images } from '@/constant/images';
import { getSession } from '@/lib/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }
  return (
    <div className="min-h-screen bg-green-50">
      <header className="sticky top-0 z-50 flex h-15 items-center justify-between border-b-2 border-green-200 bg-white px-6 shadow-sm">
        <div className="flex items-center gap-2.5">
          <Image src={images.logo} alt="Logo" className="h-10 w-10" />
          <span className="text-lg font-black tracking-[.15em] text-green-700">
            A.P.P.S.
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
          FIREBASE LIVE
        </div>
      </header>

      <div className="flex gap-5 p-5">
        <AdminSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

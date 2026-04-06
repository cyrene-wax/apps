import { icons } from '@/constant/icons';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-green-100 pb-24">
      <title>404 Not Found</title>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <Image
          width={0}
          height={0}
          className="h-60 w-60"
          src={icons.error}
          alt="404 not found"
        />
        <div className="items-left flex flex-col justify-center">
          <h2 className="text-center text-3xl font-medium md:text-start lg:text-start">
            Not Found
          </h2>
          <p className="mb-5 text-center text-sm md:text-start lg:text-start">
            Could not find requested resource
          </p>
          <Link
            className="text-center text-base text-blue-700 hover:underline md:text-start lg:text-start"
            href="/"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

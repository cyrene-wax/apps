import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isFeatureActive() {
  const expiry = new Date('2026-04-10T12:00:00+08:00');
  return new Date() < expiry;
}

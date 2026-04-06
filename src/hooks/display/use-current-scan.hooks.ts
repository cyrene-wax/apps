/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import database from '@/lib/firebase-config';
import type { CurrentScan } from '@/types';
import { onValue, ref } from 'firebase/database';
import { useEffect, useMemo, useState } from 'react';
import { useDrivers } from '../drivers/use-driver-details.hooks';

export function useCurrentScan() {
  const [scan, setScan] = useState<CurrentScan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scanRef = ref(database, 'plate-number-scanning/plateNumber');

    const unsubscribe = onValue(scanRef, (snapshot) => {
      setLoading(false);

      if (!snapshot.exists()) {
        setScan(null);
        return;
      }

      const value = snapshot.val();
      let latestScan: CurrentScan | null = null;

      if (typeof value === 'string') {
        const plate = value.trim();
        if (plate) {
          latestScan = {
            plateNumber: plate,
            scannedAt: new Date().toISOString(),
          };
        }
      } else if (value && typeof value === 'object') {
        if (
          'plateNumber' in value &&
          typeof (value as any).plateNumber === 'string'
        ) {
          latestScan = {
            plateNumber: (value as any).plateNumber,
            scannedAt:
              typeof (value as any).scannedAt === 'string'
                ? (value as any).scannedAt
                : new Date().toISOString(),
          };
        } else {
          const scans = Object.values(value as Record<string, CurrentScan>);
          latestScan =
            scans
              .filter(
                (s): s is CurrentScan =>
                  !!s && typeof s.plateNumber === 'string',
              )
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.scannedAt).getTime() -
                  new Date(a.scannedAt).getTime(),
              )[0] ?? null;
        }
      }

      setScan(latestScan);
    });

    return () => unsubscribe();
  }, []);

  return { scan, loading };
}

export function useDriverByPlate(plateNumber: string | null) {
  const { drivers, loading } = useDrivers();

  const driver = useMemo(() => {
    if (!plateNumber || !drivers.length) return null;

    const normalizedPlate = plateNumber.trim().toUpperCase();
    if (!normalizedPlate) return null;

    return (
      drivers.find(
        (d) => d.plateNumber.trim().toUpperCase() === normalizedPlate,
      ) ?? null
    );
  }, [drivers, plateNumber]);

  return { driver, loading };
}

import database from '@/lib/firebase-config';
import { State } from '@/types';
import { ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useCurrentScan } from './use-current-scan.hooks';

export function useVerifyCurrentScan() {
  const { scan } = useCurrentScan();
  const [state, setState] = useState<State>('idle');
  const [activePlate, setActivePlate] = useState<string | null>(null);

  const currentScanPathName = 'plate-number-scanning/plateNumber';
  const verificationPathName = 'verification/isRegistered';

  useEffect(() => {
    if (!scan?.plateNumber) return;

    queueMicrotask(() => {
      setActivePlate(scan.plateNumber);
      setState('scanning');
    });

    const t = setTimeout(() => setState('verified'), 200);
    return () => clearTimeout(t);
  }, [scan?.plateNumber, scan?.scannedAt]);

  useEffect(() => {
    if (state !== 'verified' && state !== 'not-registered') return;

    const t = setTimeout(async () => {
      try {
        await set(ref(database, currentScanPathName), '');
        if (state === 'verified') {
          await set(ref(database, verificationPathName), true);
        }
        setTimeout(() => {
          set(ref(database, verificationPathName), false);
        }, 10000);
      } catch (error) {
        console.error('Failed to clear plateNumber path:', error);
      }

      setState('idle');
      setActivePlate(null);
    }, 10000);

    return () => clearTimeout(t);
  }, [state]);

  return { state, activePlate, setState };
}

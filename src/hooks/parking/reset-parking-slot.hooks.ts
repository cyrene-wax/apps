import database from '@/lib/firebase-config';
import { get, ref, set } from 'firebase/database';
import { useState } from 'react';
import { toast } from 'sonner';

export function useResetParkingSlots() {
  const [resetting, setResetting] = useState(false);

  async function resetParkingSlots() {
    setResetting(true);

    try {
      const slotsRef = ref(database, 'parking-map');
      const snapshot = await get(slotsRef);

      if (!snapshot.exists()) {
        toast.error('No parking slot data found. Nothing to reset.');
        return false;
      }

      const existingSlots = snapshot.val();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resetData: Record<string, any> = {};

      Object.entries(existingSlots).forEach(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ([quadrant, quadrantData]: [string, any]) => {
          if (quadrantData && typeof quadrantData === 'object') {
            resetData[quadrant] = {};
            Object.keys(quadrantData).forEach((slotKey) => {
              resetData[quadrant][slotKey] = {
                isScanned: 'available',
                rfidTag: 'empty',
                time: '',
              };
            });
          }
        },
      );

      if (Object.keys(resetData).length === 0) {
        toast.error('No parking slots available to reset.');
        return false;
      }

      await set(slotsRef, resetData);
      window.location.reload();
      toast.success(
        'All parking slots have been reset to available successfully',
      );
      return true;
    } catch (error) {
      console.error('Error resetting parking slots:', error);
      toast.error('Failed to reset parking slots. Please try again.');
      return false;
    } finally {
      setResetting(false);
    }
  }

  return {
    resetParkingSlots,
    resetting,
  };
}

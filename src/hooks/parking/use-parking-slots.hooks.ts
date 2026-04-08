import database from '@/lib/firebase-config';
import { driverService } from '@/services';
import type { Driver, ParkingSlot } from '@/types';
import { onValue, ref } from 'firebase/database';
import React, { useState } from 'react';

export function useParkingSlots() {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [notParkedDrivers, setNotParkedDrivers] = useState<Driver[]>([]);

  async function getAllParkingSlots() {
    const slotsRef = ref(database, 'parking-map');

    const unsubscribe = onValue(slotsRef, async (snapshot) => {
      setLoading(false);

      const results = await driverService.getRegisteredDriver();
      const drivers = await results.json();

      if (!snapshot.exists()) {
        setSlots([]);
        setNotParkedDrivers([]);
        return;
      }

      const data = snapshot.val();
      const list: ParkingSlot[] = [];

      Object.entries(data).forEach(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ([quadrant, quadrantData]: [string, any]) => {
          if (quadrantData && typeof quadrantData === 'object') {
            Object.entries(quadrantData).forEach(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ([key, value]: [string, any]) => {
                const slotNumber = parseInt(key.replace('slot', ''));
                const slotRfidTag = String(value.rfidTag || '').trim();

                const driver = drivers.find((d: Driver) => {
                  if (!d.rfidTag || !slotRfidTag) return false;
                  return (
                    d.rfidTag.trim().toUpperCase() === slotRfidTag.toUpperCase()
                  );
                });

                list.push({
                  id: `${quadrant}-${key}`,
                  slotNumber,
                  quadrant,
                  status:
                    value.isScanned === 'occupied' ? 'occupied' : 'available',
                  driverName: driver?.driverName,
                  plateNumber: driver?.plateNumber,
                  rfidTag: slotRfidTag,
                  vehicleModel: driver?.vehicleModel,
                  contactNumber: driver?.contactNumber,
                  driverStatus: driver?.status,
                  time: value.time,
                  occupancy: value.isScanned === 'occupied' ? 1 : 0,
                });
              },
            );
          }
        },
      );

      // Sort by quadrant then by slot number
      list.sort((a, b) => {
        if (a.quadrant !== b.quadrant) {
          return a.quadrant.localeCompare(b.quadrant);
        }
        return a.slotNumber - b.slotNumber;
      });

      const occupiedRfidTags = new Set(
        list
          .filter(
            (slot) =>
              slot.status === 'occupied' &&
              slot.rfidTag &&
              slot.rfidTag !== 'N/A',
          )
          .map((slot) => slot.rfidTag?.trim().toUpperCase() ?? ''),
      );

      const availableDrivers = drivers.filter((d: Driver) => {
        if (!d.rfidTag) return true;
        return !occupiedRfidTags.has(d.rfidTag.trim().toUpperCase());
      });

      setNotParkedDrivers(availableDrivers);
      setSlots(list);
    });

    return () => unsubscribe();
  }

  React.useEffect(() => {
    getAllParkingSlots();
  }, []);

  const available = slots.filter((s) => s.status === 'available').length;
  const occupied = slots.filter((s) => s.status === 'occupied').length;

  return {
    slots,
    loading,
    available,
    occupied,
    notParkedDrivers,
  };
}

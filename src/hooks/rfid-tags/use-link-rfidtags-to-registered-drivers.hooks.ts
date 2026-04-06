'use client';

import { driverService, rfidTagService } from '@/services';
import type { Driver, RfidTag } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';

export function useLinkRfidTagsToRegisteredDrivers() {
  const [isLinking, setIsLinking] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);

  async function getAvailableDrivers() {
    setLoading(true);
    try {
      const res = await driverService.getRegisteredDriver();
      if (res.status === 200) {
        const data = await res.json();
        const driversWithoutTag = data.filter(
          (driver: Driver) => !driver.rfidTag,
        );
        setDrivers(driversWithoutTag);
        return driversWithoutTag;
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
      toast.error('Failed to fetch drivers');
    } finally {
      setLoading(false);
    }
  }

  async function checkIfRfidTagIsAvailable(rfidTag: string) {
    try {
      const res = await rfidTagService.getAllRfidTags();
      if (res.status === 200) {
        const tags = await res.json();
        const tagExists = tags.find(
          (t: RfidTag) =>
            t.rfidTag.trim().toUpperCase() === rfidTag.trim().toUpperCase(),
        );
        return !!tagExists;
      }
    } catch (error) {
      console.error('Error checking RFID tag availability:', error);
    }
    return false;
  }

  async function linkRfidTagToDriver(rfidTag: string) {
    setIsLinking(true);
    try {
      const tagExists = await checkIfRfidTagIsAvailable(rfidTag);
      if (!tagExists) {
        toast.error('RFID tag not found in the system');
        setIsLinking(false);
        return false;
      }

      const res = await rfidTagService.linkRfidTagToDriver({
        rfidTag,
      });

      if (res.status === 200) {
        toast.success(`RFID tag linked to driver successfully`);
        window.location.reload();
        return true;
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to link RFID tag to driver');
        return false;
      }
    } catch (error) {
      console.error('Error linking RFID tag to driver:', error);
      toast.error('Failed to link RFID tag. Please try again.');
      return false;
    } finally {
      setIsLinking(false);
    }
  }

  async function verifyRfidTagOwner(rfidTag: string) {
    try {
      const res = await driverService.getRegisteredDriver();
      if (res.status === 200) {
        const drivers = await res.json();
        const ownerDriver = drivers.find(
          (d: Driver) =>
            d.rfidTag &&
            d.rfidTag.trim().toUpperCase() === rfidTag.trim().toUpperCase(),
        );
        return ownerDriver || null; // Returns the driver if tag is assigned, null if available
      }
    } catch (error) {
      console.error('Error verifying RFID tag owner:', error);
    }
    return null;
  }

  async function unlinkRfidTagFromDriver(driverId: string) {
    setIsLinking(true);
    try {
      const res = await driverService.updateRegisteredDriver({
        rfidTag: driverId,
        data: { rfidTag: null },
      });

      if (res.status === 200) {
        toast.success('RFID tag unlinked from driver successfully');
        window.location.reload();
        return true;
      } else {
        const errorData = await res.json();
        toast.error(
          errorData.message || 'Failed to unlink RFID tag from driver',
        );
        return false;
      }
    } catch (error) {
      console.error('Error unlinking RFID tag from driver:', error);
      toast.error('Failed to unlink RFID tag. Please try again.');
      return false;
    } finally {
      setIsLinking(false);
    }
  }

  return {
    linkRfidTagToDriver,
    unlinkRfidTagFromDriver,
    checkIfRfidTagIsAvailable,
    verifyRfidTagOwner,
    getAvailableDrivers,
    isLinking,
    loading,
    drivers,
  };
}

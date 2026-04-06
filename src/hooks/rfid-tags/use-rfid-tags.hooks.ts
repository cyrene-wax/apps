'use client';

import { driverService, rfidTagService } from '@/services';
import type { AssignedToDriverTag, Driver, RfidTag } from '@/types';
import React, { useState } from 'react';
import { toast } from 'sonner';

export function useRfidTags() {
  const [loading, setLoading] = useState(false);
  const [rfidTags, setRfidTags] = useState<AssignedToDriverTag[]>([]);
  const [availableTags, setAvailableTags] = useState<AssignedToDriverTag[]>([]);
  const [assignedTags, setAssignedTags] = useState<AssignedToDriverTag[]>([]);
  const [assignedToDriver, setAssignedToDriver] = useState<
    AssignedToDriverTag[]
  >([]);

  async function getAllRfidTags() {
    setLoading(true);
    try {
      const rfidTagResults = await rfidTagService.getAllRfidTags();
      const driverResults = await driverService.getRegisteredDriver();
      if (rfidTagResults.status === 200 && driverResults.status === 200) {
        const rfidData = await rfidTagResults.json();
        const driverData = await driverResults.json();
        setLoading(false);
        setRfidTags(rfidData);
        setAvailableTags(
          rfidData.filter((tag: RfidTag) => tag.status === 'available'),
        );
        setAssignedTags(
          rfidData.filter((tag: RfidTag) => tag.status === 'assigned'),
        );
        setAssignedToDriver(
          driverData.filter((tag: Driver) => tag.plateNumber),
        );
      }
    } catch (error) {
      console.error('Error fetching RFID tags:', error);
      toast.error('Failed to fetch RFID tags. Please try again.');
    }
  }

  const tagsLength = rfidTags.length;
  const assignedTagLength = rfidTags.filter(
    (tag) => tag.status === 'assigned',
  ).length;
  const availableTagLength = rfidTags.filter(
    (tag) => tag.status === 'available',
  ).length;

  React.useEffect(() => {
    getAllRfidTags();
  }, []);

  return {
    rfidTags,
    assignedTags,
    availableTags,
    loading,
    tagsLength,
    assignedTagLength,
    availableTagLength,
    getAllRfidTags,
    assignedToDriver,
  };
}

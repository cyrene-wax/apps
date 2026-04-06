'use client';

import { driverService } from '@/services';
import type { Driver } from '@/types';
import React, { useState } from 'react';
import { toast } from 'sonner';

export function useDrivers() {
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [totalDrivers, setTotalDrivers] = useState(0);

  async function getAllDrivers() {
    setLoading(true);
    try {
      const res = await driverService.getRegisteredDriver();
      if (res.status === 200) {
        const data = await res.json();
        setDrivers(data);
        setLoading(false);
        setTotalDrivers(data.length);
      }
    } catch (error) {
      console.error('Error fetching Drivers:', error);
      toast.error('Failed to fetch Drivers. Please try again.');
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getAllDrivers();
  }, []);

  return {
    totalDrivers,
    drivers,
    loading,
    getAllDrivers,
  };
}

import { driverService } from '@/services';
import { Driver } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';

export function useUpdateDriver() {
  const [updating, setUpdating] = useState(false);
  const [form, setForm] = useState({
    driverName: '',
    plateNumber: '',
    contactNumber: '',
    vehicleModel: '',
  });

  async function updateDriver(rfidTag: string, data: Partial<Driver>) {
    setUpdating(true);

    try {
      const res = await driverService.updateRegisteredDriver({ rfidTag, data });

      if (res.status === 200) {
        console.log('Driver updated successfully');
        toast.success('Driver updated successfully');
        window.location.reload();
        return true;
      } else {
        toast.error('Failed to update driver');
        return false;
      }
    } catch (error) {
      console.error('Error updating driver:', error);
      toast.error('Failed to update driver');
      return false;
    } finally {
      setUpdating(false);
    }
  }

  return {
    updateDriver,
    updating,
    form,
    setForm,
  };
}

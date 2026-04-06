import { driverService } from '@/services';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRfidTags } from '../rfid-tags/use-rfid-tags.hooks';
import { useDrivers } from './use-driver-details.hooks';

export function useDeleteDriver() {
  const { getAllDrivers } = useDrivers();
  const { getAllRfidTags } = useRfidTags();
  const [deleting, setDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function handleDeleteDriver(rfidTag: string, driverName: string) {
    setDeleting(true);
    getAllDrivers();
    getAllRfidTags();

    try {
      const res = await driverService.deleteRegisteredDriver({ rfidTag });

      if (res.status === 200) {
        toast.success(`Driver ${driverName} deleted successfully`);
        setTimeout(() => {
          window.location.reload();
          getAllDrivers();
          getAllRfidTags();
          setDeleting(false);
          setIsOpen(false);
        }, 500);

        return true;
      }

      const errorData = await res.json();
      toast.error(errorData.message || 'Failed to delete driver');
      setDeleting(false);
      return false;
    } catch (error) {
      console.error('Error deleting driver:', error);
      toast.error('Failed to delete driver. Please try again.');
      setDeleting(false);
      return false;
    }
  }

  return {
    handleDeleteDriver,
    setIsOpen,
    deleting,
    isOpen,
  };
}

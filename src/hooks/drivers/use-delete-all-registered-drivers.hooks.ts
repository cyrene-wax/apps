import { driverService } from '@/services';
import { useState } from 'react';
import { toast } from 'sonner';

export function useDeleteAllRegisteredDrivers() {
  const [deletingDrivers, setDeletingDrivers] = useState(false);

  async function handleDeleteAllRegisteredDrivers() {
    setDeletingDrivers(true);

    try {
      const res = await driverService.deleteAllRegisteredDrivers();

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message || 'All Drivers deleted successfully');
        setTimeout(() => {
          setDeletingDrivers(false);
          window.location.reload();
        }, 500);
        return true;
      }
      const errorData = await res.json();
      toast.error(errorData.message || 'Failed to delete all Drivers');
      setDeletingDrivers(false);
      return false;
    } catch (error) {
      console.error('Error deleting all Drivers:', error);
      toast.error('Failed to delete all Drivers. Please try again.');
      setDeletingDrivers(false);
      return false;
    }
  }

  return {
    handleDeleteAllRegisteredDrivers,
    deletingDrivers,
  };
}

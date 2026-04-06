import { rfidTagService } from '@/services';
import { useState } from 'react';
import { toast } from 'sonner';

export function useDeleteRfidTag() {
  const [deletingRfidTags, setDeletingRfidTags] = useState(false);

  async function handleDeleteAllRfidTags() {
    setDeletingRfidTags(true);

    try {
      const res = await rfidTagService.deleteAllRfidTags();

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message || 'All RFID tags deleted successfully');
        setTimeout(() => {
          setDeletingRfidTags(false);
          window.location.reload();
        }, 500);
        return true;
      }
      const errorData = await res.json();
      toast.error(errorData.message || 'Failed to delete all RFID tags');
      setDeletingRfidTags(false);
      return false;
    } catch (error) {
      console.error('Error deleting all RfidTags:', error);
      toast.error('Failed to delete all RFID tags. Please try again.');
      setDeletingRfidTags(false);
      return false;
    }
  }

  return {
    handleDeleteAllRfidTags,
    deletingRfidTags,
  };
}

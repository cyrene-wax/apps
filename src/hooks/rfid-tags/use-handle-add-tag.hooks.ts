'use client';

import { rfidTagService } from '@/services';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useRfidTags } from './use-rfid-tags.hooks';

export function useHandleAddTag() {
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getAllRfidTags } = useRfidTags();
  const [form, setForm] = useState({
    rfidTag: '',
    status: '',
  });

  React.useEffect(() => {
    if (form.rfidTag.trim() === '') {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [form]);

  const data = {
    rfidTag: form.rfidTag.toUpperCase(),
    status: 'available',
  };

  async function handleAddTag(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    getAllRfidTags();
    const isValid =
      form.rfidTag.trim() !== '' &&
      form.rfidTag.length === 8 &&
      /^[A-Z0-9]+$/.test(form.rfidTag);

    if (isValid) {
      try {
        getAllRfidTags();
        const res = await rfidTagService.addNewTag({ data });
        const responseData = await res.json();
        if (res.status === 201) {
          window.location.reload();
          setIsLoading(false);
          getAllRfidTags();
          setForm({ rfidTag: '', status: '' });
          toast.success(responseData.message);
        }

        if (res.status === 500) {
          toast.error(
            'RFID tag already exists. Please use a different tag ID.',
          );
        }
      } catch (error) {
        console.error('Error adding RFID tag:', error);
        toast.error('Failed to add RFID tag. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast.error('Invalid RFID tag. Please enter a valid tag ID.');
    }
  }

  return { handleAddTag, disable, isLoading, form, setForm };
}

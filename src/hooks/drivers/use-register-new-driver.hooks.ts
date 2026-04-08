'use client';

import { driverService } from '@/services/';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useRfidTags } from '../rfid-tags/use-rfid-tags.hooks';
import { useDrivers } from './use-driver-details.hooks';
export function useRegisterNewDriver() {
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRfid, setSelectedRfid] = useState<string | null>(null);
  const { getAllRfidTags } = useRfidTags();
  const { getAllDrivers } = useDrivers();
  const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const [form, setForm] = useState({
    driverName: '',
    plateNumber: '',
    contactNumber: '',
    vehicleModel: '',
  });

  React.useEffect(() => {
    if (
      form.driverName.trim() === '' ||
      form.plateNumber.trim() === '' ||
      !selectedRfid ||
      form.vehicleModel.trim() === '' ||
      form.contactNumber.trim() === '' ||
     !selectedStatus
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [form, selectedRfid, selectedStatus]);

  const data = {
    driverName: form.driverName,
    plateNumber: form.plateNumber.toUpperCase(),
    rfidTag: selectedRfid,
    status: selectedStatus,
    contactNumber: form.contactNumber,
    vehicleModel: form.vehicleModel,
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    getAllDrivers();
    getAllRfidTags();
    const isContactNumberValid = /^\d{11}$/.test(form.contactNumber.trim());

    if (isContactNumberValid) {
      try {
        getAllDrivers();
        getAllRfidTags();
        const res = await driverService.registerNewDriver({ data });
        const responseData = await res.json();
        if (res.status === 201) {
          setIsLoading(false);
          window.location.reload();
          setForm({
            driverName: '',
            plateNumber: '',
            contactNumber: '',
            vehicleModel: '',
            
          });

          setTimeout(() => {
            getAllDrivers();
            getAllRfidTags();
            setIsOpen(false);
          }, 500);

          setSelectedRfid(null);
          toast.success(responseData.message);
        }

        switch (res.status) {
          case 500:
            toast.error(responseData.message);
          case 400:
            toast.error(responseData.message);
          default:
            break;
        }
      } catch (error) {
        console.error('Error registering driver:', error);
        toast.error('Failed to register driver. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast.error(
        'Invalid contact number. Please enter a valid 11-digit number.',
      );
    }
  }

  return {
    form,
    setIsOpen,
    isOpen,
    setForm,
    disable,
    handleSubmit,
    isLoading,
    selectedRfid,
    setSelectedRfid,
    selectedStatus,
    setSelectedStatus
  };
}

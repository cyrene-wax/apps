'use client';

import { adminProfileService } from '@/services';
import { AdminProfile } from '@/types';
import React, { useState } from 'react';

export function useAdminProfile() {
  const [adminProfileData, setAdminProfileData] = useState<AdminProfile[]>([]);

  async function getAdminProfile() {
    try {
      const res = await adminProfileService.getAdminProfile();
      const data = await res.json();

      if (res.status === 200) {
        setAdminProfileData(data);
      } else {
        console.error('Failed to fetch admin profile:', data.error);
        return;
      }
    } catch (error) {
      console.error('Failed to update admin profile:', error);
    }
  }

  React.useEffect(() => {
    getAdminProfile();
  }, []);
  return { adminProfileData };
}

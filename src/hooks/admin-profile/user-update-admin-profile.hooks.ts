import { adminProfileService } from '@/services';
import { AdminProfile } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';

export function useUpdateAdminProfile() {
  const [updating, setUpdating] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    username: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
  });
  const [currentPassword, setCurrentPassword] = useState('');

  async function updateAdminProfile(
    username: string,
    data: Partial<AdminProfile>,
  ) {
    setUpdating(true);

    try {
      const res = await adminProfileService.updateAdminProfile({
        username,
        data,
      });
      const responseData = await res.json();
      if (res.status === 200) {
        toast.success(responseData.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return true;
      } else {
        toast.error(responseData.message);
        return false;
      }
    } catch (error) {
      console.error('Error updating admin profile:', error);
      toast.error('Failed to update admin profile');
      return false;
    } finally {
      setUpdating(false);
    }
  }

  async function updatePassword(username: string, newPassword: string) {
    setUpdating(true);
    try {
      if (!currentPassword) {
        toast.error('Current password is required');
        return false;
      }

      const res = await adminProfileService.updatePassword({
        username,
        currentPassword,
        newPassword,
      });
      const responseData = await res.json();

      if (res.status === 200) {
        toast.success(responseData.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return true;
      }

      toast.error(responseData.message || 'Failed to update password');
      return false;
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
      return false;
    } finally {
      setUpdating(false);
    }
  }

  return {
    updateAdminProfile,
    updating,
    profileForm,
    setProfileForm,
    passwordForm,
    setPasswordForm,
    updatePassword,
    setCurrentPassword,
    currentPassword,
  };
}

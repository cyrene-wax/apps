'use client';

import { CustomDestructiveButton } from '@/components/custom-button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminProfile } from '@/hooks/admin-profile/use-admin-profile.hooks';
import { useUpdateAdminProfile } from '@/hooks/admin-profile/user-update-admin-profile.hooks';
import { useDeleteAllRegisteredDrivers } from '@/hooks/drivers/use-delete-all-registered-drivers.hooks';
import { useResetParkingSlots } from '@/hooks/parking/reset-parking-slot.hooks';
import { useDeleteRfidTag } from '@/hooks/rfid-tags/use-delete-all-rfid-tag.hooks';
import { AdminProfile } from '@/types';
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  KeyRound,
  Save,
  Settings,
  TriangleAlert,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface props {
  adminProfile: AdminProfile;
}

export default function SettingsPage({ adminProfile }: props) {
  const { handleDeleteAllRfidTags, deletingRfidTags } = useDeleteRfidTag();
  const { resetParkingSlots, resetting } = useResetParkingSlots();
  const { handleDeleteAllRegisteredDrivers, deletingDrivers } =
    useDeleteAllRegisteredDrivers();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const { adminProfileData } = useAdminProfile();
  const {
    updateAdminProfile,
    updating,
    profileForm,
    setProfileForm,
    updatePassword,
    passwordForm,
    setPasswordForm,
    currentPassword,
    setCurrentPassword,
  } = useUpdateAdminProfile();

  useEffect(() => {
    if (adminProfile) {
      setProfileForm({
        name: adminProfile.name || '',
        username: adminProfile.username || '',
      });
    }
  }, [adminProfile, setProfileForm]);

  const passwordStrength =
    passwordForm.newPassword.length === 0
      ? null
      : passwordForm.newPassword.length < 6
        ? 'weak'
        : passwordForm.newPassword.length < 8
          ? 'fair'
          : 'strong';

  const strengthConfig = {
    weak: { label: 'Weak', color: 'bg-red-400', text: 'text-red-400', bars: 1 },
    fair: {
      label: 'Fair',
      color: 'bg-amber-400',
      text: 'text-amber-400',
      bars: 2,
    },
    strong: {
      label: 'Strong',
      color: 'bg-green-500',
      text: 'text-green-500',
      bars: 3,
    },
  };

  const passwordsMatch =
    confirmPassword.length > 0 && passwordForm.newPassword === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && passwordForm.newPassword !== confirmPassword;

  return (
    <div className="">
      <div className="mb-5">
        <h1 className="text-2xl font-black text-gray-900">System Settings</h1>
        <p className="mt-0.5 text-sm text-gray-400">
          Configure the A.P.P.S. parking system
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Card className="overflow-hidden border-gray-200 shadow-sm">
          <div className="relative h-24 bg-linear-to-r from-green-600 via-green-500 to-emerald-400">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="absolute right-0 bottom-0 left-0 h-8 bg-linear-to-t from-black/10 to-transparent" />
          </div>

          <div className="relative px-6">
            <div
              className="flex items-end gap-4"
              style={{ marginTop: '-2.25rem' }}
            >
              <div className="relative shrink-0">
                <div className="flex h-18 w-18 items-center justify-center rounded-2xl border-4 border-white bg-linear-to-br from-green-500 to-emerald-600 text-4xl shadow-lg">
                  👨‍💼
                </div>
                <span className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-green-500 shadow">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
              </div>
              <div className="mb-1 flex flex-1 items-end justify-between">
                {adminProfileData.map((profile, index) => (
                  <div key={index}>
                    <p className="text-base font-black text-gray-900">
                      {profile.name || 'System Admin'}
                    </p>
                    <p className="text-xs text-gray-400">
                      @{profile.username || '@username'}
                    </p>
                  </div>
                ))}
                <Badge className="mb-1 border-green-200 bg-green-100 text-[10px] font-black tracking-widest text-green-700 uppercase">
                  Administrator
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-6 px-6">
            <Badge className="top-3 right-3 border-green-200 bg-green-100 text-[10px] font-black tracking-widest text-green-700 uppercase">
              Version 1.0.0
            </Badge>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`group flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-xs font-black tracking-wide transition-all duration-200 ${
                showSettings
                  ? 'border-green-300 bg-green-600 text-white shadow-md'
                  : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              <Settings
                className={`h-3.5 w-3.5 transition-transform duration-500 ${showSettings ? 'rotate-90' : 'rotate-0'}`}
              />
              Account Settings
              {showSettings ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>

            {/* Collapsible Panel */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showSettings
                  ? 'mt-4 max-h-250 opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <>
                <div className="mt-4 flex gap-0 border-b border-gray-100 px-6">
                  {(
                    [
                      { key: 'profile', label: 'Profile', icon: User },
                      { key: 'password', label: 'Password', icon: KeyRound },
                    ] as const
                  ).map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-xs font-black tracking-wide transition-all ${
                        activeTab === key
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </button>
                  ))}
                </div>

                <CardContent className="p-6">
                  {activeTab === 'profile' && (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <Label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                            System Name
                          </Label>
                          <Input
                            value={profileForm.name}
                            placeholder="System Name"
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                name: e.target.value,
                              })
                            }
                            className="rounded-xl border-gray-200 bg-gray-200 text-sm font-semibold text-gray-900 transition-all focus-visible:ring-1 focus-visible:ring-green-500"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <Label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                            Username
                          </Label>
                          <div className="relative">
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs font-bold text-gray-400">
                              @
                            </span>
                            <Input
                              value={profileForm.username}
                              placeholder="username"
                              onChange={(e) =>
                                setProfileForm({
                                  ...profileForm,
                                  username: e.target.value,
                                })
                              }
                              className="rounded-xl border-gray-200 bg-gray-200 pl-6 text-sm font-semibold text-gray-900 transition-all focus-visible:ring-1 focus-visible:ring-green-500"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() =>
                            updateAdminProfile(adminProfileData[0].username, {
                              ...profileForm,
                            })
                          }
                          className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-black tracking-wider text-white shadow-sm transition-all hover:bg-green-700 active:scale-[0.98]"
                        >
                          <Save className="h-3.5 w-3.5" />
                          {updating ? 'Saving…' : 'Save Profile'}
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'password' && (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            type={showCurrent ? 'text' : 'password'}
                            value={currentPassword}
                            placeholder="Enter current password"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="rounded-xl border-gray-200 bg-gray-200 pr-10 text-sm font-semibold text-gray-900 transition-all focus-visible:ring-1 focus-visible:ring-green-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-500"
                          >
                            {showCurrent ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <Label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                            New Password
                          </Label>
                          <div className="relative">
                            <Input
                              type={showNew ? 'text' : 'password'}
                              value={passwordForm.newPassword}
                              placeholder="New password"
                              onChange={(e) =>
                                setPasswordForm({
                                  ...passwordForm,
                                  newPassword: e.target.value,
                                })
                              }
                              className="rounded-xl border-gray-200 bg-gray-200 pr-10 text-sm font-semibold text-gray-900 transition-all focus-visible:ring-1 focus-visible:ring-green-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNew(!showNew)}
                              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-500"
                            >
                              {showNew ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>

                          {passwordStrength && (
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between">
                                <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                                  Strength
                                </span>
                                <span
                                  className={`text-[10px] font-bold ${strengthConfig[passwordStrength].text}`}
                                >
                                  {strengthConfig[passwordStrength].label}
                                </span>
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3].map((i) => (
                                  <div
                                    key={i}
                                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                      i <= strengthConfig[passwordStrength].bars
                                        ? strengthConfig[passwordStrength].color
                                        : 'bg-gray-100'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <Label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                            Confirm Password
                          </Label>
                          <div className="relative">
                            <Input
                              type={showConfirm ? 'text' : 'password'}
                              value={confirmPassword}
                              placeholder="Confirm password"
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              className={`rounded-xl border-gray-200 bg-gray-200 pr-10 text-sm font-semibold text-gray-900 transition-all focus-visible:ring-1 ${
                                passwordsMismatch
                                  ? 'border-red-300 focus-visible:ring-red-400'
                                  : passwordsMatch
                                    ? 'border-green-300 focus-visible:ring-green-400'
                                    : 'focus-visible:ring-green-500'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirm(!showConfirm)}
                              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-500"
                            >
                              {showConfirm ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          {passwordsMismatch && (
                            <p className="text-[10px] font-semibold text-red-400">
                              Passwords do not match
                            </p>
                          )}
                          {passwordsMatch && (
                            <p className="text-[10px] font-semibold text-green-500">
                              Passwords match ✓
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() =>
                            updatePassword(
                              adminProfileData[0].username,
                              passwordForm.newPassword,
                            )
                          }
                          disabled={!currentPassword || !passwordsMatch}
                          className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-black tracking-wider text-white shadow-sm transition-all hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <KeyRound className="h-3.5 w-3.5" />
                          {updating ? 'Updating…' : 'Update Password'}
                        </button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden border-2 border-red-200">
          <CardHeader className="border-b border-red-200 bg-red-50 px-4 py-3">
            <CardTitle className="flex items-center gap-2 text-xs font-black tracking-widest text-red-500 uppercase">
              <TriangleAlert className="h-4 w-4" /> Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-red-100 p-0">
            <DangerRow
              label="Delete all Rfid Tags"
              desc="Permanently delete all Rfid tags"
              btnLabel="Delete Tags"
              confirmDesc="This will permanently delete all Rfid tags. Make sure to re-register any necessary tags after this action. You can link them to existing drivers. This cannot be undone."
              onConfirm={() => handleDeleteAllRfidTags()}
              isDeleting={deletingRfidTags ? 'Deleting…' : 'Yes, Delete'}
            />
            <DangerRow
              label="Reset All Parking Slots"
              desc="Mark all slots as available — use in emergencies"
              btnLabel="Reset Slots"
              confirmDesc="This will mark ALL parking slots as available, removing any current occupancy data. Use this only in emergency situations where the system's slot data is inaccurate. This cannot be undone."
              onConfirm={resetParkingSlots}
              isDeleting={resetting ? 'Resetting…' : 'Yes, Reset'}
            />
            <DangerRow
              label="Delete All Drivers"
              desc="Remove all registered drivers and their data permanently"
              btnLabel="Delete All"
              confirmDesc="This will permanently delete ALL registered drivers and their data. Make sure to re-register any necessary drivers after this action. This cannot be undone."
              onConfirm={() => handleDeleteAllRegisteredDrivers()}
              isDeleting={deletingDrivers ? 'Deleting…' : 'Yes, Delete'}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DangerRow({
  label,
  desc,
  btnLabel,
  confirmDesc,
  onConfirm,
  isDeleting,
}: {
  label: string;
  desc: string;
  btnLabel: string;
  confirmDesc: string;
  onConfirm: () => void;
  isDeleting?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div>
        <p className="text-sm font-bold text-gray-900">{label}</p>
        <p className="mt-0.5 text-xs text-red-400">{desc}</p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger>
          <CustomDestructiveButton btnLabel={btnLabel} />
        </AlertDialogTrigger>

        <AlertDialogContent className="h-56 overflow-hidden rounded-2xl border-gray-100 p-0 shadow-xl">
          <div className="border-b border-red-100 bg-red-50 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
                <span className="text-xl">⚠️</span>
              </div>
              <AlertDialogHeader className="space-y-0.5">
                <AlertDialogTitle className="text-sm font-black text-gray-900">
                  Are you sure you want to proceed?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-xs leading-relaxed text-gray-500">
                  {confirmDesc}
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
          </div>

          <AlertDialogFooter className="border-t border-gray-100 bg-gray-50 px-6 pt-2">
            <AlertDialogCancel className="rounded-lg border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-100">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-lg bg-red-500 px-4 text-xs font-bold transition-transform hover:bg-red-600 active:scale-95"
              onClick={onConfirm}
            >
              {isDeleting}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

'use client';

import AddRfidTagForm from '@/components/admin/rfid-tags/add-rfid-tag-form';
import LinkRfidTagDialog from '@/components/admin/rfid-tags/link-rfid-tag-dialog';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLinkRfidTagsToRegisteredDrivers } from '@/hooks/rfid-tags/use-link-rfidtags-to-registered-drivers.hooks';
import { useRfidTags } from '@/hooks/rfid-tags/use-rfid-tags.hooks';
import type { Driver } from '@/types';
import { CheckSquare, LockOpen, Tag } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RfidTagsPage() {
  const {
    loading,
    rfidTags,
    assignedTags,
    tagsLength,
    assignedTagLength,
    availableTagLength,
    assignedToDriver,
  } = useRfidTags();

  const { verifyRfidTagOwner } = useLinkRfidTagsToRegisteredDrivers();
  const [verifiedTags, setVerifiedTags] = useState<Set<string>>(new Set());
  const [verifyingTag, setVerifyingTag] = useState<string | null>(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [selectedRfidTag, setSelectedRfidTag] = useState<string | null>(null);
  const [currentOwner, setCurrentOwner] = useState<Driver | null>(null);

  const handleVerifyTag = async (rfidTag: string) => {
    setVerifyingTag(rfidTag);
    try {
      const owner = await verifyRfidTagOwner(rfidTag);
      if (owner) {
        setVerifiedTags((prev) => new Set([...prev, rfidTag]));
        toast.success(`RFID tag verified. Registered to: ${owner.driverName}`);
      } else {
        toast.error('This RFID tag is not registered to any driver yet.');
      }
    } catch {
      toast.error('Failed to verify RFID tag.');
    } finally {
      setVerifyingTag(null);
    }
  };

  const handleOpenLinkDialog = async (rfidTag: string) => {
    const owner = await verifyRfidTagOwner(rfidTag);
    if (!owner) {
      toast.error(
        'This RFID tag is not registered to any driver yet. Please verify first.',
      );
      return;
    }
    setCurrentOwner(owner);
    setSelectedRfidTag(rfidTag);
    setLinkDialogOpen(true);
  };

  return (
    <div className="max-w-full">
      <div className="mb-5">
        <h1 className="text-2xl font-black text-gray-900">
          RFID Tag Management
        </h1>
        <p className="mt-0.5 text-sm text-gray-400">
          View, assign, and manage all RFID tags
        </p>
      </div>
      <div className="over mb-5 grid grid-cols-3 gap-4">
        <Card className="border-t-4 border-green-200 border-t-green-500 shadow-sm">
          <CardContent className="p-4">
            <Tag className="mb-2 h-5 w-5 text-green-500" />
            <p className="font-mono text-2xl font-black text-gray-900">
              {tagsLength}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-gray-400">
              Total Tags
            </p>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-teal-200 border-t-teal-500 shadow-sm">
          <CardContent className="p-4">
            <CheckSquare className="mb-2 h-5 w-5 text-teal-500" />
            <p className="font-mono text-2xl font-black text-gray-900">
              {assignedTagLength}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-gray-400">
              Assigned
            </p>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-amber-200 border-t-amber-500 shadow-sm">
          <CardContent className="p-4">
            <LockOpen className="mb-2 h-5 w-5 text-amber-500" />
            <p className="font-mono text-2xl font-black text-gray-900">
              {availableTagLength}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-gray-400">
              Available
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="h-fit max-h-120 overflow-hidden border-gray-200 shadow-sm">
          <CardHeader className="max-h-12 items-center border-b border-green-200 bg-green-50 px-4 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-black tracking-widest text-green-700 uppercase">
                ✅ Assigned Tags
              </CardTitle>
              <span className="text-xs font-semibold text-gray-400">
                {assignedTagLength} tags
              </span>
            </div>
          </CardHeader>
          <CardContent className="max-h-105 divide-y divide-gray-100 overflow-y-auto p-0">
            {loading && (
              <p className="py-6 text-center text-sm text-gray-400">Loading…</p>
            )}
            {!loading && assignedTagLength === 0 && (
              <p className="py-6 text-center text-sm text-gray-400">
                No assigned tags yet.
              </p>
            )}
            {assignedTags.map((tag, index) => {
              return (
                <div
                  key={index}
                  className="mb-0.5 flex items-center gap-2.5 bg-gray-100 px-4 py-3 transition-colors hover:bg-green-50"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-100 text-sm">
                    📡
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs font-bold text-gray-900">
                      {assignedToDriver.find((t) => t.rfidTag === tag.rfidTag)
                        ?.driverName ?? 'A.P.P.S USER'}
                    </p>
                    <p className="font-mono text-xs text-gray-400">
                      {assignedToDriver.find((t) => t.rfidTag === tag.rfidTag)
                        ?.plateNumber ?? 'ADF-1234'}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="h-7 shrink-0 border-red-200 px-2.5 font-mono text-xs font-bold text-red-500 hover:bg-red-50"
                  >
                    {tag.rfidTag}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
          <CardFooter className="h-5 border-t border-gray-200">
            <p className="text-center text-xs text-gray-400">
              Assigned tags are currently in use by drivers.
            </p>
          </CardFooter>
        </Card>

        <Card className="h-fit max-h-120 overflow-hidden border-gray-200 shadow-sm">
          <CardHeader className="max-h-12 border-b border-gray-200 bg-gray-50 px-4 py-2.5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-black tracking-widest text-gray-600 uppercase">
                🔓 Available Tags
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400">
                  {availableTagLength} tags
                </span>
                <AddRfidTagForm />
              </div>
            </div>
          </CardHeader>
          <CardContent className="max-h-105 divide-y divide-gray-100 overflow-y-auto p-0">
            {loading && (
              <p className="py-6 text-center text-sm text-gray-400">Loading…</p>
            )}
            {rfidTags.length === 0 && !loading && (
              <p className="px-4 py-6 text-center text-sm text-gray-400">
                Tip: Add tags here first, then assign them to drivers in the
                Drivers tab.
              </p>
            )}
            {rfidTags.length !== 0 && !loading && availableTagLength === 0 ? (
              <p className="py-6 text-center text-sm text-gray-400">
                All tags are currently assigned.
              </p>
            ) : (
              <>
                {rfidTags.map((tag, index) => {
                  const isVerified = verifiedTags.has(tag.rfidTag);
                  return (
                    <div
                      key={index}
                      className="mb-0.5 flex items-center gap-2.5 bg-gray-100 px-4 py-3 transition-colors hover:bg-green-50"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-100 text-sm">
                        🏷️
                      </div>
                      <div className="flex-1">
                        <p className="font-mono text-xs font-bold text-gray-900">
                          {tag.rfidTag}
                        </p>
                        {tag.status === 'available' ? (
                          <p className="text-xs text-green-400">{tag.status}</p>
                        ) : (
                          <p className="text-xs text-red-400">unavailable</p>
                        )}
                      </div>
                      {tag.status === 'available' ? (
                        !isVerified ? (
                          <Badge
                            variant="outline"
                            className="h-7 px-2.5 text-xs hover:cursor-pointer"
                            onClick={() => handleVerifyTag(tag.rfidTag)}
                          >
                            {verifyingTag === tag.rfidTag
                              ? 'Checking…'
                              : 'Verify'}
                          </Badge>
                        ) : (
                          <Badge
                            variant="default"
                            className="h-7 bg-blue-100 px-2.5 text-xs text-blue-600 hover:cursor-pointer hover:bg-blue-200"
                            onClick={() => handleOpenLinkDialog(tag.rfidTag)}
                          >
                            Link to owner
                          </Badge>
                        )
                      ) : (
                        <Badge
                          variant="outline"
                          className="h-7 shrink-0 border-red-200 px-2.5 text-xs text-red-500 hover:bg-red-50"
                        >
                          In use
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </CardContent>
          <CardFooter className="h-5 border-t border-gray-200">
            <p className="text-center text-xs text-gray-400">
              Available tags are ready to be assigned to drivers.
            </p>
          </CardFooter>
        </Card>
      </div>

      <LinkRfidTagDialog
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        rfidTag={selectedRfidTag || ''}
        currentOwner={currentOwner}
        onSuccess={() => {
          window.location.reload();
        }}
      />

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3.5 text-sm font-semibold text-green-800">
        🔥
        <span>
          All RFID data is stored and query from mongodb . When a driver taps
          their tag at a slot reader, the IoT device writes to{' '}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs">
            firebase realtime database
          </code>{' '}
          and the parking slot updates instantly.
        </span>
      </div>
    </div>
  );
}

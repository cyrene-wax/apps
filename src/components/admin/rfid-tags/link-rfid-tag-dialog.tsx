'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLinkRfidTagsToRegisteredDrivers } from '@/hooks/rfid-tags/use-link-rfidtags-to-registered-drivers.hooks';
import type { Driver } from '@/types';

interface LinkRfidTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rfidTag: string;
  onSuccess?: () => void;
  currentOwner?: Driver | null;
}

export default function LinkRfidTagDialog({
  open,
  onOpenChange,
  rfidTag,
  onSuccess,
  currentOwner,
}: LinkRfidTagDialogProps) {
  const { linkRfidTagToDriver, isLinking } =
    useLinkRfidTagsToRegisteredDrivers();

  const handleLink = async () => {
    const success = await linkRfidTagToDriver(rfidTag);
    if (success) {
      onOpenChange(false);
      onSuccess?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Link RFID Tag</DialogTitle>
          <DialogDescription>
            Confirm to mark this RFID tag as assigned:{' '}
            <span className="font-mono font-bold text-gray-900">{rfidTag}</span>
          </DialogDescription>
        </DialogHeader>

        {currentOwner && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="text-xs font-semibold text-amber-800 uppercase">
              ℹ️ Currently Registered To
            </p>
            <p className="mt-1.5 font-mono text-sm font-bold text-amber-900">
              {currentOwner.driverName}
            </p>
            <p className="font-mono text-xs text-amber-700">
              {currentOwner.plateNumber}
            </p>
          </div>
        )}

        <div
          onClick={handleLink}
          className="group/button dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40 [&_svg:not([class*='size-'])]:size-3.5group/button text-primary-foreground [a]:hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 m-0 inline-flex h-7 shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent bg-green-600 bg-clip-padding p-0 px-2.5 text-sm text-[0.8rem] font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-green-700 focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50 in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:ring-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          {isLinking ? 'Linking...' : 'Link Tag'}
        </div>
      </DialogContent>
    </Dialog>
  );
}

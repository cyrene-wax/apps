'use client';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUpdateDriver } from '@/hooks/drivers/use-update-driver.hooks';
import { Driver } from '@/types';
import { Input } from '@base-ui/react';
import { UserPlus } from 'lucide-react';
import React, { useEffect } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';

interface props {
  onClick: () => void;
  driver: Driver;
}

export default function UpdateDriversForm({ onClick, driver }: props) {
  const { form, setForm, updateDriver, updating } = useUpdateDriver();

  useEffect(() => {
    if (driver) {
      setForm({
        driverName: driver.driverName || '',
        plateNumber: driver.plateNumber || '',
        contactNumber: driver.contactNumber || '',
        vehicleModel: driver.vehicleModel || '',
      });
    }
  }, [driver, setForm]);

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setForm((p: any) => ({ ...p, [k]: e.target.value }));

  return (
    <Dialog>
      <DialogTrigger onClick={onClick}>
        <Badge
          variant="outline"
          className="border-blue-200 bg-blue-100 text-xs text-blue-500 transition-all duration-300 hover:bg-blue-100 hover:text-blue-700 hover:transition-all hover:duration-300"
        >
          Edit
        </Badge>
      </DialogTrigger>
      <DialogContent className="min-w-xl border-0 bg-none p-0">
        <form onSubmit={() => updateDriver(driver.rfidTag || '', form)}>
          <Card className="border-gray-200 shadow-sm">
            <div className="mb-4 px-6 pt-2">
              <h1 className="text-2xl font-black text-gray-900">
                Update Driver Information
              </h1>
              <p className="mt-0.5 text-sm text-gray-400">
                Update the information of an existing driver in the A.P.P.S.
                system
              </p>
            </div>
            <CardContent className="grid grid-cols-2 gap-5 p-6 pt-0">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold tracking-wider text-gray-600 uppercase">
                  👤 Full Name
                </Label>
                <Input
                  className="rounded-lg px-3 py-2 font-mono focus-visible:ring-1 focus-visible:ring-green-500"
                  placeholder="e.g. Juan Dela Cruz"
                  value={form.driverName}
                  onChange={set('driverName')}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold tracking-wider text-gray-600 uppercase">
                  📋 Plate Number
                </Label>
                <Input
                  placeholder="e.g. ABC 1234"
                  value={form.plateNumber}
                  onChange={set('plateNumber')}
                  className="rounded-lg px-3 py-2 font-mono font-bold tracking-widest uppercase focus-visible:ring-1 focus-visible:ring-green-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold tracking-wider text-gray-600 uppercase">
                  📞 Contact Number
                </Label>
                <Input
                  placeholder="0912 345 6789"
                  value={form.contactNumber}
                  onChange={set('contactNumber')}
                  required
                  className="rounded-lg px-3 py-2 focus-visible:ring-1 focus-visible:ring-green-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold tracking-wider text-gray-600 uppercase">
                  🚗 Vehicle Model
                </Label>
                <Input
                  placeholder="e.g. Toyota Vios 2022"
                  value={form.vehicleModel}
                  onChange={set('vehicleModel')}
                  required
                  className="rounded-lg px-3 py-2 focus-visible:ring-1 focus-visible:ring-green-500"
                />
              </div>

              <div className="col-span-2 flex justify-end gap-3 border-t border-gray-100 pt-2">
                <DialogClose
                  render={
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  }
                />
                <Button
                  type="submit"
                  className="gap-2 bg-green-600 hover:bg-green-700"
                  disabled={updating}
                >
                  <UserPlus className="h-4 w-4" />
                  {updating ? 'Updating…' : 'Update Driver'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}

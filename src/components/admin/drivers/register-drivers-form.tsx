'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRegisterNewDriver } from '@/hooks/drivers/use-register-new-driver.hooks';
import { useRfidTags } from '@/hooks/rfid-tags/use-rfid-tags.hooks';
import { Input } from '@base-ui/react';
import { Plus, Tag, UserPlus } from 'lucide-react';
import { CustomDefaultButton } from '../../custom-button';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';

export default function RegisterDriversForm() {
  const { availableTags } = useRfidTags();

  const {
    form,
    setForm,
    disable,
    handleSubmit,
    isLoading,
    selectedRfid,
    setSelectedRfid,
  } = useRegisterNewDriver();

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setForm((p: any) => ({ ...p, [k]: e.target.value }));

  return (
    <Dialog>
      <DialogTrigger>
        <CustomDefaultButton
          btnLabel="Register New Driver"
          btnIcon={<Plus className="h-4 w-4" />}
          className="gap-2 bg-green-600 py-2 hover:bg-green-700"
        />
      </DialogTrigger>
      <DialogContent className="min-w-xl border-0 bg-none p-0">
        <form onSubmit={handleSubmit}>
          <Card className="border-gray-200 shadow-sm">
            <div className="mb-4 px-6 pt-2">
              <h1 className="text-2xl font-black text-gray-900">
                Register New Driver
              </h1>
              <p className="mt-0.5 text-sm text-gray-400">
                Add a new driver to the A.P.P.S. system
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

              <div className="col-span-2 flex max-h-46 flex-col gap-2 rounded-lg border-2 border-green-200 bg-green-50 p-4">
                <Label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-gray-600 uppercase">
                  <Tag className="h-3.5 w-3.5" /> Assign RFID Tag
                  <span className="font-normal tracking-normal text-gray-400 normal-case">
                    — select one free tag
                  </span>
                </Label>
                <div className="grid grid-cols-4 gap-2 overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {availableTags.length === 0 && (
                    <p className="col-span-4 text-sm text-gray-400">
                      No available RFID tags. Add more in RFID Tags page.
                    </p>
                  )}
                  {availableTags.map((tag, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedRfid(tag.rfidTag)}
                      className={`rounded-xl border-2 p-2.5 text-center font-mono text-xs font-bold transition-all ${
                        selectedRfid === tag.rfidTag
                          ? 'border-green-500 bg-green-100 text-green-800'
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      {tag.rfidTag}
                      <br />
                      <span className="text-[10px] font-normal">
                        {selectedRfid === tag.rfidTag ? '✓ Selected' : 'Free'}
                      </span>
                    </button>
                  ))}
                </div>
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
                  disabled={isLoading || disable}
                >
                  <UserPlus className="h-4 w-4" />
                  {isLoading ? 'Registering…' : 'Register Driver'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}

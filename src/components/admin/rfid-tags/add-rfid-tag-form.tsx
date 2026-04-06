import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHandleAddTag } from '@/hooks/rfid-tags/use-handle-add-tag.hooks';
import { Plus } from 'lucide-react';

export default function AddRfidTagForm() {
  const { form, setForm, disable, handleAddTag, isLoading } = useHandleAddTag();
  return (
    <Dialog>
      <DialogTrigger>
        <div className="group/button dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40 [&_svg:not([class*='size-'])]:size-3.5group/button text-primary-foreground [a]:hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 m-0 inline-flex h-7 shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent bg-green-600 bg-clip-padding p-0 px-2.5 text-sm text-[0.8rem] font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-green-700 focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50 in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:ring-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <Plus className="h-3 w-3" /> Add Tag
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New RFID Tag</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddTag} className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-1.5">
            <Label>RFID Tag ID</Label>
            <Input
              placeholder="e.g. A2360200"
              value={form.rfidTag}
              onChange={(e) => setForm({ ...form, rfidTag: e.target.value })}
              className="font-mono focus-visible:ring-1 focus-visible:ring-green-500"
            />
          </div>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700"
            disabled={disable}
          >
            {isLoading ? 'Adding…' : 'Add Tag'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

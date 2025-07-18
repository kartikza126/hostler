'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import type { Hostel } from '@/lib/types';

type HostelFormProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  hostel: Hostel | null;
};

export function HostelForm({ isOpen, setIsOpen, hostel }: HostelFormProps) {
  const isEditing = hostel !== null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{isEditing ? 'Edit Hostel' : 'Add New Hostel'}</DialogTitle>
          <DialogDescription>
            {isEditing ? `Update the details for ${hostel.name}.` : 'Fill in the details for your new hostel listing.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue={hostel?.name || ''} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input id="address" defaultValue={hostel?.address || ''} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price/Month
            </Label>
            <Input id="price" type="number" defaultValue={hostel?.price || ''} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" placeholder="Tell students about your hostel..." className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
             <Label className="text-right pt-2">
              Facilities
            </Label>
            <div className="col-span-3 space-y-2">
                 <div className="flex items-center space-x-2">
                    <Checkbox id="ac" defaultChecked={hostel?.facilities.ac} />
                    <Label htmlFor="ac">Air Conditioning (AC)</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="wifi" defaultChecked={hostel?.facilities.wifi} />
                    <Label htmlFor="wifi">Wi-Fi</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="food" defaultChecked={hostel?.facilities.food} />
                    <Label htmlFor="food">Food Included</Label>
                </div>
            </div>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right">
              Images
            </Label>
            <Input id="images" type="file" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{isEditing ? 'Save Changes' : 'Create Listing'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

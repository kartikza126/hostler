'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { hostels } from '@/lib/mock-data';
import { HostelForm } from '@/components/HostelForm';
import type { Hostel } from '@/lib/types';

export default function OwnerPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);

  const ownerHostels = hostels.filter(h => h.ownerId === 'owner1');

  const handleAddNew = () => {
    setSelectedHostel(null);
    setIsFormOpen(true);
  };

  const handleEdit = (hostel: Hostel) => {
    setSelectedHostel(hostel);
    setIsFormOpen(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-headline font-bold">My Hostels</h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Hostel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownerHostels.map((hostel) => (
          <Card key={hostel.id} className="w-full overflow-hidden flex flex-col">
            <CardHeader className="p-0">
                <Image
                    src={hostel.imageUrl}
                    alt={hostel.name}
                    width={600}
                    height={400}
                    className="aspect-video object-cover"
                    data-ai-hint="hostel building"
                />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="font-headline text-xl mb-1">{hostel.name}</CardTitle>
              <CardDescription>{hostel.address}</CardDescription>
            </CardContent>
            <div className="p-4 pt-0 flex justify-end gap-2">
              <Button variant="outline" size="icon" onClick={() => handleEdit(hostel)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

       {ownerHostels.length === 0 && (
          <div className="text-center py-16 col-span-full border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">You haven't listed any hostels yet.</p>
              <Button onClick={handleAddNew} variant="link" className="mt-2">Add your first hostel</Button>
          </div>
      )}

      <HostelForm 
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        hostel={selectedHostel}
      />
    </div>
  );
}

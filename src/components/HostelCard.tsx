import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, IndianRupee, Wifi, Wind, UtensilsCrossed, MapPin } from 'lucide-react';
import type { Hostel } from '@/lib/types';
import { cn } from '@/lib/utils';

type HostelCardProps = {
  hostel: Hostel;
};

export function HostelCard({ hostel }: HostelCardProps) {
  const facilities = [
    { name: 'AC', icon: Wind, available: hostel.facilities.ac },
    { name: 'Wi-Fi', icon: Wifi, available: hostel.facilities.wifi },
    { name: 'Food', icon: UtensilsCrossed, available: hostel.facilities.food },
  ];

  return (
    <Card className="w-full overflow-hidden flex flex-col transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Image
          src={hostel.imageUrl}
          alt={hostel.name}
          width={600}
          height={400}
          className="aspect-video object-cover"
          data-ai-hint="hostel exterior"
        />
        <Badge variant="destructive" className="absolute top-3 right-3 text-base">
          <Star className="w-4 h-4 mr-1 text-yellow-300 fill-yellow-300" /> {hostel.rating.toFixed(1)}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-1">{hostel.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
           <MapPin className="w-4 h-4" /> {hostel.address}
        </CardDescription>
        <div className="flex justify-start gap-2 mt-4">
          {facilities.map((facility) => (
            <Badge
              key={facility.name}
              variant={facility.available ? 'secondary' : 'outline'}
              className={cn("flex items-center gap-1.5 py-1 px-2", !facility.available && "text-muted-foreground line-through")}
            >
              <facility.icon className="w-4 h-4" />
              <span>{facility.name}</span>
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
        <div>
          <p className="text-xl font-bold flex items-center">
            <IndianRupee className="w-5 h-5" />{hostel.price.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">/ month</p>
        </div>
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  );
}

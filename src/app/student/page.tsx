'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal, IndianRupee } from 'lucide-react';
import { hostels, coachingCenters } from '@/lib/mock-data';
import type { Hostel } from '@/lib/types';
import { HostelCard } from '@/components/HostelCard';
import { Chatbot } from '@/components/Chatbot';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function StudentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('rating');
  const [priceRange, setPriceRange] = useState([5000, 15000]);
  const [facilities, setFacilities] = useState({ ac: false, wifi: false, food: false });
  const [distance, setDistance] = useState(5);
  const [selectedCoaching, setSelectedCoaching] = useState(coachingCenters[0].name);

  const filteredHostels = useMemo(() => {
    return hostels
      .filter((hostel) => {
        const matchesSearch = hostel.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = hostel.price >= priceRange[0] && hostel.price <= priceRange[1];
        const matchesFacilities =
          (!facilities.ac || hostel.facilities.ac) &&
          (!facilities.wifi || hostel.facilities.wifi) &&
          (!facilities.food || hostel.facilities.food);
        const matchesDistance = hostel.distance <= distance;
        return matchesSearch && matchesPrice && matchesFacilities && matchesDistance;
      })
      .sort((a, b) => {
        if (sortOrder === 'rating') {
          return b.rating - a.rating;
        }
        if (sortOrder === 'distance') {
          return a.distance - b.distance;
        }
        if (sortOrder === 'price-asc') {
          return a.price - b.price;
        }
        if (sortOrder === 'price-desc') {
          return b.price - a.price;
        }
        return 0;
      });
  }, [searchQuery, priceRange, facilities, distance, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-4 mb-6">
        <h1 className="text-3xl font-headline font-bold">Find your new home in Kota</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for hostels..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline"><SlidersHorizontal className="mr-2 h-4 w-4" /> Filters</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-4 w-80 space-y-6">
            <div>
              <Label className="mb-2 block font-semibold">Price Range</Label>
              <Slider
                min={5000}
                max={15000}
                step={500}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span><IndianRupee className="inline h-4 w-4 -mt-1"/>{priceRange[0]}</span>
                <span><IndianRupee className="inline h-4 w-4 -mt-1"/>{priceRange[1]}</span>
              </div>
            </div>
            <div>
              <Label className="mb-2 block font-semibold">Facilities</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="ac" checked={facilities.ac} onCheckedChange={(checked) => setFacilities(f => ({ ...f, ac: !!checked }))} />
                  <Label htmlFor="ac">AC</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="wifi" checked={facilities.wifi} onCheckedChange={(checked) => setFacilities(f => ({ ...f, wifi: !!checked }))} />
                  <Label htmlFor="wifi">Wi-Fi</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="food" checked={facilities.food} onCheckedChange={(checked) => setFacilities(f => ({ ...f, food: !!checked }))} />
                  <Label htmlFor="food">Food Included</Label>
                </div>
              </div>
            </div>
             <div>
              <Label className="mb-2 block font-semibold">Distance from Coaching</Label>
              <Select value={selectedCoaching} onValueChange={setSelectedCoaching}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                      {coachingCenters.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                  </SelectContent>
              </Select>
              <Slider
                min={0}
                max={5}
                step={0.5}
                value={[distance]}
                onValueChange={(value) => setDistance(value[0])}
                className="mt-4"
              />
              <div className="text-sm text-muted-foreground mt-2">Within {distance} km</div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="distance">Distance</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHostels.map((hostel) => (
          <HostelCard key={hostel.id} hostel={hostel} />
        ))}
      </div>
      {filteredHostels.length === 0 && (
          <div className="text-center py-16 col-span-full">
              <p className="text-muted-foreground">No hostels found. Try adjusting your filters.</p>
          </div>
      )}
      <Chatbot />
    </div>
  );
}

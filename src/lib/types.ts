export type Hostel = {
  id: string;
  name: string;
  address: string;
  distance: number; // in km
  rating: number; // 1-5
  price: number; // per month
  facilities: {
    ac: boolean;
    wifi: boolean;
    food: boolean;
  };
  imageUrl: string;
  ownerId: string;
};

export type TourPackage = {
  id: number;
  title: string;
  days: string;
  nights: string;
  price: string;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  category: string;
  country?: string;
  destination?: string;
  highlights: string[];
  rating: number;
  review: number;
  groupSize: number;
};
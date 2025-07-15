import { TourPackage } from "@/types";

export async function fetchTourPackages(params = {}): Promise<TourPackage[]> {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `/api/tours?${queryString}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const responseData = await response.json();
    
    // Handle both direct array response and { data: array } response
    const packageData = Array.isArray(responseData) 
      ? responseData 
      : responseData?.data || [];
    
    if (!Array.isArray(packageData)) {
      console.warn('Unexpected API response format:', responseData);
      return [];
    }
    
    // Validate and transform each package item
    return packageData.map(item => ({
      id: ensureNumber(item.id, 0),
      title: ensureString(item.title, 'Untitled Tour'),
      days: ensureString(item.days, '0'),
      nights: ensureString(item.nights, '0'),
      price: formatPrice(item.price),
      image1: processMainImageUrl(item.image1), // This now always returns string
      image2: processOptionalImageUrl(item.image2),
      image3: processOptionalImageUrl(item.image3),
      image4: processOptionalImageUrl(item.image4),
      image5: processOptionalImageUrl(item.image5),
      category: ensureString(item.category, 'Other'),
      country: optionalString(item.country),
      destination: optionalString(item.destination),
      highlights: processHighlights(item.highlights),
      rating: clampNumber(ensureNumber(item.rating, 4.0), 0, 5),
      review: ensureNumber(item.review, 0),
      groupSize: ensureNumber(item.groupSize, 1)
    }));
  } catch (error) {
    console.error('Error fetching tour packages:', error);
    return []; // Return empty array as fallback
  }
}

// Specific function for required image1
function processMainImageUrl(imageUrl: unknown): string {
  if (!imageUrl) return '/images/default-tour.jpg';
  const urlString = String(imageUrl);
  return urlString.startsWith('http') 
    ? urlString
    : `https://ecomlancers.com/travel_website/uploads/${encodeURIComponent(urlString)}`;
}

// Specific function for optional images
function processOptionalImageUrl(imageUrl: unknown): string | undefined {
  if (!imageUrl) return undefined;
  const urlString = String(imageUrl);
  return urlString.startsWith('http') 
    ? urlString
    : `https://ecomlancers.com/travel_website/uploads/${encodeURIComponent(urlString)}`;
}

// Helper functions for type-safe transformations
function ensureNumber(value: unknown, defaultValue: number): number {
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
}

function ensureString(value: unknown, defaultValue: string): string {
  return value !== undefined && value !== null 
    ? String(value) 
    : defaultValue;
}

function optionalString(value: unknown): string | undefined {
  return value !== undefined && value !== null 
    ? String(value) 
    : undefined;
}

function formatPrice(price: unknown): string {
  if (!price) return 'Price on request';
  const numericValue = String(price).replace(/[^0-9.]/g, '');
  return `₹${numericValue}`;
}

function processImageUrl(
  imageUrl: unknown, 
  fallback?: string
): string | undefined {
  if (!imageUrl) return fallback;
  const urlString = String(imageUrl);
  return urlString.startsWith('http') 
    ? urlString
    : `https://ecomlancers.com/travel_website/uploads/${encodeURIComponent(urlString)}`;
}

function processHighlights(highlights: unknown): string[] {
  if (!Array.isArray(highlights)) {
    return ['Experience local culture'];
  }
  return highlights
    .filter(item => item !== undefined && item !== null)
    .map(String);
}

function clampNumber(
  value: number, 
  min: number, 
  max: number
): number {
  return Math.min(Math.max(value, min), max);
}
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
      id: Number(item.id) || 0,
      image1: String(item.image1 || ''),
      image2: String(item.image2 || ''),
      image3: String(item.image3 || ''),
      image4: String(item.image4 || ''),
      image5: String(item.image5 || ''),
      duration: String(item.duration || ''),
      title: String(item.title || ''),
      price: String(item.price || ''),
      destination: item.destination ? String(item.destination) : undefined,
    }));
  } catch (error) {
    console.error('Error fetching tour packages:', error);
    return []; // Return empty array as fallback
  }
}
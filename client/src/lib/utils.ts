import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseLocation(location: string): string {
  try {
    if (location.startsWith('{')) {
      const parsed = JSON.parse(location);
      return parsed.sector || parsed.district || parsed.city || 'Unknown';
    }
    return location || 'Unknown';
  } catch (error) {
    console.error('Error parsing location:', error);
    return location || 'Unknown';
  }
}
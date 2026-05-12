export type PlantHealth = 'healthy' | 'needs_attention' | 'critical';

export interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  nickname?: string;
  acquisitionDate: string;
  lastWatered: string;
  wateringFrequency: number; // in days
  lastFertilized?: string;
  fertilizingFrequency?: number;
  healthStatus: PlantHealth;
  location: string;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  plantId: string;
  date: string;
  text: string;
  photos: string[];
  healthRating: number; // 1-5
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  likes: number;
  timestamp: string;
}

export interface MarketListing {
  id: string;
  userId: string;
  plantName: string;
  description: string;
  price: number;
  image: string;
  status: 'available' | 'sold';
  timestamp: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  advice: string;
}

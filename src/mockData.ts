import { CommunityPost, MarketListing, Plant } from "./types";

export const MOCK_PLANTS: Plant[] = [
  {
    id: "1",
    name: "몬스테라",
    species: "Monstera deliciosa",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=400",
    nickname: "몬이",
    acquisitionDate: "2024-01-15",
    lastWatered: "2024-05-10",
    wateringFrequency: 7,
    healthStatus: "healthy",
    location: "거실 창가",
  },
  {
    id: "2",
    name: "산세베리아",
    species: "Sansevieria trifasciata",
    image: "https://images.unsplash.com/photo-1593482815045-2139402e646a?auto=format&fit=crop&q=80&w=400",
    nickname: "튼튼이",
    acquisitionDate: "2023-11-20",
    lastWatered: "2024-04-20",
    wateringFrequency: 30,
    healthStatus: "healthy",
    location: "침실",
  }
];

export const MOCK_POSTS: CommunityPost[] = [
  {
    id: "p1",
    userId: "u1",
    userName: "식물요정",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    content: "우리 집 몬스테라가 새 잎을 냈어요! 너무 감격스러워요 😭",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=600",
    likes: 24,
    timestamp: "2시간 전"
  }
];

export const MOCK_MARKET: MarketListing[] = [
  {
    id: "m1",
    userId: "u2",
    plantName: "다육이 모둠",
    description: "이사 때문에 소중히 키우던 다육이들 나눔/저렴하게 보냅니다.",
    price: 5000,
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66ed11d8?auto=format&fit=crop&q=80&w=400",
    status: "available",
    timestamp: "1시간 전"
  }
];

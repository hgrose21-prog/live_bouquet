import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Image as ImageIcon, Star } from 'lucide-react';
import { JournalEntry } from '../types';

const MOCK_JOURNALS: JournalEntry[] = [
  {
    id: "j1",
    plantId: "1",
    date: "2024-05-12",
    text: "오늘 새 잎이 완전히 펴졌어요! 크기도 크고 고멍이 아주 예쁘게 났네요.",
    photos: ["https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=300"],
    healthRating: 5
  },
  {
    id: "j2",
    plantId: "1",
    date: "2024-05-05",
    text: "물 줄 때 영양제를 조금 섞어주었습니다. 잎 끝이 마르지 않게 가습기를 틀어줬어요.",
    photos: [],
    healthRating: 4
  }
];

export default function Journal() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-stone-800">성장 일지</h2>
        <Badge variant="secondary" className="rounded-full">전체 보기</Badge>
      </div>

      <div className="relative border-l-2 border-stone-200 ml-3 pl-6 space-y-8">
        {MOCK_JOURNALS.map((entry) => (
          <div key={entry.id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-4 border-emerald-50"></div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-400 font-mono tracking-tighter">{entry.date}</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={i < entry.healthRating ? "fill-amber-400 text-amber-400" : "text-stone-200"} />
                  ))}
                </div>
              </div>
              
              <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm text-stone-700 leading-relaxed italic">
                    "{entry.text}"
                  </p>
                  
                  {entry.photos.length > 0 && (
                    <div className="flex gap-2">
                      {entry.photos.map((photo, i) => (
                        <div key={i} className="w-20 h-20 rounded-xl overflow-hidden shadow-inner">
                          <img src={photo} alt="Journal" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

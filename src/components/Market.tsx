import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Tag, MapPin, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MarketListing } from '../types';

export default function Market({ listings }: { listings: MarketListing[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-stone-800">식물장터</h2>
        <Button variant="outline" size="sm" className="rounded-full border-stone-200">내 상점</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {listings.map((item) => (
          <Card key={item.id} className="border-none shadow-sm bg-white rounded-3xl overflow-hidden flex flex-col group cursor-pointer">
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={item.image} 
                alt={item.plantName} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-white/90 backdrop-blur-sm text-stone-900 border-none">신규</Badge>
              </div>
            </div>
            
            <CardContent className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-stone-900 line-clamp-1">{item.plantName}</h3>
                <p className="text-emerald-700 font-bold text-base mt-0.5">{item.price.toLocaleString()}원</p>
              </div>
              
              <div className="mt-3 space-y-1.5 border-t border-stone-50 pt-2">
                <div className="flex items-center gap-1 text-[10px] text-stone-400">
                  <MapPin size={10} />
                  <span>중구 정동</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-stone-400">
                  <Clock size={10} />
                  <span>{item.timestamp}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

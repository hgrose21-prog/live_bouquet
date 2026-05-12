import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplet, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Plant } from '../types';

export default function PlantList({ plants }: { plants: Plant[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-stone-800">나의 식물들</h2>
        <Badge variant="outline" className="bg-white">{plants.length} 개</Badge>
      </div>
      
      <div className="grid gap-4">
        {plants.map((plant, index) => (
          <motion.div
            key={plant.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border-stone-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-0 flex">
                <div className="w-28 h-28 shrink-0">
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-stone-900">{plant.nickname || plant.name}</h3>
                      <Badge className={
                        plant.healthStatus === 'healthy' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' :
                        plant.healthStatus === 'needs_attention' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' :
                        'bg-rose-100 text-rose-700 hover:bg-rose-100'
                      }>
                        {plant.healthStatus === 'healthy' ? '건강함' : plant.healthStatus === 'needs_attention' ? '주의' : '위험'}
                      </Badge>
                    </div>
                    <p className="text-xs text-stone-500 italic mt-0.5">{plant.species}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-[10px] text-stone-600 font-medium">
                      <Droplet size={12} className="text-blue-500" />
                      <span>3일 전</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-stone-600 font-medium">
                      <MapPin size={12} className="text-stone-400" />
                      <span>{plant.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center pr-2">
                  <ChevronRight size={20} className="text-stone-300" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

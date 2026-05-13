/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  BookOpen, 
  Users, 
  ShoppingBag, 
  Camera, 
  Plus, 
  Bell, 
  CloudSun 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

import { Plant, WeatherData } from './types';
import { MOCK_PLANTS, MOCK_POSTS, MOCK_MARKET } from './mockData';
import { fetchWeather } from './services/weatherService';
import { identifyPlant } from './services/geminiService';

// Pages
import PlantList from './components/PlantList';
import Community from './components/Community';
import Market from './components/Market';
import AIAnalysis from './components/AIAnalysis';
import Journal from './components/Journal';

export default function App() {
  const [activeTab, setActiveTab] = useState('plants');
  const [plants, setPlants] = useState<Plant[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Load plants from localStorage or mock
    const savedPlants = localStorage.getItem('green_keeper_plants');
    let loadedPlants = [];
    if (savedPlants) {
      loadedPlants = JSON.parse(savedPlants);
      setPlants(loadedPlants);
    } else {
      loadedPlants = MOCK_PLANTS;
      setPlants(loadedPlants);
    }

    // Induce photo taking if no plants (ignoring mock for this logic if empty)
    if (loadedPlants.length === 0) {
      setActiveTab('ai');
    }

    // Load weather
    fetchWeather().then(setWeather);
  }, []);

  useEffect(() => {
    localStorage.setItem('green_keeper_plants', JSON.stringify(plants));
  }, [plants]);

  const addPlant = (newPlant: Plant) => {
    setPlants((prev) => [...prev, newPlant]);
    setActiveTab('plants'); // Auto-switch to list after adding
    toast.success(`${newPlant.name}이(가) 등록되었습니다!`);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="input_file_0.png" 
            alt="Live Bouquet Logo" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/lucide-react/lucide/main/icons/leaf.svg';
              (e.target as HTMLImageElement).className = 'h-8 w-8 text-emerald-600';
            }}
          />
          <div>
            <h1 className="font-bold text-lg tracking-tight text-emerald-800 leading-none">라이브부케</h1>
            <p className="text-[9px] uppercase tracking-widest text-stone-400 font-medium font-mono mt-0.5">Live Bouquet</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {weather && (
            <div className="hidden sm:flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-full text-xs font-medium">
              <CloudSun size={16} className="text-amber-500" />
              <span>{weather.temp}°C {weather.condition}</span>
            </div>
          )}
          <Button variant="ghost" size="icon" className="relative text-stone-600">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 space-y-6">
        {weather && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex gap-4 items-start"
          >
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
              <CloudSun size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-800">지능형 관리 팁</p>
              <p className="text-sm text-emerald-700 leading-relaxed mt-1">{weather.advice}</p>
            </div>
          </motion.div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="plants">
                <PlantList plants={plants} />
              </TabsContent>
              <TabsContent value="community">
                <Community posts={MOCK_POSTS} />
              </TabsContent>
              <TabsContent value="market">
                <Market listings={MOCK_MARKET} />
              </TabsContent>
              <TabsContent value="journal">
                <Journal />
              </TabsContent>
              <TabsContent value="ai">
                <AIAnalysis onAddPlant={addPlant} />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 px-6 py-2 pb-6 max-w-md mx-auto rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center relative">
          <NavButton 
            active={activeTab === 'plants'} 
            onClick={() => setActiveTab('plants')} 
            icon={<Leaf size={24} />} 
            label="내 식물" 
          />
          <NavButton 
            active={activeTab === 'community'} 
            onClick={() => setActiveTab('community')} 
            icon={<Users size={24} />} 
            label="커뮤니티" 
          />
          
          {/* Central AI Button */}
          <div className="relative -top-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab('ai')}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors ${
                activeTab === 'ai' ? 'bg-emerald-600 text-white' : 'bg-stone-900 text-white'
              }`}
            >
              <Camera size={28} />
            </motion.button>
            {activeTab !== 'ai' && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-stone-400 whitespace-nowrap">AI 분석</span>
            )}
          </div>

          <NavButton 
            active={activeTab === 'market'} 
            onClick={() => setActiveTab('market')} 
            icon={<ShoppingBag size={24} />} 
            label="식물장터" 
          />
          <NavButton 
            active={activeTab === 'journal'} 
            onClick={() => setActiveTab('journal')} 
            icon={<BookOpen size={24} />} 
            label="관리일지" 
          />
        </div>
      </nav>

      <Toaster position="top-center" />
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${
        active ? 'text-emerald-600' : 'text-stone-400'
      }`}
    >
      <motion.div
        animate={active ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
      >
        {icon}
      </motion.div>
      <span className={`text-[10px] font-bold tracking-tight ${active ? 'opacity-100' : 'opacity-60'}`}>
        {label}
      </span>
    </button>
  );
}

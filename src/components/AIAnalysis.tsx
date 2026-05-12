import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Loader2, Sparkles, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { identifyPlant } from '../services/geminiService';
import { Plant } from '../types';
import { toast } from 'sonner';

export default function AIAnalysis({ onAddPlant }: { onAddPlant: (plant: Plant) => void }) {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        handleAnalyze(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (base64: string) => {
    setAnalyzing(true);
    setResult(null);
    try {
      const base64Data = base64.split(',')[1];
      const analysis = await identifyPlant(base64Data);
      setResult(analysis);
    } catch (error) {
      console.error(error);
      toast.error("분석 중 오류가 발생했습니다.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSavePlant = () => {
    if (!result || !image) return;
    
    const newPlant: Plant = {
      id: Math.random().toString(36).substr(2, 9),
      name: result.commonName,
      species: result.scientificName,
      image: image,
      acquisitionDate: new Date().toISOString().split('T')[0],
      lastWatered: new Date().toISOString().split('T')[0],
      wateringFrequency: 7, // Default
      healthStatus: 'healthy',
      location: '거실',
    };
    
    onAddPlant(newPlant);
    setImage(null);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 py-4">
        <h2 className="text-2xl font-bold text-stone-800">AI 식물 비서</h2>
        <p className="text-stone-500 text-sm">사진을 찍어 식물을 식별하고 건강 상태를 진단하세요.</p>
      </div>

      <Card className="border-dashed border-2 border-stone-200 bg-white/50 overflow-hidden">
        <CardContent className="p-0">
          {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="py-12 flex flex-col items-center justify-center cursor-pointer hover:bg-stone-100 transition-colors"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Camera size={32} />
              </div>
              <p className="font-semibold text-stone-700">여기를 눌러 사진 촬영/업로드</p>
              <p className="text-xs text-stone-400 mt-1">식물이 잘 보이도록 찍어주세요</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          ) : (
            <div className="relative aspect-square sm:aspect-video overflow-hidden">
              <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
              {analyzing && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                  <Loader2 className="w-10 h-10 animate-spin mb-2" />
                  <p className="font-medium">AI가 분석 중입니다...</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <Card className="border-emerald-100 bg-emerald-50/30">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-emerald-700 mb-1">
                  <Sparkles size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">AI 분석 결과</span>
                </div>
                <CardTitle className="text-xl flex items-center justify-between">
                  {result.commonName}
                  <span className="text-sm font-normal text-stone-500 italic">{result.scientificName}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-stone-700 mb-1">건강 상태</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">{result.healthAnalysis}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <InfoBox label="물 주기" value={result.wateringInfo} />
                  <InfoBox label="햇빛" value={result.lightNeeds} />
                </div>

                <div className="pt-4 border-t border-emerald-100 flex gap-2">
                  <Button onClick={handleSavePlant} className="flex-1 bg-emerald-600 hover:bg-emerald-700 gap-2">
                    <Plus size={18} />
                    내 식물로 등록하기
                  </Button>
                  <Button variant="outline" onClick={() => setImage(null)} className="flex-1">
                    다시 찍기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white p-2.5 rounded-xl border border-stone-100">
      <p className="text-[10px] font-bold text-stone-400 uppercase mb-0.5">{label}</p>
      <p className="text-xs font-semibold text-stone-700 truncate">{value}</p>
    </div>
  );
}

import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CommunityPost } from '../types';

export default function Community({ posts }: { posts: CommunityPost[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-stone-800">커뮤니티</h2>
        <Button size="sm" className="bg-stone-900 rounded-full h-8 px-4">작성하기</Button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="border-none shadow-none bg-white rounded-3xl overflow-hidden">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-stone-100 shadow-sm">
                  <AvatarImage src={post.userAvatar} />
                  <AvatarFallback>{post.userName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-stone-900">{post.userName}</p>
                  <p className="text-[10px] text-stone-400">{post.timestamp}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400">
                <MoreHorizontal size={18} />
              </Button>
            </CardHeader>
            
            <CardContent className="px-4 py-2 space-y-3">
              <p className="text-sm text-stone-700 leading-relaxed">
                {post.content}
              </p>
              {post.image && (
                <div className="rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video">
                  <img 
                    src={post.image} 
                    alt="Post" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </CardContent>

            <CardFooter className="px-4 py-3 border-t border-stone-50 flex items-center gap-6">
              <button className="flex items-center gap-1.5 text-stone-400 transition-colors hover:text-rose-500">
                <Heart size={20} />
                <span className="text-xs font-bold">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-stone-400 transition-colors hover:text-emerald-600">
                <MessageCircle size={20} />
                <span className="text-xs font-bold">12</span>
              </button>
              <button className="flex items-center gap-1.5 text-stone-400 ml-auto">
                <Share2 size={20} />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

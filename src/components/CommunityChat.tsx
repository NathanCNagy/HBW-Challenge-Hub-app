import React, { useState } from 'react';
import { MessageSquare, Send, Users, Sparkles, Hash, Slack, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

interface CommunityChatProps {
  category: 'Environment' | 'Well-Being' | 'Compassion' | 'Responsible AI';
  goalTitle: string;
}

interface ChatMessage {
  id: number;
  author: string;
  avatar: string;
  message: string;
  time: string;
  likes: number;
  hasLiked?: boolean;
}

export default function CommunityChat({ category, goalTitle }: CommunityChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      author: 'Sophia Chen',
      avatar: '🥑',
      message: 'Just swapped out my beef lunch for red lentil soup! Surprised by how filling it was, and love knowing the difference it makes.',
      time: '12:04 PM',
      likes: 8
    },
    {
      id: 2,
      author: 'Marcus Vance',
      avatar: '🚴',
      message: 'Rode the transit route to the office today. 25 minutes of reading instead of 30 minutes of road rage. Win-win.',
      time: '1:15 PM',
      likes: 12
    },
    {
      id: 3,
      author: 'Elena Rostova',
      avatar: '🌻',
      message: 'Planted purple cone flowers in my 1x1m patch! Saw a bumblebee landing on them within three hours. Absolutely magical.',
      time: '2:30 PM',
      likes: 15
    },
    {
      id: 4,
      author: 'David K.',
      avatar: '🧠',
      message: 'Drafted my email reply first before letting the LLM refine it. Kept my actual tone intact and preserved my focus. Small habits matter.',
      time: '3:10 PM',
      likes: 5
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: ChatMessage = {
      id: messages.length + 1,
      author: 'You',
      avatar: '🌟',
      message: newMessage,
      time: 'Just now',
      likes: 0
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const handleToggleLike = (id: number) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          likes: m.hasLiked ? m.likes - 1 : m.likes + 1,
          hasLiked: !m.hasLiked
        };
      }
      return m;
    }));
  };

  const slackChannelName = {
    'Environment': 'hbw-climate-action',
    'Well-Being': 'hbw-vitality-circle',
    'Compassion': 'hbw-kindness-ripple',
    'Responsible AI': 'hbw-responsible-ai'
  }[category] || 'hbw-global';

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Slack Integration Callout */}
      <div className="p-4 bg-slate-950 border border-[#002246] rounded-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#3F0E40] flex items-center justify-center text-white text-sm font-bold">
              <Slack className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider leading-none">
                Slack Community Workspace
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">#{slackChannelName}</span>
            </div>
          </div>
          
          <a
            href="https://slack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#4A154B] hover:bg-[#611f62] active:scale-95 text-white font-sans font-bold text-2xs rounded-xl transition-all shadow-md"
          >
            Open Slack
          </a>
        </div>
        
        <p className="text-[10px] text-slate-400 font-sans leading-normal">
          Connect your milestones directly with other members in our community. Sharing your journey and checking in with friends makes building habits much easier!
        </p>
      </div>

      {/* Simulated Live Group Feed */}
      <div className="p-4 bg-[#00050c] border border-[#002246] rounded-2xl flex flex-col h-[340px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#002246]/60 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-[#0285ff]" />
            <span className="text-xs font-sans font-bold text-white uppercase tracking-wider">
              {slackChannelName}
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            142 online
          </span>
        </div>

        {/* Message Feed Area */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 flex flex-col justify-start">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-2.5 items-start text-xs border-b border-[#00172f]/40 pb-2">
              <div className="w-7 h-7 rounded-full bg-[#00172f] border border-[#002246] flex items-center justify-center shrink-0 text-base select-none">
                {msg.avatar}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-slate-200 text-xs">{msg.author}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{msg.time}</span>
                </div>
                <p className="text-slate-300 font-sans leading-normal text-2xs">
                  {msg.message}
                </p>
                <button
                  onClick={() => handleToggleLike(msg.id)}
                  className={`mt-1 flex items-center gap-1 px-2 py-0.5 rounded-md border text-[9px] font-semibold transition-all ${
                    msg.hasLiked
                      ? 'bg-[#0285ff]/25 border-[#0285ff] text-white'
                      : 'bg-black/30 border-[#002246]/40 text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <span>👍</span>
                  <span>{msg.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Input box */}
        <form onSubmit={handleSendMessage} className="mt-3 flex gap-1.5 pt-2 border-t border-[#002246]/40">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Post check-in for ${goalTitle}...`}
            className="flex-1 bg-black text-slate-200 border border-[#002246] focus:border-[#0285ff] outline-none text-2xs px-3 py-1.5 rounded-xl transition-all shadow-inner font-sans"
          />
          <button
            type="submit"
            className="p-1.5 bg-[#0285ff] hover:bg-[#0075e3] active:scale-95 text-white rounded-xl transition-all shrink-0 shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

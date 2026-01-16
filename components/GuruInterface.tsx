
import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Mic, Settings } from 'lucide-react';
import { GuruType, Message } from '../types';
import { askGuru } from '../services/gemini';

interface GuruInterfaceProps {
  guru: GuruType;
  onBack: () => void;
}

const GuruInterface: React.FC<GuruInterfaceProps> = ({ guru, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Greetings. I am your ${guru}. How may I guide your practice today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await askGuru(guru, input, messages);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col md:flex-row">
      {/* Sidebar for Mobile */}
      <div className="md:w-80 border-r border-gray-100 p-6 flex flex-col bg-gray-50/50">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-black mb-12 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Platform
        </button>

        <div className="mb-8">
          <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600 mb-4">
            <Settings className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold">{guru}</h2>
          <p className="text-sm text-gray-400 mt-2">Active Session: Mastery Level 4</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Technique</p>
            <p className="font-medium">Nadi Shodhana</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Focus Mode</p>
            <p className="font-medium">Parasympathetic</p>
          </div>
        </div>

        <div className="mt-auto">
          <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold">
            Start Live Practice
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative h-full">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 pb-32"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-3xl ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-lg' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}>
                <p className="text-base leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-3xl rounded-bl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent">
          <div className="max-w-3xl mx-auto flex items-center space-x-4 bg-white border border-gray-200 rounded-full px-6 py-2 shadow-xl">
            <button className="text-gray-400 hover:text-indigo-600">
              <Mic className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Speak to the ${guru}...`}
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:bg-gray-200 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuruInterface;

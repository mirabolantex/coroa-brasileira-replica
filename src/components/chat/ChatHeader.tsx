
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface ChatHeaderProps {
  foto: string;
  nome: string;
  isTyping: boolean;
  onBack: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ foto, nome, isTyping, onBack }) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-800">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onBack}
        className="mr-2"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      
      <img 
        src={foto} 
        alt={nome} 
        className="w-10 h-10 rounded-full object-cover mr-3"
      />
      
      <div>
        <h3 className="font-semibold">{nome}</h3>
        <p className="text-xs text-gray-400">
          {isTyping ? "digitando..." : "Online agora"}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;

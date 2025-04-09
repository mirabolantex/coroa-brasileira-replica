
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';

interface ChatInputProps {
  needsVIP: boolean;
  isUserTurn: boolean;
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onGoToVipPage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  needsVIP,
  isUserTurn,
  isTyping,
  onSendMessage,
  onGoToVipPage
}) => {
  const [mensagem, setMensagem] = useState('');

  const handleSend = () => {
    if (mensagem.trim()) {
      onSendMessage(mensagem);
      setMensagem('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-gray-800 bg-gray-900">
      {needsVIP ? (
        <Button 
          className="btn-gradient w-full"
          onClick={onGoToVipPage}
        >
          Ativar Agora!
        </Button>
      ) : (
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Digite sua mensagem..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            disabled={!isUserTurn || isTyping}
          />
          <Button 
            onClick={handleSend}
            className={`btn-gradient ${(!isUserTurn || isTyping) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isUserTurn || isTyping}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatInput;

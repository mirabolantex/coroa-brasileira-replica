
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Mensagem {
  texto: string;
  enviada: boolean;
  hora: string;
}

interface Conversa {
  id: number;
  nome: string;
  foto: string;
  mensagens: Mensagem[];
}

interface ChatInterfaceProps {
  conversa: Conversa;
  onSendMessage: (idConversa: number, texto: string) => void;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversa, onSendMessage, onBack }) => {
  const [mensagem, setMensagem] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [conversa.mensagens]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = () => {
    if (mensagem.trim()) {
      onSendMessage(conversa.id, mensagem);
      setMensagem("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-220px)] max-w-md mx-auto">
      {/* Chat Header */}
      <div className="flex items-center p-3 border-b">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2" 
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <img 
          src={conversa.foto} 
          alt={conversa.nome} 
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        
        <div>
          <h3 className="font-semibold">{conversa.nome}</h3>
          <p className="text-xs text-gray-500">Online agora</p>
        </div>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {conversa.mensagens.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.enviada ? 'justify-end' : 'justify-start'}`}
          >
            <div className={msg.enviada ? 'message-bubble-sent' : 'message-bubble-received'}>
              <p>{msg.texto}</p>
              <span className="text-xs opacity-70 block text-right mt-1">
                {msg.hora}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input */}
      <div className="p-3 border-t flex gap-2">
        <Input
          placeholder="Digite sua mensagem..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button 
          onClick={handleSendMessage}
          disabled={!mensagem.trim()}
          className="bg-coroa-purple hover:bg-coroa-purple/90"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;

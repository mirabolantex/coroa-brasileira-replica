
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from 'lucide-react';

interface Mensagem {
  texto: string;
  enviada: boolean;
  hora: string;
  isBot?: boolean;
}

interface Conversa {
  id: number;
  nome: string;
  foto: string;
  mensagens: Mensagem[];
}

interface ChatInterfaceProps {
  conversa: Conversa;
  onSendMessage: (id: number, texto: string) => void;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversa, onSendMessage, onBack }) => {
  const [mensagem, setMensagem] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [showBotIntro, setShowBotIntro] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = () => {
    if (mensagem.trim()) {
      onSendMessage(conversa.id, mensagem);
      setMensagem('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleConnectToUser = () => {
    setConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      setConnecting(false);
      setShowBotIntro(false);
      
      // Add a system message that the connection is established
      onSendMessage(conversa.id, `Você está conectado com ${conversa.nome}. Boa conversa!`);
    }, 2000);
  };
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversa.mensagens]);
  
  return (
    <div className="flex flex-col h-[75vh] max-h-[75vh] bg-gray-950 rounded-lg overflow-hidden">
      {/* Chat Header */}
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
          src={conversa.foto} 
          alt={conversa.nome} 
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        
        <div>
          <h3 className="font-semibold">{conversa.nome}</h3>
          <p className="text-xs text-gray-400">Online agora</p>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {showBotIntro ? (
          <div className="bg-gray-800 rounded-lg p-5 max-w-[80%] mx-auto shadow">
            <div className="flex items-center mb-3">
              <img 
                src="https://app.majestadeprivada.space/wp-content/uploads/2025/04/logo-1.png"
                alt="Bot" 
                className="w-8 h-8 mr-2 rounded-full"
              />
              <span className="font-bold text-coroa-purple">Suporte Majestade Privada</span>
            </div>
            <p className="text-gray-300 mb-3">
              Olá! Esta é a sua conversa com {conversa.nome}.
            </p>
            <p className="text-gray-300 mb-3">
              Sou seu assistente virtual no app 'Majestade Privada'. Aqui, irei conectar você com mulheres ricas e maduras cheias de fetiches.
            </p>
            <p className="text-gray-300 mb-3">
              Valorizamos a privacidade e liberdade dos nossos membros — seja respeitoso e será bem recompensado.
            </p>
            <p className="text-gray-300 mb-5">
              Posso conectar você com {conversa.nome}.
            </p>
            <Button 
              className="btn-gradient w-full"
              onClick={handleConnectToUser}
              disabled={connecting}
            >
              {connecting ? "Conectando..." : "Conectar"}
            </Button>
          </div>
        ) : (
          <>
            {conversa.mensagens.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.enviada ? 'justify-end' : 'justify-start'}`}
              >
                <div className={msg.enviada ? 'message-bubble-sent' : 'message-bubble-received'}>
                  {!msg.enviada && msg.isBot && (
                    <div className="text-xs text-gray-400 mb-1">Sistema</div>
                  )}
                  <div>{msg.texto}</div>
                  <div className="text-xs opacity-70 text-right mt-1">{msg.hora}</div>
                </div>
              </div>
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      {!showBotIntro && (
        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Digite sua mensagem..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              className="btn-gradient"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;

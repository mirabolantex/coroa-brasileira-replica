
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import ChatHeader from './chat/ChatHeader';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';
import VIPDialog from './chat/VIPDialog';
import ConversationFlow from './chat/ConversationFlow';
import { useNavigate } from 'react-router-dom';

interface Mensagem {
  texto: string;
  enviada: boolean;
  hora: string;
  isBot?: boolean;
  isGiftCard?: boolean;
  giftValue?: number;
  giftClaimed?: boolean;
  isImage?: boolean;
  imageUrl?: string;
  isBlurred?: boolean;
  isContactCard?: boolean;
}

interface Conversa {
  id: number;
  nome: string;
  foto: string;
  mensagens: Mensagem[];
  stage?: number;
  isTyping?: boolean;
  needsVIP?: boolean;
}

interface ChatInterfaceProps {
  conversa: Conversa;
  onSendMessage: (id: number, texto: string) => void;
  onBack: () => void;
  onUpdateConversa: (conversa: Conversa) => void;
  cidade: string;
  balance: number;
  onAddBalance: (amount: number) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  conversa, 
  onSendMessage, 
  onBack, 
  onUpdateConversa,
  cidade,
  balance,
  onAddBalance
}) => {
  const [connecting, setConnecting] = useState(false);
  const [showBotIntro, setShowBotIntro] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [showVIPDialog, setShowVIPDialog] = useState(false);
  const navigate = useNavigate();
  
  const handleSendMessage = (texto: string) => {
    if (!isUserTurn) {
      toast.error("Aguarde a resposta antes de enviar outra mensagem");
      return;
    }
    
    if (conversa.needsVIP) {
      setShowVIPDialog(true);
      return;
    }
    
    if (texto.trim()) {
      onSendMessage(conversa.id, texto);
      
      // Update user turn and move to next stage
      setIsUserTurn(false);
      
      // Increment stage
      const nextStage = conversa.stage ? conversa.stage + 1 : 1;
      onUpdateConversa({
        ...conversa,
        stage: nextStage
      });
    }
  };
  
  const handleConnectToUser = () => {
    setConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      setConnecting(false);
      setShowBotIntro(false);
      
      // Add a system message that the connection is established
      const newMessage = {
        texto: `Agora você está conectado com ${conversa.nome}.`,
        enviada: false,
        isBot: true,
        hora: new Date().toLocaleTimeString().slice(0, 5)
      };
      
      onUpdateConversa({
        ...conversa,
        mensagens: [...conversa.mensagens, newMessage],
        stage: 0,  // Set to 0 initially, will increment when user sends first message
        isTyping: false
      });
      
      // Set user turn to true since we want the user to send the first message
      setIsUserTurn(true);
    }, 2000);
  };
  
  const handleUnblurImage = (index: number) => {
    if (balance < 1.5) {
      toast.error("Saldo insuficiente para desbloquear a imagem");
      return;
    }
    
    // Deduct from balance
    onAddBalance(-1.5);
    
    // Unblur the image
    const updatedMensagens = [...conversa.mensagens];
    updatedMensagens[index] = {
      ...updatedMensagens[index],
      isBlurred: false
    };
    
    onUpdateConversa({
      ...conversa,
      mensagens: updatedMensagens
    });
    
    toast.success("Imagem desbloqueada com sucesso!");
  };
  
  const handleClaimGift = (index: number, value: number) => {
    // Update message to show claimed
    const updatedMensagens = [...conversa.mensagens];
    updatedMensagens[index] = {
      ...updatedMensagens[index],
      giftClaimed: true
    };
    
    onUpdateConversa({
      ...conversa,
      mensagens: updatedMensagens
    });
    
    // Add to balance
    onAddBalance(value);
    
    toast.success(`R$${value.toFixed(2)} adicionado à sua carteira!`);
  };
  
  const handleGoToVipPage = () => {
    window.location.href = "https://go.disruptybr.click/ples9hgo7e";
  };
  
  return (
    <div className="flex flex-col h-[75vh] max-h-[75vh] bg-gray-950 rounded-lg overflow-hidden">
      {/* Chat Header */}
      <ChatHeader 
        foto={conversa.foto}
        nome={conversa.nome}
        isTyping={conversa.isTyping || false}
        onBack={onBack}
      />
      
      {/* Conversation Flow Logic */}
      <ConversationFlow
        conversa={conversa}
        isUserTurn={isUserTurn}
        showBotIntro={showBotIntro}
        cidade={cidade}
        onUpdateConversa={onUpdateConversa}
        setIsUserTurn={setIsUserTurn}
      />
      
      {/* Chat Messages */}
      <MessageList 
        mensagens={conversa.mensagens}
        isTyping={conversa.isTyping || false}
        showBotIntro={showBotIntro}
        nome={conversa.nome}
        connecting={connecting}
        cidade={cidade}
        onConnectToUser={handleConnectToUser}
        onUnblurImage={handleUnblurImage}
        onClaimGift={handleClaimGift}
        onShowVIPDialog={() => setShowVIPDialog(true)}
      />
      
      {/* VIP Dialog */}
      <VIPDialog 
        open={showVIPDialog}
        onOpenChange={setShowVIPDialog}
        balance={balance}
        onGoToVipPage={handleGoToVipPage}
      />
      
      {/* Chat Input */}
      {!showBotIntro && (
        <ChatInput 
          needsVIP={conversa.needsVIP || false}
          isUserTurn={isUserTurn}
          isTyping={conversa.isTyping || false}
          onSendMessage={handleSendMessage}
          onGoToVipPage={handleGoToVipPage}
        />
      )}
    </div>
  );
};

export default ChatInterface;

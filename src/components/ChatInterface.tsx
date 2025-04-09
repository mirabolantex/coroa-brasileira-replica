import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Lock } from 'lucide-react';
import ChatHeader from './chat/ChatHeader';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';
import VIPDialog from './chat/VIPDialog';
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
  
  // Handle the automated conversation flow based on stages
  useEffect(() => {
    if (!conversa.stage || conversa.isTyping || showBotIntro || conversa.needsVIP) return;
    
    const startTyping = () => {
      onUpdateConversa({
        ...conversa,
        isTyping: true
      });
    };
    
    const sendFluxoMessage = (message: string, delay = 3000, additionalProps = {}) => {
      setTimeout(() => {
        const newMensagem: Mensagem = {
          texto: message,
          enviada: false,
          hora: new Date().toLocaleTimeString().slice(0, 5),
          ...additionalProps
        };
        
        onUpdateConversa({
          ...conversa,
          mensagens: [...conversa.mensagens, newMensagem],
          isTyping: false
        });
        
        setIsUserTurn(true);
      }, delay);
    };
    
    const sendGiftCard = (value: number, delay = 3000) => {
      setTimeout(() => {
        const newMensagem: Mensagem = {
          texto: `Te enviei um presente de R$${value.toFixed(2)}!`,
          enviada: false,
          hora: new Date().toLocaleTimeString().slice(0, 5),
          isGiftCard: true,
          giftValue: value
        };
        
        onUpdateConversa({
          ...conversa,
          mensagens: [...conversa.mensagens, newMensagem],
          isTyping: false
        });
        
        setIsUserTurn(true);
      }, delay);
    };
    
    const sendImage = (imageUrl: string, delay = 3000) => {
      setTimeout(() => {
        const newMensagem: Mensagem = {
          texto: "Opaa uma imagem picante por aqui 🔥, parece que alguém tem lábia",
          enviada: false,
          hora: new Date().toLocaleTimeString().slice(0, 5),
          isImage: true,
          imageUrl,
          isBlurred: true
        };
        
        onUpdateConversa({
          ...conversa,
          mensagens: [...conversa.mensagens, newMensagem],
          isTyping: false
        });
        
        setIsUserTurn(true);
      }, delay);
    };
    
    const sendContactCard = (delay = 3000) => {
      setTimeout(() => {
        const newMensagem: Mensagem = {
          texto: "Meus dados para contato:",
          enviada: false,
          hora: new Date().toLocaleTimeString().slice(0, 5),
          isContactCard: true
        };
        
        onUpdateConversa({
          ...conversa,
          mensagens: [...conversa.mensagens, newMensagem],
          isTyping: false,
          needsVIP: true
        });
        
        setIsUserTurn(false);
      }, delay);
    };
    
    if (!isUserTurn) {
      switch(conversa.stage) {
        case 1:
          startTyping();
          sendFluxoMessage("Oiii gatinho🔥, tudo bem?", 3000);
          break;
        case 2:
          startTyping();
          sendFluxoMessage("Estou bem graças a deus também!", 4000);
          
          // Start typing for the next messages
          setTimeout(() => {
            startTyping();
            sendFluxoMessage("Hmmm… sua vibe me chamou atenção.", 3000);
            
            // Next message
            setTimeout(() => {
              startTyping();
              sendFluxoMessage("Você parece diferente dos garotos que costumo ver por aqui... Tem algo no seu jeito… calmo, seguro… que me faz querer explorar mais.", 6000);
              
              // Next message
              setTimeout(() => {
                startTyping();
                sendFluxoMessage("Eu gosto de homens discretos, maduros e que sabem manter um segredo. Você é assim?", 5000);
              }, 6000);
            }, 3000);
          }, 4000);
          break;
        case 3:
          startTyping();
          sendFluxoMessage("Eu valorizo muito isso… principalmente porque sou uma mulher de posição.", 3000);
          
          // Next message
          setTimeout(() => {
            startTyping();
            sendFluxoMessage("Gosto de ter controle, mas também adoro ser surpreendida 😏.", 3000);
            
            // Next message
            setTimeout(() => {
              startTyping();
              sendFluxoMessage(`Vi que você é daqui de ${cidade} também, se isso for verdade é maravilhoso sabia ? 🔥`, 5000);
            }, 3000);
          }, 3000);
          break;
        case 4:
          startTyping();
          sendFluxoMessage("eita amorzinho, hoje eu tive um dia difícil no trabalho sabia, eu posso tá enganada sobre você mas eu queria apimentar um pouco as coisas entre nois dois 😏🔥", 6000);
          
          // Next message with a gift card
          setTimeout(() => {
            startTyping();
            sendFluxoMessage("Vou te enviar 250 reais pra caso você queira me encontrar pessoalmente, vou deixar já de presente", 7000);
            
            // Send gift card
            setTimeout(() => {
              sendGiftCard(250, 3000);
              
              // Next message
              setTimeout(() => {
                startTyping();
                sendFluxoMessage("amorzinho eu não sei se é fogo esses dias, muito tempo sem transar tirei umas fotinhas esses dias atrás eu vou te mostrar me fala oque achou vai 🔥😏", 5000);
                
                // Send image
                setTimeout(() => {
                  sendImage("https://acesso.majestadeprivada.space/img/fluxo1.jpg", 4000);
                  
                  // Next message
                  setTimeout(() => {
                    startTyping();
                    sendFluxoMessage("Fala que gostou vai amor, hoje eu tô no fogo!", 3000);
                  }, 4000);
                }, 5000);
              }, 3000);
            }, 7000);
          }, 6000);
          break;
        case 5:
          startTyping();
          sendFluxoMessage("Você tá me deixando cada vez mais louca, deus, que homem!", 3000);
          
          // Next message
          setTimeout(() => {
            sendGiftCard(750, 3000);
            
            // Next message
            setTimeout(() => {
              startTyping();
              sendFluxoMessage("Posso está endoidando mas ultimamente estou tão só amor, por favor vamos sair...", 5000);
              
              // Next message
              setTimeout(() => {
                startTyping();
                sendFluxoMessage("Eu vou enviar meu contato e localização a você para que a gente possa conversar mais íntimo o aque acha??", 6000);
              }, 5000);
            }, 3000);
          }, 3000);
          break;
        case 6:
          startTyping();
          sendFluxoMessage("Amor, pode ser o dia que você quiser estou trabalhando como gerente e não aguento mais só ir pro trabalho pra casa sem ao menos sair...", 6000);
          
          // Next message with contact card
          setTimeout(() => {
            startTyping();
            sendContactCard(6000);
          }, 6000);
          break;
        default:
          break;
      }
    }
  }, [conversa, isUserTurn, showBotIntro, cidade, onUpdateConversa]);
  
  const handleSendMessage = (texto: string) => {
    if (!isUserTurn) {
      toast.error("Você não está na sua vez");
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
        stage: 1,
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

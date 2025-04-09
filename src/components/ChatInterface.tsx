
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Lock } from 'lucide-react';
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
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
  const [mensagem, setMensagem] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [showBotIntro, setShowBotIntro] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [showVIPDialog, setShowVIPDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Automatically scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversa.mensagens, conversa.isTyping]);

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
  
  const handleSendMessage = () => {
    if (!isUserTurn) {
      toast.error("Você não está na sua vez");
      return;
    }
    
    if (conversa.needsVIP) {
      setShowVIPDialog(true);
      return;
    }
    
    if (mensagem.trim()) {
      onSendMessage(conversa.id, mensagem);
      setMensagem('');
      
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
          <p className="text-xs text-gray-400">
            {conversa.isTyping ? "digitando..." : "Online agora"}
          </p>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {showBotIntro ? (
          <div className="bg-gray-800 rounded-lg p-5 max-w-[80%] mx-auto shadow">
            <div className="flex items-center mb-3">
              <span className="font-bold text-coroa-purple">Assistente Majestade Privada</span>
            </div>
            <p className="text-gray-300 mb-3">
              Olá! Esta é a sua conversa com {conversa.nome}.
            </p>
            <p className="text-gray-300 mb-5">
              Posso conectar você com {conversa.nome}.
            </p>
            <Button 
              className="btn-gradient w-full"
              onClick={handleConnectToUser}
              disabled={connecting}
            >
              {connecting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Conectando...
                </>
              ) : (
                "Conectar"
              )}
            </Button>
          </div>
        ) : (
          <>
            {conversa.mensagens.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.enviada ? 'justify-end' : 'justify-start'}`}
              >
                {msg.isGiftCard ? (
                  <div className={`rounded-lg p-4 ${msg.giftClaimed ? 'bg-green-900' : 'bg-yellow-900'} text-white max-w-[80%]`}>
                    <p className="font-bold mb-2">Vale Presente</p>
                    <p className="text-2xl font-bold mb-2">R${msg.giftValue?.toFixed(2)}</p>
                    <p className="text-sm mb-2">{msg.texto}</p>
                    {!msg.giftClaimed && (
                      <Button 
                        className="bg-yellow-600 hover:bg-yellow-500 text-white w-full"
                        onClick={() => handleClaimGift(index, msg.giftValue || 0)}
                      >
                        Receber
                      </Button>
                    )}
                    <div className="text-xs opacity-70 text-right mt-1">{msg.hora}</div>
                  </div>
                ) : msg.isImage ? (
                  <div className="bg-gray-800 rounded-lg p-4 max-w-[80%]">
                    <p className="mb-2">{msg.texto}</p>
                    <div className="relative">
                      <img 
                        src={msg.imageUrl} 
                        alt="Imagem" 
                        className={`rounded-lg w-full max-w-xs ${msg.isBlurred ? 'blur-md' : ''}`}
                      />
                      {msg.isBlurred && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <p className="text-white text-center mb-2">1,50 para desbloquear</p>
                          <Button 
                            onClick={() => handleUnblurImage(index)}
                            className="bg-coroa-pink hover:bg-coroa-purple text-white"
                          >
                            Desbloquear
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="text-xs opacity-70 text-right mt-1">{msg.hora}</div>
                  </div>
                ) : msg.isContactCard ? (
                  <div className="bg-gray-800 rounded-lg p-4 max-w-[80%] blur-md relative">
                    <p className="mb-2">{msg.texto}</p>
                    <div className="text-sm mb-2">
                      <p>Telefone: (11) 9****-****</p>
                      <p>Localização: Próximo a {cidade}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        onClick={() => setShowVIPDialog(true)}
                        className="bg-coroa-pink hover:bg-coroa-purple text-white"
                      >
                        Desbloquear
                      </Button>
                    </div>
                    <div className="text-xs opacity-70 text-right mt-1">{msg.hora}</div>
                  </div>
                ) : (
                  <div className={msg.enviada ? 'message-bubble-sent' : 'message-bubble-received'}>
                    {!msg.enviada && msg.isBot && (
                      <div className="text-xs text-gray-400 mb-1">Sistema</div>
                    )}
                    <div>{msg.texto}</div>
                    <div className="text-xs opacity-70 text-right mt-1">{msg.hora}</div>
                  </div>
                )}
              </div>
            ))}
            {conversa.isTyping && (
              <div className="flex justify-start">
                <div className="message-bubble-received">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* VIP Dialog */}
      <Dialog open={showVIPDialog} onOpenChange={setShowVIPDialog}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-center">Ativação V.I.P Necessária</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center">
            <p className="text-lg font-bold mb-4">Seu Saldo: {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            <p className="mb-4">
              Parece que o match prosseguiu... Porém para garantir a segurança de nossos usuários na plataforma todos os usuários devem fazer o V.I.P onde pode compartilhar e ver localizações, contatos pessoais e resgatar presentes acima de R$300 enviados no chat! Mas fique tranquilo é um único pagamento de taxa!
            </p>
            <Button 
              className="btn-gradient w-full mt-4"
              onClick={handleGoToVipPage}
            >
              Ativar Agora!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Chat Input */}
      {!showBotIntro && (
        <div className="p-4 border-t border-gray-800 bg-gray-900">
          {conversa.needsVIP ? (
            <Button 
              className="btn-gradient w-full"
              onClick={handleGoToVipPage}
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
                disabled={!isUserTurn || conversa.isTyping}
              />
              <Button 
                onClick={handleSendMessage}
                className={`btn-gradient ${(!isUserTurn || conversa.isTyping) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isUserTurn || conversa.isTyping}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatInterface;

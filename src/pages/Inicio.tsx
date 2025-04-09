import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "sonner";
import { Heart, X, MessageCircle, User, Bell, Wallet as WalletIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PerfilCard from '@/components/PerfilCard';
import ChatInterface from '@/components/ChatInterface';
import { perfisExpanded } from '@/data/perfisExpanded';

// Interface for conversation message
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

// Interface for conversation
interface Conversa {
  id: number;
  nome: string;
  foto: string;
  mensagens: Mensagem[];
  stage?: number;
  isTyping?: boolean;
  needsVIP?: boolean;
}

const Inicio = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("descobrir");
  const [currentPerfilIndex, setCurrentPerfilIndex] = useState(0);
  const [matchedPerfis, setMatchedPerfis] = useState<number[]>([]);
  const [conversas, setConversas] = useState<Conversa[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [showBotIntro, setShowBotIntro] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [cidade, setCidade] = useState("São Paulo");
  const [balance, setBalance] = useState(0);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [hasLimitedMatches, setHasLimitedMatches] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    // Load saved conversations
    const savedConversas = localStorage.getItem('conversations');
    if (savedConversas) {
      setConversas(JSON.parse(savedConversas));
    }
    
    // Load matched profiles
    const savedMatches = localStorage.getItem('matchedProfiles');
    if (savedMatches) {
      setMatchedPerfis(JSON.parse(savedMatches));
    }
    
    // Load wallet balance
    const savedBalance = localStorage.getItem('walletBalance');
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
    
    // Simulate getting user location
    setTimeout(() => {
      setCidade("São Paulo");
    }, 1000);
  }, []);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversas));
  }, [conversas]);
  
  useEffect(() => {
    localStorage.setItem('matchedProfiles', JSON.stringify(matchedPerfis));
  }, [matchedPerfis]);
  
  useEffect(() => {
    localStorage.setItem('walletBalance', balance.toString());
  }, [balance]);

  const handleLike = () => {
    const currentPerfil = perfisExpanded[currentPerfilIndex];
    
    if (matchedPerfis.length > 0 && hasLimitedMatches) {
      toast.error("Sua conta é nova, apenas 1 match por vez é permitido", {
        description: "Vá para a aba Mensagens para conversar com seu match atual",
        action: {
          label: "Mensagens",
          onClick: () => setActiveTab("mensagens")
        }
      });
      return;
    }
    
    // If it's the first profile or random chance, give a match
    if (currentPerfilIndex === 0 || Math.random() > 0.3) {
      // Add to matched profiles list
      setMatchedPerfis(prev => [...prev, currentPerfil.id]);
      
      // Create an empty conversation for this profile
      const novaConversa: Conversa = {
        id: currentPerfil.id,
        nome: currentPerfil.nome,
        foto: currentPerfil.foto,
        mensagens: []
      };
      
      setConversas(prev => {
        // Check if conversation already exists
        const existingConversation = prev.find(c => c.id === currentPerfil.id);
        if (!existingConversation) {
          return [...prev, novaConversa];
        }
        return prev;
      });
      
      // Show success notification with action to go to messages
      toast.success("Você tem um novo match!", {
        description: `${currentPerfil.nome} também gostou de você! Converse agora.`,
        action: {
          label: "Mensagens",
          onClick: () => {
            setActiveTab("mensagens");
            setSelectedChat(currentPerfil.id);
            setCurrentChatId(currentPerfil.id);
            setShowBotIntro(true);
          }
        }
      });
      
      // Automatically switch to messages tab and select this chat
      setActiveTab("mensagens");
      setSelectedChat(currentPerfil.id);
      setCurrentChatId(currentPerfil.id);
      setTimeout(() => {
        setShowBotIntro(true);
      }, 500);
    }
    
    // Advance to next profile
    if (currentPerfilIndex < perfisExpanded.length - 1) {
      setCurrentPerfilIndex(prevIndex => prevIndex + 1);
    } else {
      // Restart when profiles end
      setCurrentPerfilIndex(0);
      toast("Você viu todos os perfis disponíveis", {
        description: "Volte mais tarde para ver novos perfis!",
      });
    }
  };

  const handleDislike = () => {
    if (currentPerfilIndex < perfisExpanded.length - 1) {
      setCurrentPerfilIndex(prevIndex => prevIndex + 1);
    } else {
      setCurrentPerfilIndex(0);
      toast("Você viu todos os perfis disponíveis", {
        description: "Volte mais tarde para ver novos perfis!",
      });
    }
  };

  const iniciarConversa = (perfil: {id: number, nome: string, foto: string}) => {
    // Check if conversation with this profile already exists
    const existingConversation = conversas.find(c => c.id === perfil.id);
    
    if (!existingConversation) {
      // Create new conversation
      const novaConversa: Conversa = {
        id: perfil.id,
        nome: perfil.nome,
        foto: perfil.foto,
        mensagens: []
      };
      
      setConversas(prev => [...prev, novaConversa]);
    }
    
    // Open messages tab and select this conversation
    setActiveTab("mensagens");
    setSelectedChat(perfil.id);
    setCurrentChatId(perfil.id);
    setShowBotIntro(true);
  };

  const enviarMensagem = (idConversa: number, texto: string) => {
    if (!texto.trim()) return;
    
    setConversas(prevConversas => {
      return prevConversas.map(conversa => {
        if (conversa.id === idConversa) {
          const novasMensagens = [
            ...conversa.mensagens,
            { texto, enviada: true, hora: new Date().toLocaleTimeString().slice(0, 5) }
          ];
          
          return { ...conversa, mensagens: novasMensagens };
        }
        return conversa;
      });
    });
  };

  const updateConversa = (updatedConversa: Conversa) => {
    setConversas(prevConversas => {
      return prevConversas.map(conversa => {
        if (conversa.id === updatedConversa.id) {
          return updatedConversa;
        }
        return conversa;
      });
    });
  };

  const handleBotConnect = () => {
    setIsLoading(true);
    
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
      setShowBotIntro(false);
      
      // Add a system message that the connection is established
      if (currentChatId) {
        const selectedConversation = conversas.find(c => c.id === currentChatId);
        if (selectedConversation) {
          const newMessage = {
            texto: `Agora você está conectado com ${selectedConversation.nome}.`,
            enviada: false,
            isBot: true,
            hora: new Date().toLocaleTimeString().slice(0, 5)
          };
          
          // Update the conversation with the system message and set stage to 1
          const updatedConversation = {
            ...selectedConversation,
            mensagens: [...selectedConversation.mensagens, newMessage],
            stage: 1,
            isTyping: false
          };
          
          updateConversa(updatedConversation);
        }
      }
    }, 2000);
  };

  const handleQuickReply = (text: string) => {
    if (currentChatId) {
      enviarMensagem(currentChatId, text);
    }
  };
  
  const handleAddBalance = (amount: number) => {
    setBalance(prevBalance => {
      const newBalance = prevBalance + amount;
      return newBalance < 0 ? 0 : newBalance;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm py-3 border-b border-gray-800">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 border border-coroa-purple">
              <AvatarImage src={userProfileImage || undefined} />
              <AvatarFallback className="bg-gray-700 text-white">MP</AvatarFallback>
            </Avatar>
          </div>
          
          <div>
            <div className="text-sm text-gray-400 flex items-center">
              <Bell className="h-3 w-3 mr-1" />
              Localização: {cidade}
            </div>
          </div>
          
          <div className="balance-display px-4 py-2 text-sm">
            R$ {balance.toFixed(2)}
          </div>
        </div>
      </header>
      
      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex justify-center items-center">
            <DialogTitle className="text-2xl text-center gradient-text">Bem-vindo(a) à Majestade Privada!</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <p className="text-center mb-6 text-gray-300">
              Estamos muito felizes em ter você aqui! Prepare-se para conhecer pessoas incríveis e viver momentos inesquecíveis.
            </p>
            <div className="flex justify-center">
              <Button className="btn-gradient" onClick={() => setShowWelcome(false)}>
                Começar a explorar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Bot Intro Dialog */}
      <Dialog open={showBotIntro} onOpenChange={setShowBotIntro}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex justify-center items-center">
            <DialogTitle className="text-xl text-center gradient-text">Assistente Majestade Privada</DialogTitle>
          </DialogHeader>
          {currentChatId && (
            <div className="p-4 text-center">
              <Avatar className="h-16 w-16 mx-auto mb-4">
                <AvatarImage src="/assets/bot-avatar.png" />
                <AvatarFallback className="bg-coroa-purple text-white">MP</AvatarFallback>
              </Avatar>
              <p className="text-gray-300 text-sm mb-4">
                Olá! Esta é sua conversa com {conversas.find(c => c.id === currentChatId)?.nome}.
              </p>
              <p className="text-gray-300 text-sm mb-5">
                Posso conectar você com {conversas.find(c => c.id === currentChatId)?.nome}.
              </p>
              
              <Button 
                className="btn-gradient w-full mt-4" 
                onClick={handleBotConnect}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Conectando...
                  </>
                ) : (
                  "Conectar"
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800">
            <TabsTrigger value="descobrir" className="data-[state=active]:bg-gray-700">Descobrir</TabsTrigger>
            <TabsTrigger value="mensagens" className="data-[state=active]:bg-gray-700">Mensagens</TabsTrigger>
            <TabsTrigger value="carteira" className="data-[state=active]:bg-gray-700">Carteira</TabsTrigger>
          </TabsList>
          
          {/* Descobrir Tab */}
          <TabsContent value="descobrir" className="mt-2">
            <div className="max-w-md mx-auto">
              {perfisExpanded.length > 0 && (
                <div className="relative">
                  <PerfilCard perfil={perfisExpanded[currentPerfilIndex]} />
                  
                  <div className="flex justify-center gap-4 mt-4">
                    <Button 
                      variant="outline" 
                      className="h-14 w-14 rounded-full border-gray-700 bg-gray-800 hover:bg-gray-700" 
                      onClick={handleDislike}
                    >
                      <X className="h-8 w-8 text-gray-400" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-14 w-14 rounded-full border-gray-700 bg-gray-800 hover:bg-gray-700" 
                      onClick={handleLike}
                    >
                      <Heart className="h-8 w-8 text-coroa-pink" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Mensagens Tab */}
          <TabsContent value="mensagens" className="mt-2">
            {selectedChat ? (
              <>
                <ChatInterface 
                  conversa={conversas.find(c => c.id === selectedChat)!} 
                  onSendMessage={enviarMensagem}
                  onBack={() => setSelectedChat(null)}
                  onUpdateConversa={updateConversa}
                  cidade={cidade}
                  balance={balance}
                  onAddBalance={handleAddBalance}
                />
                {/* Only show quick replies after connecting to chat */}
                {conversas.find(c => c.id === selectedChat)?.mensagens.length > 0 && 
                 !conversas.find(c => c.id === selectedChat)?.needsVIP &&
                 !conversas.find(c => c.id === selectedChat)?.isTyping &&
                 conversas.find(c => c.id === selectedChat)?.stage === 1 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      className="text-sm border-coroa-purple text-coroa-purple"
                      onClick={() => handleQuickReply("Oii🔥")}
                    >
                      Oii🔥
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-sm border-coroa-purple text-coroa-purple"
                      onClick={() => handleQuickReply("Oi meu amor")}
                    >
                      Oi meu amor
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-sm border-coroa-purple text-coroa-purple"
                      onClick={() => handleQuickReply("Olá, tudo bem?")}
                    >
                      Olá, tudo bem?
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-white">Suas Conversas</h2>
                {conversas.length > 0 ? (
                  <div className="space-y-3">
                    {conversas.map(conversa => (
                      <Card 
                        key={conversa.id} 
                        className="cursor-pointer hover:bg-gray-800 transition-colors bg-gray-900 border-gray-800"
                        onClick={() => {
                          setSelectedChat(conversa.id);
                          setCurrentChatId(conversa.id);
                          if (conversa.mensagens.length === 0) {
                            setShowBotIntro(true);
                          }
                        }}
                      >
                        <CardContent className="p-4 flex items-center">
                          <img 
                            src={conversa.foto} 
                            alt={conversa.nome} 
                            className="w-14 h-14 rounded-full object-cover mr-4"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{conversa.nome}</h3>
                            {conversa.mensagens.length > 0 ? (
                              <p className="text-sm text-gray-400 truncate">
                                {conversa.mensagens[conversa.mensagens.length - 1].texto}
                              </p>
                            ) : (
                              <p className="text-sm text-gray-400">
                                Inicie uma conversa...
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 border rounded-lg border-gray-800 bg-gray-900">
                    <MessageCircle className="mx-auto h-12 w-12 text-gray-700 mb-4" />
                    <p className="text-gray-300">Você ainda não tem nenhum match ou conversa</p>
                    <p className="text-gray-400 text-sm mt-2">Dê like em alguns perfis para começar</p>
                    <Button 
                      className="mt-4 btn-gradient"
                      onClick={() => setActiveTab("descobrir")}
                    >
                      Começar a explorar
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Carteira Tab */}
          <TabsContent value="carteira" className="mt-2">
            <div className="max-w-md mx-auto">
              <Card className="mb-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 gradient-text">Seu Saldo</h2>
                  <div className="text-4xl font-bold mb-6">{balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                  <Button 
                    className="btn-gradient w-full"
                    onClick={() => navigate('/wallet')}
                  >
                    <WalletIcon className="h-5 w-5 mr-2" />
                    Sacar Agora
                  </Button>
                </CardContent>
              </Card>
              <Button 
                variant="outline" 
                className="mt-4 w-full border-coroa-purple text-coroa-purple"
                onClick={() => setActiveTab("descobrir")}
              >
                <X className="h-4 w-4 mr-2" />
                Voltar para Descobrir
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Inicio;

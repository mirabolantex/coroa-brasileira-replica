import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "sonner";
import { Heart, X, MessageCircle, User, Settings, Bell, Wallet, Crown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from '@/components/Footer';
import PerfilCard from '@/components/PerfilCard';
import ChatInterface from '@/components/ChatInterface';
import { perfisExpanded } from '@/data/perfisExpanded';

const Inicio = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("descobrir");
  const [currentPerfilIndex, setCurrentPerfilIndex] = useState(0);
  const [matchedPerfis, setMatchedPerfis] = useState<number[]>([]);
  const [conversas, setConversas] = useState<{id: number, nome: string, foto: string, mensagens: {texto: string, enviada: boolean, hora: string, isBot?: boolean}[]}[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [showMatchDialog, setShowMatchDialog] = useState(false);
  const [matchedPerfil, setMatchedPerfil] = useState<{id: number, nome: string, foto: string} | null>(null);
  const [cidade, setCidade] = useState("São Paulo");
  const [balance, setBalance] = useState(0);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [hasLimitedMatches, setHasLimitedMatches] = useState(true);

  useEffect(() => {
    // Simular obtenção da localização do usuário
    setTimeout(() => {
      setCidade("São Paulo");
    }, 1000);
  }, []);

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
    
    // Se for o primeiro perfil, sempre dar match
    if (currentPerfilIndex === 0 || Math.random() > 0.3) {
      // Adicionar à lista de matches
      setMatchedPerfis(prev => [...prev, currentPerfil.id]);
      
      // Mostrar notificação de match imediatamente para o primeiro perfil
      if (currentPerfilIndex === 0) {
        setMatchedPerfil(currentPerfil);
        setShowMatchDialog(true);
        
        // Criar uma conversa vazia para este perfil
        const novaConversa = {
          id: currentPerfil.id,
          nome: currentPerfil.nome,
          foto: currentPerfil.foto,
          mensagens: []
        };
        
        setConversas(prev => [...prev, novaConversa]);
      } else {
        // Para os outros perfis, mostrar notificação após alguns segundos
        setTimeout(() => {
          setMatchedPerfil(currentPerfil);
          setShowMatchDialog(true);
          toast(`Você e ${currentPerfil.nome} deram match!`, {
            description: "Comece uma conversa agora!",
            action: {
              label: "Conversar",
              onClick: () => iniciarConversa(currentPerfil)
            },
          });
          
          // Criar uma conversa vazia para este perfil
          const novaConversa = {
            id: currentPerfil.id,
            nome: currentPerfil.nome,
            foto: currentPerfil.foto,
            mensagens: []
          };
          
          setConversas(prev => [...prev, novaConversa]);
        }, Math.random() > 0.5 ? 7000 : 15000); // Randomizar entre 7 ou 15 segundos
      }
    }
    
    // Avançar para o próximo perfil
    if (currentPerfilIndex < perfisExpanded.length - 1) {
      setCurrentPerfilIndex(prevIndex => prevIndex + 1);
    } else {
      // Reiniciar quando acabar os perfis
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
    // Verificar se já existe uma conversa com esse perfil
    const conversaExistente = conversas.find(c => c.id === perfil.id);
    
    if (!conversaExistente) {
      // Criar nova conversa
      const novaConversa = {
        id: perfil.id,
        nome: perfil.nome,
        foto: perfil.foto,
        mensagens: []
      };
      
      setConversas(prev => [...prev, novaConversa]);
    }
    
    // Abrir a aba de mensagens e selecionar esta conversa
    setActiveTab("mensagens");
    setSelectedChat(perfil.id);
    setShowMatchDialog(false);
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
    
    // Simular resposta automatizada após 1-3 segundos
    setTimeout(() => {
      const respostas = [
        "Olá! Adorei seu perfil. Podemos nos conhecer melhor?",
        "Oi! Também gosto de cinema. Qual seu filme favorito?",
        "Que interessante! Você poderia me contar mais sobre isso?",
        "Estou curiosa para te conhecer melhor. Quais são seus hobbies?",
        "Você parece ser uma pessoa divertida! O que gosta de fazer nos fins de semana?",
        "Nossa, temos muito em comum! Você gosta de viajar?",
        "Vejo que você é de São Paulo também. Conhece algum restaurante legal por aqui?"
      ];
      
      const respostaAleatoria = respostas[Math.floor(Math.random() * respostas.length)];
      
      setConversas(prevConversas => {
        return prevConversas.map(conversa => {
          if (conversa.id === idConversa) {
            const novasMensagens = [
              ...conversa.mensagens,
              { texto: respostaAleatoria, enviada: false, hora: new Date().toLocaleTimeString().slice(0, 5) }
            ];
            
            return { ...conversa, mensagens: novasMensagens };
          }
          return conversa;
        });
      });
    }, 1000 + Math.random() * 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm py-3 border-b border-gray-800">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Crown className="text-coroa-purple h-6 w-6 mr-2" />
              <h3 className="text-lg font-bold gradient-text">Majestade Privada</h3>
            </div>
            
            <div className="ml-4">
              <div className="text-sm text-gray-400 flex items-center">
                <Bell className="h-3 w-3 mr-1" />
                Localização: {cidade}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="balance-display px-4 py-2 text-sm">
              R$ {balance.toFixed(2)}
            </div>
            
            <Button 
              onClick={() => navigate('/wallet')}
              variant="ghost"
              className="text-coroa-purple"
              size="icon"
            >
              <Wallet className="h-5 w-5" />
            </Button>
            
            <Button 
              onClick={() => navigate('/perfil')}
              variant="ghost"
              className="text-coroa-purple"
              size="icon"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center gradient-text">Bem-vindo(a) à Majestade Privada!</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <div className="flex justify-center items-center mb-6">
              <Crown className="text-coroa-purple h-12 w-12 mr-2" />
              <h2 className="text-2xl font-bold gradient-text">Majestade Privada</h2>
            </div>
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
      
      {/* Match Dialog */}
      <Dialog open={showMatchDialog} onOpenChange={setShowMatchDialog}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center gradient-text">É um Match! 💖</DialogTitle>
          </DialogHeader>
          {matchedPerfil && (
            <div className="p-6 text-center">
              <img 
                src={matchedPerfil.foto} 
                alt={matchedPerfil.nome} 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-coroa-pink"
              />
              <p className="text-xl mb-6 text-gray-300">
                Você e <span className="font-bold">{matchedPerfil.nome}</span> deram match!
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" className="border-gray-700 text-gray-300" onClick={() => setShowMatchDialog(false)}>
                  Continuar explorando
                </Button>
                <Button className="btn-gradient" onClick={() => iniciarConversa(matchedPerfil)}>
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Iniciar conversa
                </Button>
              </div>
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
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-800">
            <TabsTrigger value="descobrir" className="data-[state=active]:bg-gray-700">Descobrir</TabsTrigger>
            <TabsTrigger value="mensagens" className="data-[state=active]:bg-gray-700">Mensagens</TabsTrigger>
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
              <ChatInterface 
                conversa={conversas.find(c => c.id === selectedChat)!} 
                onSendMessage={enviarMensagem}
                onBack={() => setSelectedChat(null)}
              />
            ) : (
              <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-white">Suas Conversas</h2>
                {conversas.length > 0 ? (
                  <div className="space-y-3">
                    {conversas.map(conversa => (
                      <Card 
                        key={conversa.id} 
                        className="cursor-pointer hover:bg-gray-800 transition-colors bg-gray-900 border-gray-800"
                        onClick={() => setSelectedChat(conversa.id)}
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
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Inicio;

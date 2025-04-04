
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Heart, X, MessageCircle, User, Settings, Bell } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from '@/components/Footer';
import PerfilCard from '@/components/PerfilCard';
import ChatInterface from '@/components/ChatInterface';
import { perfis } from '@/data/perfis';

const Inicio = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("descobrir");
  const [currentPerfilIndex, setCurrentPerfilIndex] = useState(0);
  const [matchedPerfis, setMatchedPerfis] = useState<number[]>([]);
  const [conversas, setConversas] = useState<{id: number, nome: string, foto: string, mensagens: {texto: string, enviada: boolean, hora: string}[]}[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [showMatchDialog, setShowMatchDialog] = useState(false);
  const [matchedPerfil, setMatchedPerfil] = useState<{id: number, nome: string, foto: string} | null>(null);
  const [cidade, setCidade] = useState("São Paulo");

  useEffect(() => {
    // Simular obtenção da localização do usuário
    setTimeout(() => {
      setCidade("São Paulo");
    }, 1000);

    // Para demonstração, iniciar com algumas conversas existentes
    setConversas([
      {
        id: 2,
        nome: "Sandra M.",
        foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80",
        mensagens: [
          { texto: "Olá, tudo bem com você?", enviada: false, hora: "14:30" },
          { texto: "Oi Sandra! Tudo ótimo e contigo?", enviada: true, hora: "14:32" },
          { texto: "Estou bem! Gostei do seu perfil, você parece ser uma pessoa interessante.", enviada: false, hora: "14:35" }
        ]
      }
    ]);
  }, []);

  const handleLike = () => {
    const currentPerfil = perfis[currentPerfilIndex];
    
    // Simulação de match - 70% de chance
    const isMatch = Math.random() > 0.3;
    
    if (isMatch) {
      // Adicionar à lista de matches
      setMatchedPerfis(prev => [...prev, currentPerfil.id]);
      
      // Mostrar notificação de match após alguns segundos
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
      }, Math.random() > 0.5 ? 7000 : 15000); // Randomizar entre 7 ou 15 segundos
    }
    
    // Avançar para o próximo perfil
    if (currentPerfilIndex < perfis.length - 1) {
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
    if (currentPerfilIndex < perfis.length - 1) {
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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <img 
            src="/placeholder.svg" 
            alt="Minha Coroa Brasileira" 
            className="h-10" 
          />
          
          <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
            <Bell className="h-4 w-4 mr-1" />
            Localização: {cidade}
          </div>
          
          <button 
            onClick={() => navigate('/perfil')}
            className="text-coroa-purple hover:text-coroa-pink transition-colors"
          >
            <User className="h-6 w-6" />
          </button>
        </div>
      </header>
      
      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Bem-vindo(a) ao Minha Coroa Brasileira!</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <p className="text-center mb-6">
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
        <DialogContent className="sm:max-w-md">
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
              <p className="text-xl mb-6">
                Você e <span className="font-bold">{matchedPerfil.nome}</span> deram match!
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setShowMatchDialog(false)}>
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
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="descobrir">Descobrir</TabsTrigger>
            <TabsTrigger value="mensagens">Mensagens</TabsTrigger>
          </TabsList>
          
          {/* Descobrir Tab */}
          <TabsContent value="descobrir" className="mt-2">
            <div className="max-w-md mx-auto">
              {perfis.length > 0 && (
                <div className="relative">
                  <PerfilCard perfil={perfis[currentPerfilIndex]} />
                  
                  <div className="flex justify-center gap-4 mt-4">
                    <Button 
                      variant="outline" 
                      className="h-14 w-14 rounded-full" 
                      onClick={handleDislike}
                    >
                      <X className="h-8 w-8 text-gray-400" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-14 w-14 rounded-full" 
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
                <h2 className="text-xl font-semibold mb-4">Suas Conversas</h2>
                {conversas.length > 0 ? (
                  <div className="space-y-3">
                    {conversas.map(conversa => (
                      <Card 
                        key={conversa.id} 
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setSelectedChat(conversa.id)}
                      >
                        <CardContent className="p-4 flex items-center">
                          <img 
                            src={conversa.foto} 
                            alt={conversa.nome} 
                            className="w-14 h-14 rounded-full object-cover mr-4"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{conversa.nome}</h3>
                            {conversa.mensagens.length > 0 && (
                              <p className="text-sm text-gray-600 truncate">
                                {conversa.mensagens[conversa.mensagens.length - 1].texto}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 border rounded-lg">
                    <MessageCircle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500">Você ainda não tem nenhum match ou conversa</p>
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

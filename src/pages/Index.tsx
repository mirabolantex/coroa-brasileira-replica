import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Link } from 'react-router-dom';
import { CheckCircle2, Crown, Heart, MessageCircle, Shield, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const testimonials = [
  {
    name: 'Carlos S.',
    age: 28,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    quote: 'Conheci uma mulher incrível aqui! Ela tem 45 anos e nos conectamos instantaneamente. Estamos juntos há 6 meses. Obrigado Majestade Privada!'
  },
  {
    name: 'Sandra M.',
    age: 42,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80',
    quote: 'Depois de meu divórcio, achei que não encontraria mais ninguém. Este site mudou minha vida! Os homens aqui realmente valorizam a maturidade.'
  },
  {
    name: 'Marcos P.',
    age: 32,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    quote: 'Sempre me interessei por mulheres mais velhas e maduras. Finalmente um lugar onde isso é celebrado! Recomendo a todos.'
  }
];

const features = [
  {
    icon: <Heart className="h-12 w-12 text-coroa-purple" />,
    title: 'Combinações de Qualidade',
    description: 'Nosso algoritmo inteligente conecta você a pessoas realmente compatíveis, baseado em interesses e preferências.'
  },
  {
    icon: <Shield className="h-12 w-12 text-coroa-purple" />,
    title: 'Segurança Garantida',
    description: 'Verificamos todos os perfis manualmente para garantir uma comunidade autêntica e segura.'
  },
  {
    icon: <MessageCircle className="h-12 w-12 text-coroa-purple" />,
    title: 'Comunicação Fácil',
    description: 'Chat intuitivo, videochamadas e ferramentas de mensagens que facilitam o início de conversas interessantes.'
  },
  {
    icon: <Crown className="h-12 w-12 text-coroa-purple" />,
    title: 'Eventos Exclusivos',
    description: 'Membros premium têm acesso a eventos virtuais e presenciais para conhecer pessoas especiais.'
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Encontre Sua Majestade Ideal</h1>
              <p className="text-xl mb-8">
                O melhor site de relacionamento para mulheres maduras e homens que as admiram no Brasil. Conecte-se com pessoas incríveis em busca de relacionamentos verdadeiros.
              </p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>+50.000 Usuários Ativos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>+10.000 Histórias de Sucesso</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>100% Seguro</span>
                </div>
              </div>
              <Link to="/cadastro">
                <Button size="lg" className="bg-white text-coroa-purple hover:bg-gray-100 transition-colors text-lg">
                  Comece Agora – É Grátis!
                </Button>
              </Link>
            </div>
            
            <div className="lg:w-1/2 bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6 text-center">
                Crie Sua Conta Gratuitamente
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-1">
                      Eu sou
                    </label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homem">Homem</SelectItem>
                        <SelectItem value="mulher">Mulher</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="looking" className="block text-sm font-medium text-gray-300 mb-1">
                      Procurando por
                    </label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homem">Homem</SelectItem>
                        <SelectItem value="mulher">Mulher</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <Input type="email" id="email" placeholder="seu.email@exemplo.com" className="bg-gray-800 border-gray-700" />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Senha
                  </label>
                  <Input type="password" id="password" placeholder="********" className="bg-gray-800 border-gray-700" />
                </div>
                
                <Button className="btn-gradient w-full text-lg py-6">
                  Cadastre-se Agora
                </Button>
                
                <p className="text-xs text-gray-400 text-center">
                  Ao clicar em "Cadastre-se Agora", você concorda com nossos <Link to="/termos" className="text-coroa-purple hover:underline">Termos de Uso</Link> e <Link to="/privacidade" className="text-coroa-purple hover:underline">Política de Privacidade</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por Que Escolher <span className="gradient-text">Majestade Privada</span></h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Criamos a plataforma ideal para mulheres maduras e os homens que as admiram encontrarem relacionamentos significativos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-white">{feature.title}</h3>
                <p className="text-gray-400 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Como Funciona</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Encontrar sua majestade ou seu admirador ideal é simples e rápido com apenas três passos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-coroa-purple text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Crie Seu Perfil</h3>
              <p className="text-gray-400">
                Registre-se gratuitamente, adicione suas melhores fotos e conte um pouco sobre você e seus interesses.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-coroa-pink text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Encontre Matches</h3>
              <p className="text-gray-400">
                Explore perfis sugeridos com base em suas preferências ou use nossos filtros avançados de busca.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-coroa-purple text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Comece a Conversar</h3>
              <p className="text-gray-400">
                Inicie conversas interessantes com suas conexões e marque encontros no mundo real.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/como-funciona">
              <Button variant="outline" className="border-coroa-purple text-coroa-purple hover:bg-coroa-purple hover:text-white">
                Saiba Mais Sobre Como Funciona
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Histórias de Sucesso</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Veja o que nossos usuários dizem sobre suas experiências e relacionamentos encontrados em nossa plataforma.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-gray-400">{testimonial.age} anos</p>
                  </div>
                </div>
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-400 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Premium Section */}
      <section className="py-20 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-r from-coroa-purple to-coroa-pink opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="text-coroa-purple font-semibold">PREMIUM</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Desbloqueie Todos os Recursos</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Aproveite ao máximo sua experiência com recursos premium que aumentam suas chances de encontrar a pessoa certa.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-coroa-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Veja quem curtiu seu perfil</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-coroa-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Mensagens ilimitadas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-coroa-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Filtros avançados de busca</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-coroa-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Modo invisível</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-coroa-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Acesso a eventos exclusivos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-coroa-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Destaque nos resultados de busca</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-coroa-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Sem anúncios</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-coroa-purple mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Suporte prioritário</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/premium">
                <Button className="btn-gradient text-lg animate-pulse-scale">
                  <Crown className="h-5 w-5 mr-2" />
                  Torne-se Premium
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-coroa-purple to-coroa-pink py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-4">
            <Crown className="text-white h-10 w-10 mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold">Majestade Privada</h2>
          </div>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Junte-se a milhares de pessoas que já encontraram relacionamentos incríveis em nossa plataforma.
          </p>
          <Link to="/cadastro">
            <Button size="lg" className="bg-white text-coroa-purple hover:bg-gray-100 transition-colors text-lg">
              Cadastre-se Gratuitamente
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

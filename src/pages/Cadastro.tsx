import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from 'react-router-dom';
import { Crown, ArrowRight, Facebook, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";

const Cadastro = () => {
  const [step, setStep] = React.useState(1);
  const totalSteps = 3;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleNextStep = () => {
    setStep((prev) => prev < totalSteps ? prev + 1 : prev);
  };
  
  const handlePrevStep = () => {
    setStep((prev) => prev > 1 ? prev - 1 : prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate successful registration
    localStorage.setItem('userLoggedIn', 'true');
    
    // Show success message
    toast({
      title: "Cadastro realizado",
      description: "Sua conta foi criada com sucesso!",
    });
    
    // Redirect to inicio page - using navigate for programmatic navigation
    navigate('/inicio', { replace: true });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Crown className="h-12 w-12 text-coroa-purple" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Crie Sua Conta
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Já tem conta?{' '}
              <Link to="/login" className="font-medium text-coroa-purple hover:text-coroa-pink">
                Faça login
              </Link>
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {[...Array(totalSteps)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      i + 1 === step ? 'bg-coroa-purple text-white' : 
                      i + 1 < step ? 'bg-green-500 text-white' : 
                      'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      {i + 1 < step ? '✓' : i + 1}
                    </div>
                    <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                      {i === 0 ? 'Informações' : i === 1 ? 'Perfil' : 'Preferências'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-coroa-purple to-coroa-pink h-2.5 rounded-full" 
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Eu sou
                    </label>
                    <Select>
                      <SelectTrigger>
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
                    <label htmlFor="looking" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Procurando por
                    </label>
                    <Select>
                      <SelectTrigger>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome
                    </label>
                    <Input type="text" id="name" placeholder="Seu nome" required />
                  </div>
                  
                  <div>
                    <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data de Nascimento
                    </label>
                    <Input type="date" id="birthdate" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <Input type="email" id="email" placeholder="seu.email@exemplo.com" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Senha
                    </label>
                    <Input type="password" id="password" placeholder="********" required />
                  </div>
                  
                  <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirmar Senha
                    </label>
                    <Input type="password" id="password_confirmation" placeholder="********" required />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleNextStep} className="btn-gradient">
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}
            
            {/* Step 2: Profile Information */}
            {step === 2 && (
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Foto de Perfil
                  </label>
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <span className="text-gray-500 dark:text-gray-400 text-sm text-center p-2">
                        Clique para adicionar uma foto
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <input type="file" className="hidden" id="profile-photo" />
                    <label htmlFor="profile-photo" className="text-sm text-coroa-purple hover:text-coroa-pink cursor-pointer">
                      Adicionar foto
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cidade
                  </label>
                  <Input type="text" id="location" placeholder="Sua cidade" required />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sobre mim
                  </label>
                  <textarea 
                    id="bio" 
                    rows={3} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coroa-purple focus:ring-coroa-purple dark:border-gray-600 dark:bg-gray-800 dark:text-white" 
                    placeholder="Conte um pouco sobre você..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Interesses
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Viagens', 'Culinária', 'Filmes', 'Música', 'Leitura', 'Esportes', 'Arte', 'Natureza', 'Tecnologia', 'Danças', 'Fotografia', 'Vinhos'].map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox id={`interest-${interest}`} />
                        <label
                          htmlFor={`interest-${interest}`}
                          className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-none"
                        >
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button type="button" variant="outline" onClick={handlePrevStep}>
                    Voltar
                  </Button>
                  <Button type="button" onClick={handleNextStep} className="btn-gradient">
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}
            
            {/* Step 3: Preferences */}
            {step === 3 && (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Faixa Etária de Interesse
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="age_min" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Idade Mínima
                      </label>
                      <Select defaultValue="18">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(63)].map((_, i) => (
                            <SelectItem key={i} value={(i + 18).toString()}>
                              {i + 18} anos
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="age_max" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Idade Máxima
                      </label>
                      <Select defaultValue="80">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(63)].map((_, i) => (
                            <SelectItem key={i} value={(i + 18).toString()}>
                              {i + 18} anos
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Distância máxima
                  </label>
                  <Select defaultValue="50">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 km</SelectItem>
                      <SelectItem value="25">25 km</SelectItem>
                      <SelectItem value="50">50 km</SelectItem>
                      <SelectItem value="100">100 km</SelectItem>
                      <SelectItem value="any">Qualquer distância</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Tipo de Relacionamento
                  </label>
                  <div className="space-y-2">
                    {['Relacionamento sério', 'Amizade', 'Casual', 'Algo divertido'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={`relationship-${type}`} />
                        <label
                          htmlFor={`relationship-${type}`}
                          className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-none"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      Eu concordo com os{' '}
                      <Link to="/termos" className="text-coroa-purple hover:text-coroa-pink">
                        Termos de Uso
                      </Link>{' '}
                      e{' '}
                      <Link to="/privacidade" className="text-coroa-purple hover:text-coroa-pink">
                        Política de Privacidade
                      </Link>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" />
                    <label
                      htmlFor="newsletter"
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      Quero receber emails sobre ofertas, novidades e dicas
                    </label>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button type="button" variant="outline" onClick={handlePrevStep}>
                    Voltar
                  </Button>
                  <Button type="submit" className="btn-gradient">
                    Concluir Cadastro
                  </Button>
                </div>
              </form>
            )}
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                    Ou cadastre-se com
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Facebook className="h-5 w-5 mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-5 w-5 mr-2" />
                  Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cadastro;

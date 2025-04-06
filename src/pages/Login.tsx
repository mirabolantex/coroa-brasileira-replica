
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from 'react-router-dom';
import { Crown, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate successful login
    localStorage.setItem('userLoggedIn', 'true');
    
    // Show success message
    toast({
      title: "Login realizado",
      description: "Você entrou com sucesso!",
    });
    
    // Redirect to inicio page
    navigate('/inicio');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Crown className="h-12 w-12 text-coroa-purple" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Entre em Sua Conta
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Ou{' '}
              <Link to="/cadastro" className="font-medium text-coroa-purple hover:text-coroa-pink">
                cadastre-se gratuitamente
              </Link>
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="seu.email@exemplo.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Senha
                </label>
                <Input 
                  type="password" 
                  id="password" 
                  placeholder="********" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-coroa-purple focus:ring-coroa-purple dark:border-gray-600 dark:bg-gray-700"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Lembrar de mim
                  </label>
                </div>
                
                <Link to="/esqueceu-senha" className="text-sm font-medium text-coroa-purple hover:text-coroa-pink">
                  Esqueceu a senha?
                </Link>
              </div>
              
              <Button type="submit" className="btn-gradient w-full">
                Entrar
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                    Ou continue com
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Ao fazer login, você concorda com nossos{' '}
            <Link to="/termos" className="font-medium text-coroa-purple hover:text-coroa-pink">
              Termos de Uso
            </Link>{' '}
            e{' '}
            <Link to="/privacidade" className="font-medium text-coroa-purple hover:text-coroa-pink">
              Política de Privacidade
            </Link>
            .
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;

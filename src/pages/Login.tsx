
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { Crown, Facebook, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
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
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <Input type="email" id="email" placeholder="seu.email@exemplo.com" required />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Senha
                </label>
                <Input type="password" id="password" placeholder="********" required />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-coroa-purple focus:ring-coroa-purple dark:border-gray-600 dark:bg-gray-700"
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


import React from 'react';
import { Wallet as WalletIcon, PlusCircle, History, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Wallet = () => {
  const [balance, setBalance] = React.useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Minha Carteira</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WalletIcon className="h-6 w-6 text-coroa-purple" />
                Saldo Disponível
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-6">{balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button className="btn-gradient flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Adicionar Saldo
                </Button>
                <Button variant="outline" className="border-coroa-purple text-coroa-purple hover:bg-coroa-purple hover:text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Métodos de Pagamento
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WalletIcon className="h-6 w-6 text-coroa-purple" />
                Benefícios Premium
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-coroa-purple rounded-full"></div>
                  <span>Matches ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-coroa-purple rounded-full"></div>
                  <span>Sem anúncios</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-coroa-purple rounded-full"></div>
                  <span>Veja quem curtiu você</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-coroa-purple rounded-full"></div>
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              
              <Button className="w-full btn-gradient mt-4">
                Seja Premium
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-6 w-6 text-coroa-purple" />
              Histórico de Transações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Você ainda não tem nenhuma transação registrada.
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wallet;

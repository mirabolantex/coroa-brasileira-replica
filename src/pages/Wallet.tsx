
import React from 'react';
import { Wallet as WalletIcon, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const Wallet = () => {
  const [balance, setBalance] = React.useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost"
            className="mr-2"
            onClick={() => navigate('/inicio')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold gradient-text">Minha Carteira</h1>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WalletIcon className="h-6 w-6 text-coroa-purple" />
                Saldo Disponível
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-6">{balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
              
              <Button 
                className="btn-gradient w-full flex items-center gap-2"
                onClick={() => window.location.href = "https://go.disruptybr.click/ples9hgo7e"}
              >
                <WalletIcon className="h-5 w-5" />
                Sacar Agora
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="py-8">
              <div className="text-center text-gray-500 dark:text-gray-400">
                Para solicitar seu saque, clique no botão acima.
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wallet;

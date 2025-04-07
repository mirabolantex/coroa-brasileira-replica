
import React, { useState, useEffect } from 'react';
import { Wallet as WalletIcon, ArrowLeft, Lock, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const pixTypes = [
  { id: 'cpf', label: 'CPF', type: 'number', pattern: '[0-9]*', maxLength: 11 },
  { id: 'celular', label: 'CELULAR', type: 'tel', pattern: '[0-9]*', maxLength: 11 },
  { id: 'email', label: 'EMAIL', type: 'email' },
  { id: 'aleatoria', label: 'CHAVE ALEATÓRIA', type: 'text' }
];

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [showPixDialog, setShowPixDialog] = useState(false);
  const [selectedPixType, setSelectedPixType] = useState('cpf');
  const [pixValue, setPixValue] = useState('');
  const [savedPixKeys, setSavedPixKeys] = useState<{type: string, value: string}[]>([]);
  const [isVipActive, setIsVipActive] = useState(false);
  const navigate = useNavigate();
  
  // Load balance and saved PIX keys from local storage
  useEffect(() => {
    const storedBalance = localStorage.getItem('walletBalance');
    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }
    
    const storedPixKeys = localStorage.getItem('savedPixKeys');
    if (storedPixKeys) {
      setSavedPixKeys(JSON.parse(storedPixKeys));
    }
    
    const vipStatus = localStorage.getItem('vipActive') === 'true';
    setIsVipActive(vipStatus);
  }, []);
  
  // Save PIX keys to local storage when updated
  useEffect(() => {
    localStorage.setItem('savedPixKeys', JSON.stringify(savedPixKeys));
  }, [savedPixKeys]);
  
  const handlePixSave = () => {
    if (!pixValue.trim()) {
      toast.error("Por favor, preencha o valor da chave PIX");
      return;
    }
    
    // Validate based on type
    if (selectedPixType === 'cpf' && pixValue.length !== 11) {
      toast.error("CPF deve ter 11 dígitos");
      return;
    }
    
    if (selectedPixType === 'celular' && pixValue.length < 10) {
      toast.error("Número de celular inválido");
      return;
    }
    
    if (selectedPixType === 'email' && !pixValue.includes('@')) {
      toast.error("Email inválido");
      return;
    }
    
    // Add new PIX key
    setSavedPixKeys([...savedPixKeys, {
      type: selectedPixType,
      value: pixValue
    }]);
    
    // Reset and close
    setPixValue('');
    setShowPixDialog(false);
    toast.success("Chave PIX adicionada com sucesso!");
  };
  
  const handleDeletePixKey = (index: number) => {
    const updatedKeys = [...savedPixKeys];
    updatedKeys.splice(index, 1);
    setSavedPixKeys(updatedKeys);
    toast.success("Chave PIX removida com sucesso!");
  };
  
  const handleWithdraw = () => {
    window.location.href = "https://go.disruptybr.click/ples9hgo7e";
  };
  
  const handleGoToVipPage = () => {
    window.location.href = "https://go.disruptybr.click/ples9hgo7e";
  };
  
  const getPixTypeLabel = (type: string) => {
    const pixType = pixTypes.find(p => p.id === type);
    return pixType ? pixType.label : type.toUpperCase();
  };

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
              <div className="flex items-center text-4xl font-bold mb-6">
                {!isVipActive && <Lock className="mr-2 text-gray-500" />}
                {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
              
              {isVipActive ? (
                <Button 
                  className="btn-gradient w-full flex items-center gap-2"
                  onClick={handleWithdraw}
                >
                  <WalletIcon className="h-5 w-5" />
                  Sacar Agora
                </Button>
              ) : (
                <Button 
                  className="btn-gradient w-full flex items-center gap-2"
                  onClick={handleGoToVipPage}
                >
                  <Lock className="h-5 w-5" />
                  Ativar V.I.P para Sacar
                </Button>
              )}
              
              <Button 
                className="mt-4 w-full border border-coroa-purple text-coroa-purple flex items-center gap-2"
                variant="outline"
                onClick={() => setShowPixDialog(true)}
              >
                Adicionar Chave Pix
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="py-8">
              {savedPixKeys.length > 0 ? (
                <div>
                  <h3 className="text-lg font-medium mb-4">Chaves Registradas</h3>
                  <div className="space-y-3">
                    {savedPixKeys.map((key, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <span className="text-sm text-gray-500">{getPixTypeLabel(key.type)}:</span>
                          <div className="font-medium">{key.value}</div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeletePixKey(index)}
                        >
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="mt-6 btn-gradient w-full"
                    onClick={handleWithdraw}
                  >
                    Sacar Agora
                  </Button>
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  Adicione uma chave PIX para realizar saques
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* PIX Key Dialog */}
      <Dialog open={showPixDialog} onOpenChange={setShowPixDialog}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Adicionar Chave PIX</DialogTitle>
            <DialogDescription>
              Adicione uma chave PIX para receber seus saques
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <RadioGroup 
              value={selectedPixType} 
              onValueChange={setSelectedPixType}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              {pixTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.id} id={type.id} />
                  <Label htmlFor={type.id}>{type.label}</Label>
                </div>
              ))}
            </RadioGroup>
            
            {selectedPixType && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pixValue">Valor da Chave</Label>
                  <Input 
                    id="pixValue"
                    type={pixTypes.find(t => t.id === selectedPixType)?.type || 'text'}
                    pattern={pixTypes.find(t => t.id === selectedPixType)?.pattern}
                    maxLength={pixTypes.find(t => t.id === selectedPixType)?.maxLength}
                    value={pixValue}
                    onChange={(e) => setPixValue(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button 
                  className="btn-gradient w-full"
                  onClick={handlePixSave}
                >
                  Salvar
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Wallet;


import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VIPDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  balance: number;
  onGoToVipPage: () => void;
}

const VIPDialog: React.FC<VIPDialogProps> = ({ 
  open, 
  onOpenChange, 
  balance, 
  onGoToVipPage 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Ativação V.I.P Necessária</DialogTitle>
        </DialogHeader>
        <div className="p-4 text-center">
          <p className="text-lg font-bold mb-4">Seu Saldo: {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          <p className="mb-4">
            Parece que o match prosseguiu... Porém para garantir a segurança de nossos usuários na plataforma todos os usuários devem fazer o V.I.P onde pode compartilhar e ver localizações, contatos pessoais e resgatar presentes acima de R$300 enviados no chat! Mas fique tranquilo é um único pagamento de taxa!
          </p>
          <Button 
            className="btn-gradient w-full mt-4"
            onClick={onGoToVipPage}
          >
            Ativar Agora!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VIPDialog;

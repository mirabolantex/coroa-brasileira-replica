
import React from 'react';
import { Button } from "@/components/ui/button";

interface ContactCardMessageProps {
  texto: string;
  hora: string;
  cidade: string;
  onShowVIPDialog: () => void;
}

const ContactCardMessage: React.FC<ContactCardMessageProps> = ({ 
  texto, 
  hora, 
  cidade, 
  onShowVIPDialog 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 max-w-[80%] blur-md relative">
      <p className="mb-2">{texto}</p>
      <div className="text-sm mb-2">
        <p>Telefone: (11) 9****-****</p>
        <p>Localização: Próximo a {cidade}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Button 
          onClick={onShowVIPDialog}
          className="bg-coroa-pink hover:bg-coroa-purple text-white"
        >
          Desbloquear
        </Button>
      </div>
      <div className="text-xs opacity-70 text-right mt-1">{hora}</div>
    </div>
  );
};

export default ContactCardMessage;

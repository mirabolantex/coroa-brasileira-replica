
import React from 'react';
import { Button } from "@/components/ui/button";

interface BotIntroMessageProps {
  nome: string;
  connecting: boolean;
  onConnect: () => void;
}

const BotIntroMessage: React.FC<BotIntroMessageProps> = ({ 
  nome, 
  connecting, 
  onConnect 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-5 max-w-[80%] mx-auto shadow">
      <div className="flex items-center mb-3">
        <span className="font-bold text-coroa-purple">Assistente Majestade Privada</span>
      </div>
      <p className="text-gray-300 mb-3">
        Olá! Esta é a sua conversa com {nome}.
      </p>
      <p className="text-gray-300 mb-5">
        Posso conectar você com {nome}.
      </p>
      <Button 
        className="btn-gradient w-full"
        onClick={onConnect}
        disabled={connecting}
      >
        {connecting ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Conectando...
          </>
        ) : (
          "Conectar"
        )}
      </Button>
    </div>
  );
};

export default BotIntroMessage;


import React from 'react';
import { Button } from "@/components/ui/button";

interface GiftCardMessageProps {
  texto: string;
  hora: string;
  giftValue: number;
  giftClaimed: boolean;
  onClaimGift: () => void;
}

const GiftCardMessage: React.FC<GiftCardMessageProps> = ({ 
  texto, 
  hora, 
  giftValue, 
  giftClaimed, 
  onClaimGift 
}) => {
  return (
    <div className={`rounded-lg p-4 ${giftClaimed ? 'bg-green-900' : 'bg-yellow-900'} text-white max-w-[80%]`}>
      <p className="font-bold mb-2">Vale Presente</p>
      <p className="text-2xl font-bold mb-2">R${giftValue.toFixed(2)}</p>
      <p className="text-sm mb-2">{texto}</p>
      {!giftClaimed && (
        <Button 
          className="bg-yellow-600 hover:bg-yellow-500 text-white w-full"
          onClick={onClaimGift}
        >
          Receber
        </Button>
      )}
      <div className="text-xs opacity-70 text-right mt-1">{hora}</div>
    </div>
  );
};

export default GiftCardMessage;

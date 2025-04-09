
import React from 'react';
import { Button } from "@/components/ui/button";

interface ImageMessageProps {
  texto: string;
  hora: string;
  imageUrl: string;
  isBlurred: boolean;
  onUnblur: () => void;
}

const ImageMessage: React.FC<ImageMessageProps> = ({ 
  texto, 
  hora, 
  imageUrl, 
  isBlurred, 
  onUnblur 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 max-w-[80%]">
      <p className="mb-2">{texto}</p>
      <div className="relative">
        <img 
          src={imageUrl} 
          alt="Imagem" 
          className={`rounded-lg w-full max-w-xs ${isBlurred ? 'blur-md' : ''}`}
        />
        {isBlurred && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-white text-center mb-2">1,50 para desbloquear</p>
            <Button 
              onClick={onUnblur}
              className="bg-coroa-pink hover:bg-coroa-purple text-white"
            >
              Desbloquear
            </Button>
          </div>
        )}
      </div>
      <div className="text-xs opacity-70 text-right mt-1">{hora}</div>
    </div>
  );
};

export default ImageMessage;

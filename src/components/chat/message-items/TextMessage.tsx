
import React from 'react';

interface TextMessageProps {
  texto: string;
  hora: string;
  enviada: boolean;
}

const TextMessage: React.FC<TextMessageProps> = ({ texto, hora, enviada }) => {
  return (
    <div className={`max-w-[80%] rounded-lg p-3 ${enviada ? 'bg-coroa-purple text-white' : 'bg-gray-800 text-gray-100'}`}>
      <div>{texto}</div>
      <div className="text-xs opacity-70 text-right mt-1">{hora}</div>
    </div>
  );
};

export default TextMessage;

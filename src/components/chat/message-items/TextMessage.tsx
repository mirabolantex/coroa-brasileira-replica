
import React from 'react';

interface TextMessageProps {
  texto: string;
  hora: string;
  enviada: boolean;
}

const TextMessage: React.FC<TextMessageProps> = ({ texto, hora, enviada }) => {
  return (
    <div className={enviada ? 'message-bubble-sent' : 'message-bubble-received'}>
      <div>{texto}</div>
      <div className="text-xs opacity-70 text-right mt-1">{hora}</div>
    </div>
  );
};

export default TextMessage;

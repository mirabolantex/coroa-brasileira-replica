
import React from 'react';

interface SystemMessageProps {
  texto: string;
  hora: string;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ texto, hora }) => {
  return (
    <div className="message-bubble-received">
      <div className="text-xs text-gray-400 mb-1">Sistema</div>
      <div>{texto}</div>
      <div className="text-xs opacity-70 text-right mt-1">{hora}</div>
    </div>
  );
};

export default SystemMessage;

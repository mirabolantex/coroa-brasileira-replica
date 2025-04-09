
import React, { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';
import BotIntroMessage from './BotIntroMessage';
import TypingIndicator from './message-items/TypingIndicator';

interface MessageListProps {
  mensagens: Array<{
    texto: string;
    enviada: boolean;
    hora: string;
    isBot?: boolean;
    isGiftCard?: boolean;
    giftValue?: number;
    giftClaimed?: boolean;
    isImage?: boolean;
    imageUrl?: string;
    isBlurred?: boolean;
    isContactCard?: boolean;
  }>;
  isTyping: boolean;
  showBotIntro: boolean;
  nome: string;
  connecting: boolean;
  cidade: string;
  onConnectToUser: () => void;
  onUnblurImage: (index: number) => void;
  onClaimGift: (index: number, value: number) => void;
  onShowVIPDialog: () => void;
}

const MessageList: React.FC<MessageListProps> = ({
  mensagens,
  isTyping,
  showBotIntro,
  nome,
  connecting,
  cidade,
  onConnectToUser,
  onUnblurImage,
  onClaimGift,
  onShowVIPDialog
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens, isTyping]);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      {showBotIntro ? (
        <BotIntroMessage 
          nome={nome}
          connecting={connecting}
          onConnect={onConnectToUser}
        />
      ) : (
        <>
          {mensagens.map((msg, index) => (
            <MessageItem
              key={index}
              message={msg}
              index={index}
              cidade={cidade}
              onUnblurImage={onUnblurImage}
              onClaimGift={onClaimGift}
              onShowVIPDialog={onShowVIPDialog}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;

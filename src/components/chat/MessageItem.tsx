
import React from 'react';
import TextMessage from './message-items/TextMessage';
import GiftCardMessage from './message-items/GiftCardMessage';
import ImageMessage from './message-items/ImageMessage';
import ContactCardMessage from './message-items/ContactCardMessage';
import SystemMessage from './message-items/SystemMessage';

interface MessageItemProps {
  message: {
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
  };
  index: number;
  cidade: string;
  onUnblurImage: (index: number) => void;
  onClaimGift: (index: number, value: number) => void;
  onShowVIPDialog: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ 
  message, 
  index, 
  cidade, 
  onUnblurImage, 
  onClaimGift, 
  onShowVIPDialog 
}) => {
  return (
    <div className={`flex ${message.enviada ? 'justify-end' : 'justify-start'}`}>
      {message.isGiftCard ? (
        <GiftCardMessage 
          texto={message.texto}
          hora={message.hora}
          giftValue={message.giftValue || 0}
          giftClaimed={message.giftClaimed || false}
          onClaimGift={() => onClaimGift(index, message.giftValue || 0)}
        />
      ) : message.isImage ? (
        <ImageMessage 
          texto={message.texto}
          hora={message.hora}
          imageUrl={message.imageUrl || ''}
          isBlurred={message.isBlurred || false}
          onUnblur={() => onUnblurImage(index)}
        />
      ) : message.isContactCard ? (
        <ContactCardMessage 
          texto={message.texto}
          hora={message.hora}
          cidade={cidade}
          onShowVIPDialog={onShowVIPDialog}
        />
      ) : !message.enviada && message.isBot ? (
        <SystemMessage 
          texto={message.texto}
          hora={message.hora}
        />
      ) : (
        <TextMessage 
          texto={message.texto}
          hora={message.hora}
          enviada={message.enviada}
        />
      )}
    </div>
  );
};

export default MessageItem;

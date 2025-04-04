
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Bookmark } from 'lucide-react';

interface Perfil {
  id: number;
  nome: string;
  idade: number;
  foto: string;
  cidade: string;
  biografia: string;
  interesses: string[];
}

interface PerfilCardProps {
  perfil: Perfil;
}

const PerfilCard: React.FC<PerfilCardProps> = ({ perfil }) => {
  return (
    <Card className="overflow-hidden profile-card">
      <div className="relative">
        <img 
          src={perfil.foto} 
          alt={perfil.nome} 
          className="w-full aspect-[3/4] object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <h2 className="text-2xl font-bold">
            {perfil.nome}, {perfil.idade}
          </h2>
          <div className="flex items-center text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{perfil.cidade}</span>
          </div>
        </div>
        
        <button className="absolute top-3 right-3 bg-white/20 p-2 rounded-full backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
          <Bookmark className="h-5 w-5" />
        </button>
      </div>
      
      <CardContent className="p-4">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {perfil.biografia}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {perfil.interesses.map((interesse, index) => (
            <Badge key={index} variant="outline" className="bg-coroa-purple/10 text-coroa-purple border-coroa-purple/20">
              {interesse}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerfilCard;

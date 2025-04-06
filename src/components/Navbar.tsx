import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Crown, Menu, MessageCircle, Search, User, X, Wallet } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isLoggedIn] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState<string | null>(null);

  return (
    <nav className="bg-background border-b border-border shadow-md py-3 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Crown className="text-coroa-purple h-7 w-7" />
          <span className="text-2xl font-bold gradient-text md:hidden">MP</span>
          <span className="text-2xl font-bold gradient-text hidden md:block">Majestade Privada</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link to="/buscar" className="text-gray-300 hover:text-coroa-purple transition-colors flex items-center gap-2">
                <Search size={18} />
                <span>Buscar</span>
              </Link>
              <Link to="/mensagens" className="text-gray-300 hover:text-coroa-purple transition-colors flex items-center gap-2">
                <MessageCircle size={18} />
                <span>Mensagens</span>
              </Link>
              <Link to="/wallet" className="text-gray-300 hover:text-coroa-purple transition-colors flex items-center gap-2">
                <Wallet size={18} />
                <span>Carteira</span>
              </Link>
              <Link to="/perfil" className="text-gray-300 hover:text-coroa-purple transition-colors flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profileImage || undefined} />
                  <AvatarFallback className="bg-coroa-purple text-white">MP</AvatarFallback>
                </Avatar>
                <span>Meu Perfil</span>
              </Link>
              <Button className="btn-gradient">Premium</Button>
            </>
          ) : (
            <>
              <Link to="/sobre" className="text-gray-300 hover:text-coroa-purple transition-colors">
                Sobre Nós
              </Link>
              <Link to="/como-funciona" className="text-gray-300 hover:text-coroa-purple transition-colors">
                Como Funciona
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-coroa-purple text-coroa-purple hover:bg-coroa-purple hover:text-white mr-2">
                  Entrar
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button className="btn-gradient">
                  Cadastre-se
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-300"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-md py-4 px-6 z-50">
          {isLoggedIn ? (
            <div className="flex flex-col gap-4">
              <Link 
                to="/buscar" 
                className="text-gray-300 hover:text-coroa-purple transition-colors py-2 flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <Search size={18} />
                <span>Buscar</span>
              </Link>
              <Link 
                to="/mensagens" 
                className="text-gray-300 hover:text-coroa-purple transition-colors py-2 flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <MessageCircle size={18} />
                <span>Mensagens</span>
              </Link>
              <Link 
                to="/wallet" 
                className="text-gray-300 hover:text-coroa-purple transition-colors py-2 flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <Wallet size={18} />
                <span>Carteira</span>
              </Link>
              <Link 
                to="/perfil" 
                className="text-gray-300 hover:text-coroa-purple transition-colors py-2 flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <User size={18} />
                <span>Meu Perfil</span>
              </Link>
              <Button className="btn-gradient">Premium</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link 
                to="/sobre" 
                className="text-gray-300 hover:text-coroa-purple transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                Sobre Nós
              </Link>
              <Link 
                to="/como-funciona" 
                className="text-gray-300 hover:text-coroa-purple transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                Como Funciona
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="border-coroa-purple text-coroa-purple hover:bg-coroa-purple hover:text-white w-full mb-2">
                  Entrar
                </Button>
              </Link>
              <Link to="/cadastro" onClick={() => setMenuOpen(false)}>
                <Button className="btn-gradient w-full">
                  Cadastre-se
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

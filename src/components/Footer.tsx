
import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="https://app.majestadeprivada.space/wp-content/uploads/2025/04/logo-1.png" alt="Majestade Privada" className="h-8" />
              <span className="text-2xl font-bold gradient-text">Majestade Privada</span>
            </div>
            <p className="text-gray-400 mb-4">
              O melhor site de relacionamento para mulheres maduras e homens que as admiram no Brasil.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-coroa-purple transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-coroa-purple transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-coroa-purple transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-coroa-purple transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/como-funciona" className="text-gray-400 hover:text-coroa-purple transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link to="/premium" className="text-gray-400 hover:text-coroa-purple transition-colors">
                  Premium
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-400 hover:text-coroa-purple transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-400 hover:text-coroa-purple transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/termos" className="text-gray-400 hover:text-coroa-purple transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-gray-400 hover:text-coroa-purple transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-coroa-purple transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-coroa-purple transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/ajuda" className="text-gray-400 hover:text-coroa-purple transition-colors">
                  Centro de Ajuda
                </Link>
              </li>
              <li>
                <Link to="/seguranca" className="text-gray-400 hover:text-coroa-purple transition-colors">
                  Dicas de Segurança
                </Link>
              </li>
              <li>
                <a href="mailto:suporte@majestadeprivada.space" className="text-gray-400 hover:text-coroa-purple transition-colors">
                  Email de Contato
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Majestade Privada. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">
            Este site é destinado a pessoas maiores de 18 anos. Todas as imagens são de modelos e utilizadas para fins ilustrativos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

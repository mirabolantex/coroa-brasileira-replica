import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  const [showWelcome, setShowWelcome] = React.useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-background opacity-80"></div>
          <div className="relative container mx-auto px-4 py-24 text-center">
            <h1 className="text-5xl font-bold text-white mb-8 gradient-text">
              Encontre Sua Majestade Privada
            </h1>
            <p className="text-lg text-gray-300 mb-12">
              O lugar ideal para mulheres maduras e homens que as apreciam.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/cadastro">
                <Button className="btn-gradient">Cadastre-se</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-coroa-purple text-coroa-purple hover:bg-coroa-purple hover:text-white">
                  Entrar
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-white mb-8 gradient-text">
              Como Funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  1. Crie Seu Perfil
                </h3>
                <p className="text-gray-400">
                  Compartilhe seus interesses e o que você procura.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  2. Descubra Perfis
                </h3>
                <p className="text-gray-400">
                  Encontre perfis que combinam com você.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  3. Conecte-se
                </h3>
                <p className="text-gray-400">
                  Inicie conversas e construa relacionamentos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-white mb-8 gradient-text">
              Descubra Nossos Benefícios Premium
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Conecte-se Sem Limites
                </h3>
                <p className="text-gray-400">
                  Tenha acesso ilimitado a todos os perfis e recursos.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Destaque Seu Perfil
                </h3>
                <p className="text-gray-400">
                  Apareça no topo das buscas e seja notado.
                </p>
              </div>
            </div>
            <Button className="btn-gradient mt-8">
              Assine Premium Agora
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;

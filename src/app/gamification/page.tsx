"use client";

import { useEffect, useState } from "react";

export default function GamificationPage() {
  const [fansData, setFansData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fansResponse = await fetch("/data/fans.json");
        const fansData = await fansResponse.json();
        
        setFansData(fansData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Sistema de Gamificação</h1>
        <div className="bg-gray-100 h-96 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sistema de Gamificação</h1>
        <div className="flex space-x-2">
          <select className="border rounded p-2">
            <option value="all">Todos os jogos</option>
            <option value="CS2">Counter-Strike 2</option>
            <option value="Valorant">Valorant</option>
            <option value="League of Legends">League of Legends</option>
            <option value="Rainbow Six">Rainbow Six</option>
            <option value="Rocket League">Rocket League</option>
            <option value="Apex Legends">Apex Legends</option>
            <option value="Futebol de 7">Futebol de 7</option>
          </select>
        </div>
      </div>

      {/* Visão geral do sistema de gamificação */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Visão Geral do Sistema de Gamificação</h2>
        
        <p className="text-gray-700 mb-6">
          O sistema de gamificação da FURIA Fan Analytics visa aumentar o engajamento dos fãs através de recompensas, 
          desafios e reconhecimento. Fãs mais engajados recebem badges, acesso a conteúdos exclusivos e oportunidades 
          especiais de interação com a marca e jogadores.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Badges</h3>
            <p className="text-gray-600">
              Conquiste badges exclusivos ao interagir com conteúdo, participar de eventos e demonstrar lealdade à FURIA.
            </p>
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Níveis</h3>
            <p className="text-gray-600">
              Evolua de nível conforme seu engajamento aumenta, desbloqueando benefícios exclusivos em cada etapa.
            </p>
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Recompensas</h3>
            <p className="text-gray-600">
              Ganhe descontos exclusivos, acesso a conteúdo premium e chances de interagir diretamente com jogadores.
            </p>
          </div>
        </div>
      </div>

      {/* Sistema de badges */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Sistema de Badges</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              FÃ FIEL
            </div>
            <h3 className="font-bold mb-1">Fã Fiel</h3>
            <p className="text-sm text-gray-600 mb-2">
              Segue a FURIA há mais de 1 ano e interage regularmente.
            </p>
            <div className="text-xs text-gray-500">Conquistado por 25% dos fãs</div>
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              COMENTARISTA
            </div>
            <h3 className="font-bold mb-1">Comentarista</h3>
            <p className="text-sm text-gray-600 mb-2">
              Fez mais de 50 comentários em posts da FURIA.
            </p>
            <div className="text-xs text-gray-500">Conquistado por 18% dos fãs</div>
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              COMPARTILHADOR
            </div>
            <h3 className="font-bold mb-1">Compartilhador</h3>
            <p className="text-sm text-gray-600 mb-2">
              Compartilhou mais de 30 posts da FURIA.
            </p>
            <div className="text-xs text-gray-500">Conquistado por 12% dos fãs</div>
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              CRIADOR
            </div>
            <h3 className="font-bold mb-1">Criador de Conteúdo</h3>
            <p className="text-sm text-gray-600 mb-2">
              Criou conteúdo original sobre a FURIA.
            </p>
            <div className="text-xs text-gray-500">Conquistado por 5% dos fãs</div>
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              CS2
            </div>
            <h3 className="font-bold mb-1">Fã de CS2</h3>
            <p className="text-sm text-gray-600 mb-2">
              Interage principalmente com conteúdo de CS2.
            </p>
            <div className="text-xs text-gray-500">Conquistado por 40% dos fãs</div>
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              VALORANT
            </div>
            <h3 className="font-bold mb-1">Fã de Valorant</h3>
            <p className="text-sm text-gray-600 mb-2">
              Interage principalmente com conteúdo de Valorant.
            </p>
            <div className="text-xs text-gray-500">Conquistado por 25% dos fãs</div>
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              EVENTO
            </div>
            <h3 className="font-bold mb-1">Participante de Evento</h3>
            <p className="text-sm text-gray-600 mb-2">
              Participou de um evento oficial da FURIA.
            </p>
            <div className="text-xs text-gray-500">Conquistado por 8% dos fãs</div>
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              COLECIONADOR
            </div>
            <h3 className="font-bold mb-1">Colecionador</h3>
            <p className="text-sm text-gray-600 mb-2">
              Possui mais de 3 produtos oficiais da FURIA.
            </p>
            <div className="text-xs text-gray-500">Conquistado por 15% dos fãs</div>
          </div>
        </div>
      </div>

      {/* Sistema de níveis */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Sistema de Níveis</h2>
        
        <div className="mb-6">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                  Progresso
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-purple-600">
                  Nível 3 - Fã Dedicado
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
              <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0 XP</span>
              <span>500 XP</span>
              <span>1000 XP</span>
              <span>2000 XP</span>
              <span>5000 XP</span>
            </div>
            <div className="flex justify-between text-xs font-semibold mt-1">
              <span>Nível 1</span>
              <span>Nível 2</span>
              <span>Nível 3</span>
              <span>Nível 4</span>
              <span>Nível 5</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-center mb-2">Nível 1</h3>
            <h4 className="text-sm text-center text-gray-500 mb-3">Novo Fã</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Acesso a conteúdo básico
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Participação em enquetes
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Badge de novo fã
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-center mb-2">Nível 2</h3>
            <h4 className="text-sm text-center text-gray-500 mb-3">Fã Casual</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Todos os benefícios anteriores
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                5% de desconto na loja
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Acesso a wallpapers exclusivos
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4 bg-purple-50">
            <h3 className="font-bold text-center mb-2">Nível 3</h3>
            <h4 className="text-sm text-center text-gray-500 mb-3">Fã Dedicado</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Todos os benefícios anteriores
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                10% de desconto na loja
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Acesso a conteúdo exclusivo
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Participação em sorteios mensais
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-center mb-2">Nível 4</h3>
            <h4 className="text-sm text-center text-gray-500 mb-3">Fã Apaixonado</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Todos os benefícios anteriores
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                15% de desconto na loja
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Acesso a Q&A com jogadores
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Nome no hall da fama do site
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-center mb-2">Nível 5</h3>
            <h4 className="text-sm text-center text-gray-500 mb-3">Fã Lendário</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Todos os benefícios anteriores
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                20% de desconto na loja
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Convites para eventos exclusivos
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Meet & Greet virtual com jogadores
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Produtos exclusivos para lendários
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Desafios ativos */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Desafios Ativos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">Comentarista Ativo</h3>
            <p className="text-sm text-gray-600 mb-3">
              Faça 10 comentários em posts da FURIA nos próximos 7 dias.
            </p>
            <div className="mb-3">
              <div className="flex justify-between mb-1 text-xs">
                <span>Progresso: 3/10</span>
                <span>30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Recompensa: 100 XP + Badge Comentarista</span>
              <button className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition-colors">
                Ver detalhes
              </button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">Compartilhador</h3>
            <p className="text-sm text-gray-600 mb-3">
              Compartilhe 5 posts da FURIA nas suas redes sociais.
            </p>
            <div className="mb-3">
              <div className="flex justify-between mb-1 text-xs">
                <span>Progresso: 2/5</span>
                <span>40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Recompensa: 150 XP + 5% desconto</span>
              <button className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition-colors">
                Ver detalhes
              </button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">Fã de CS2</h3>
            <p className="text-sm text-gray-600 mb-3">
              Assista a 3 partidas completas de CS2 da FURIA.
            </p>
            <div className="mb-3">
              <div className="flex justify-between mb-1 text-xs">
                <span>Progresso: 1/3</span>
                <span>33%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "33%" }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Recompensa: 200 XP + Badge CS2</span>
              <button className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition-colors">
                Ver detalhes
              </button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">Quiz da FURIA</h3>
            <p className="text-sm text-gray-600 mb-3">
              Acerte pelo menos 8 de 10 perguntas sobre a história da FURIA.
            </p>
            <div className="mb-3">
              <div className="flex justify-between mb-1 text-xs">
                <span>Não iniciado</span>
                <span>0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Recompensa: 250 XP + Wallpaper exclusivo</span>
              <button className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition-colors">
                Iniciar quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ranking de fãs */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Ranking de Fãs</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Posição</th>
                <th className="py-2 px-4 border-b text-left">Username</th>
                <th className="py-2 px-4 border-b text-left">Nível</th>
                <th className="py-2 px-4 border-b text-left">XP</th>
                <th className="py-2 px-4 border-b text-left">Badges</th>
                <th className="py-2 px-4 border-b text-left">Jogo Favorito</th>
              </tr>
            </thead>
            <tbody>
              {fansData?.fans?.slice(0, 10).sort((a, b) => b.engagement_score - a.engagement_score).map((fan, index) => (
                <tr key={fan.id} className={`hover:bg-gray-50 ${index === 0 ? 'bg-yellow-50' : index === 1 ? 'bg-gray-50' : index === 2 ? 'bg-orange-50' : ''}`}>
                  <td className="py-2 px-4 border-b font-bold">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : (index + 1)}
                  </td>
                  <td className="py-2 px-4 border-b">{fan.username}</td>
                  <td className="py-2 px-4 border-b">
                    {fan.engagement_score > 90 ? 'Nível 5' : 
                     fan.engagement_score > 80 ? 'Nível 4' : 
                     fan.engagement_score > 70 ? 'Nível 3' : 
                     fan.engagement_score > 50 ? 'Nível 2' : 'Nível 1'}
                  </td>
                  <td className="py-2 px-4 border-b">{Math.floor(fan.engagement_score * 50)}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-1">
                      {fan.badges.map((badge, i) => (
                        <span key={i} className="inline-block w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center" title={badge}>
                          {badge.charAt(0).toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">{fan.favorite_games[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

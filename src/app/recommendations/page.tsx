"use client";

import { useEffect, useState } from "react";

export default function RecommendationsPage() {
  const [recommendationsData, setRecommendationsData] = useState(null);
  const [fansData, setFansData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFanType, setSelectedFanType] = useState("all");
  const [selectedGame, setSelectedGame] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recommendationsResponse = await fetch("/data/recommendations.json");
        const recommendationsData = await recommendationsResponse.json();
        
        const fansResponse = await fetch("/data/fans.json");
        const fansData = await fansResponse.json();
        
        setRecommendationsData(recommendationsData);
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
        <h1 className="text-3xl font-bold">Recomendações de Conteúdo</h1>
        <div className="bg-gray-100 h-96 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  // Filtrar recomendações com base nos filtros selecionados
  const filteredRecommendations = recommendationsData?.recommendations?.filter(rec => {
    const matchesType = selectedFanType === "all" || rec.target_fan_types.includes(selectedFanType);
    const matchesGame = selectedGame === "all" || rec.related_games.includes(selectedGame);
    return matchesType && matchesGame;
  }) || [];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Recomendações de Conteúdo</h1>
        <div className="flex space-x-2">
          <select 
            className="border rounded p-2"
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            <option value="all">Todos os jogos</option>
            <option value="CS2">Counter-Strike 2</option>
            <option value="Valorant">Valorant</option>
            <option value="League of Legends">League of Legends</option>
            <option value="Rainbow Six">Rainbow Six</option>
            <option value="Rocket League">Rocket League</option>
            <option value="Apex Legends">Apex Legends</option>
            <option value="Futebol de 7">Futebol de 7</option>
          </select>
          <select 
            className="border rounded p-2"
            value={selectedFanType}
            onChange={(e) => setSelectedFanType(e.target.value)}
          >
            <option value="all">Todos os fãs</option>
            <option value="hardcore">Fãs Hardcore</option>
            <option value="game_specific">Fãs de Jogo Específico</option>
            <option value="casual">Fãs Casuais</option>
            <option value="new">Novos Fãs</option>
          </select>
        </div>
      </div>

      {/* Visão geral das recomendações */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm">Conteúdos Recomendados</h3>
          <p className="text-3xl font-bold">{recommendationsData?.recommendations?.length || 0}</p>
          <p className="text-sm">Baseados em análise de comportamento</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm">Influenciadores Potenciais</h3>
          <p className="text-3xl font-bold">{recommendationsData?.influencers?.length || 0}</p>
          <p className="text-sm">Fãs com alto potencial de parceria</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm">Engajamento Esperado</h3>
          <p className="text-3xl font-bold">75%</p>
          <p className="text-sm">Média de engajamento previsto</p>
        </div>
      </div>

      {/* Lista de recomendações de conteúdo */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          Conteúdos Recomendados {selectedFanType !== "all" ? `(${selectedFanType})` : ""} 
          {selectedGame !== "all" ? ` - ${selectedGame}` : ""}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecommendations.map((rec) => (
            <div key={rec.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{rec.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  rec.content_type === 'article' ? 'bg-blue-100 text-blue-800' :
                  rec.content_type === 'video' ? 'bg-red-100 text-red-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rec.content_type}
                </span>
              </div>
              
              <p className="text-gray-700 mb-3">{rec.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {rec.target_fan_types.map((type) => (
                  <span key={type} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                    {type === 'hardcore' ? 'Hardcore' :
                     type === 'game_specific' ? 'Jogo Específico' :
                     type === 'casual' ? 'Casual' : 'Novo Fã'}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {rec.related_games.map((game) => (
                  <span key={game} className="px-2 py-1 bg-purple-100 rounded-full text-xs text-purple-800">
                    {game}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between text-sm text-gray-500">
                <span>Horário ideal: {rec.optimal_posting_time}</span>
                <span>Engajamento esperado: {rec.expected_engagement}%</span>
              </div>
              
              <div className="mt-3 flex justify-end">
                <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors">
                  Programar publicação
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredRecommendations.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            Nenhuma recomendação encontrada com os filtros selecionados.
          </div>
        )}
      </div>

      {/* Influenciadores potenciais */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Influenciadores Potenciais</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Username</th>
                <th className="py-2 px-4 border-b text-left">Plataforma</th>
                <th className="py-2 px-4 border-b text-left">Seguidores</th>
                <th className="py-2 px-4 border-b text-left">Taxa de Engajamento</th>
                <th className="py-2 px-4 border-b text-left">Foco de Conteúdo</th>
                <th className="py-2 px-4 border-b text-left">Potencial</th>
                <th className="py-2 px-4 border-b text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {recommendationsData?.influencers?.map((inf) => (
                <tr key={inf.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{inf.username}</td>
                  <td className="py-2 px-4 border-b">{inf.platform}</td>
                  <td className="py-2 px-4 border-b">{inf.followers.toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{inf.engagement_rate}%</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex flex-wrap gap-1">
                      {inf.content_focus.map((focus) => (
                        <span key={focus} className="px-2 py-1 bg-purple-100 rounded-full text-xs text-purple-800">
                          {focus}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      inf.partnership_potential === 'very high' ? 'bg-purple-100 text-purple-800' :
                      inf.partnership_potential === 'high' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {inf.partnership_potential}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">Contatar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estratégias de engajamento */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Estratégias de Engajamento por Segmento</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-bold text-lg">Para Fãs Hardcore</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Conteúdo exclusivo de bastidores</li>
              <li>Acesso antecipado a novidades</li>
              <li>Oportunidades de interação direta com jogadores</li>
              <li>Produtos exclusivos e edições limitadas</li>
              <li>Convites para eventos presenciais</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg">Para Fãs de Jogo Específico</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Análises táticas aprofundadas</li>
              <li>Conteúdo educativo sobre a modalidade</li>
              <li>Entrevistas com jogadores da modalidade específica</li>
              <li>Notificações sobre torneios da modalidade</li>
              <li>Produtos temáticos da modalidade</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold text-lg">Para Fãs Casuais</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Resumos de torneios e partidas</li>
              <li>Conteúdo de fácil consumo (highlights, melhores momentos)</li>
              <li>Promoções especiais em datas importantes</li>
              <li>Notificações sobre grandes eventos</li>
              <li>Conteúdo de entretenimento com jogadores</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-bold text-lg">Para Novos Fãs</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Guias introdutórios sobre a FURIA e suas modalidades</li>
              <li>Histórico e conquistas da organização</li>
              <li>Apresentação dos jogadores e equipes</li>
              <li>Glossário de termos e explicações básicas</li>
              <li>Descontos para primeira compra na loja oficial</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

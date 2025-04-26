"use client";

import { useEffect, useState } from "react";

export default function SegmentationPage() {
  const [fansData, setFansData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFanType, setSelectedFanType] = useState("all");
  const [selectedGame, setSelectedGame] = useState("all");

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
        <h1 className="text-3xl font-bold">Sistema de Segmentação de Fãs</h1>
        <div className="bg-gray-100 h-96 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  // Filtrar fãs com base nos filtros selecionados
  const filteredFans = fansData?.fans?.filter(fan => {
    const matchesType = selectedFanType === "all" || fan.fan_type === selectedFanType;
    const matchesGame = selectedGame === "all" || fan.favorite_games.includes(selectedGame);
    return matchesType && matchesGame;
  }) || [];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sistema de Segmentação de Fãs</h1>
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

      {/* Visão geral dos segmentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm">Fãs Hardcore</h3>
          <p className="text-3xl font-bold">{fansData?.fan_types?.hardcore || 0}%</p>
          <p className="text-sm">Engajam em tudo, acompanham todos os jogos</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm">Fãs de Jogo Específico</h3>
          <p className="text-3xl font-bold">{fansData?.fan_types?.game_specific || 0}%</p>
          <p className="text-sm">Focados em uma modalidade específica</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm">Fãs Casuais</h3>
          <p className="text-3xl font-bold">{fansData?.fan_types?.casual || 0}%</p>
          <p className="text-sm">Interagem esporadicamente</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm">Novos Fãs</h3>
          <p className="text-3xl font-bold">{fansData?.fan_types?.new || 0}%</p>
          <p className="text-sm">Começaram a seguir recentemente</p>
        </div>
      </div>

      {/* Descrição dos segmentos */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Características dos Segmentos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-bold text-lg">Fãs Hardcore</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Interagem com quase todos os posts</li>
              <li>Acompanham todas as modalidades</li>
              <li>Defendem a marca em discussões</li>
              <li>Usam hashtags relacionadas à FURIA</li>
              <li>Engajamento médio: 90-100%</li>
              <li>Sentimento predominante: Positivo</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg">Fãs de Jogo Específico</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Interagem apenas com conteúdo de jogos específicos</li>
              <li>Conhecimento profundo sobre uma modalidade</li>
              <li>Menos engajamento com outras modalidades</li>
              <li>Engajamento médio: 70-85%</li>
              <li>Sentimento predominante: Positivo/Neutro</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold text-lg">Fãs Casuais</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Interagem esporadicamente</li>
              <li>Maior atividade durante grandes eventos</li>
              <li>Menor conhecimento sobre detalhes da organização</li>
              <li>Engajamento médio: 40-60%</li>
              <li>Sentimento predominante: Neutro</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-bold text-lg">Novos Fãs</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Começaram a seguir recentemente</li>
              <li>Fazem perguntas básicas sobre a organização</li>
              <li>Potencial para se tornarem fãs mais engajados</li>
              <li>Engajamento médio: 30-50%</li>
              <li>Sentimento predominante: Positivo/Neutro</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lista de fãs */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          Lista de Fãs {selectedFanType !== "all" ? `(${selectedFanType})` : ""} 
          {selectedGame !== "all" ? ` - ${selectedGame}` : ""}
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Username</th>
                <th className="py-2 px-4 border-b text-left">Plataforma</th>
                <th className="py-2 px-4 border-b text-left">Tipo de Fã</th>
                <th className="py-2 px-4 border-b text-left">Jogos Favoritos</th>
                <th className="py-2 px-4 border-b text-left">Engajamento</th>
                <th className="py-2 px-4 border-b text-left">Localização</th>
                <th className="py-2 px-4 border-b text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredFans.map((fan) => (
                <tr key={fan.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{fan.username}</td>
                  <td className="py-2 px-4 border-b">{fan.platform}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      fan.fan_type === 'hardcore' ? 'bg-purple-100 text-purple-800' :
                      fan.fan_type === 'game_specific' ? 'bg-blue-100 text-blue-800' :
                      fan.fan_type === 'casual' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {fan.fan_type === 'hardcore' ? 'Hardcore' :
                       fan.fan_type === 'game_specific' ? 'Jogo Específico' :
                       fan.fan_type === 'casual' ? 'Casual' : 'Novo Fã'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">{fan.favorite_games.join(", ")}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${
                        fan.engagement_score > 80 ? 'bg-purple-600' :
                        fan.engagement_score > 60 ? 'bg-blue-600' :
                        fan.engagement_score > 40 ? 'bg-green-600' : 'bg-yellow-600'
                      }`} style={{ width: `${fan.engagement_score}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-500">{fan.engagement_score}%</span>
                  </td>
                  <td className="py-2 px-4 border-b">{fan.demographics.city}, {fan.demographics.country}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">Ver perfil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredFans.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            Nenhum fã encontrado com os filtros selecionados.
          </div>
        )}
      </div>

      {/* Machine Learning */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Machine Learning para Segmentação</h2>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            Nosso sistema utiliza algoritmos de Machine Learning para classificar automaticamente os fãs com base em seus padrões de interação, preferências e comportamento nas redes sociais.
          </p>
          
          <h3 className="font-bold text-lg mb-2">Variáveis utilizadas na classificação:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
            <li>Frequência de interações (comentários, curtidas, compartilhamentos)</li>
            <li>Variedade de modalidades acompanhadas</li>
            <li>Tempo desde a primeira interação</li>
            <li>Sentimento expresso nas interações</li>
            <li>Horários de atividade</li>
            <li>Padrões de linguagem utilizados</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Precisão do modelo:</h4>
            <div className="flex items-center">
              <div className="w-full bg-gray-300 rounded-full h-4 mr-2">
                <div className="bg-purple-600 h-4 rounded-full" style={{ width: "92%" }}></div>
              </div>
              <span>92%</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              O modelo é constantemente refinado com base em novas interações e feedback manual.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
            Executar reclassificação
          </button>
        </div>
      </div>
    </div>
  );
}

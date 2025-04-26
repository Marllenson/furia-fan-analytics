"use client";

import { useEffect, useState } from "react";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import Link from "next/link";

// Importação dinâmica do componente de mapa para evitar problemas de SSR
const HeatMap = dynamic(() => import("@/components/dashboard/HeatMap"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>,
});

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const { fansData, interactionsData, loading, error, fetchFans, fetchInteractions, exportData } = useData();
  const [selectedGame, setSelectedGame] = useState("all");
  const [selectedFanType, setSelectedFanType] = useState("all");

  useEffect(() => {
    // Carregar dados iniciais
    fetchFans();
    fetchInteractions();
  }, [fetchFans, fetchInteractions]);

  // Função para lidar com a mudança de filtros
  const handleFilterChange = () => {
    fetchFans(selectedFanType, selectedGame);
    fetchInteractions(selectedGame);
  };

  // Função para exportar dados
  const handleExport = (dataType: string, format: string) => {
    exportData(dataType, format);
  };

  // Redirecionar para login se não estiver autenticado
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-purple-600 mb-4">Acesso Restrito</h1>
          <p className="text-gray-600 mb-6">
            Você precisa estar autenticado para acessar o dashboard.
          </p>
          <Link 
            href="/login"
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
          >
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Dashboard de Análise de Fãs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 h-32 animate-pulse rounded-lg"></div>
          ))}
        </div>
        <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Dashboard de Análise de Fãs</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Erro ao carregar dados</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard de Análise de Fãs</h1>
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
          <button 
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
            onClick={handleFilterChange}
          >
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Barra de usuário e exportação */}
      <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {user?.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="relative group">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Exportar Dados
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
              <div className="py-1">
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleExport('fans', 'json')}
                >
                  Exportar Fãs (JSON)
                </button>
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleExport('fans', 'csv')}
                >
                  Exportar Fãs (CSV)
                </button>
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleExport('interactions', 'csv')}
                >
                  Exportar Interações (CSV)
                </button>
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleExport('recommendations', 'csv')}
                >
                  Exportar Recomendações (CSV)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm">Total de Fãs</h3>
          <p className="text-3xl font-bold">{fansData?.fans?.length || 0}</p>
          <p className="text-green-500 text-sm">+12% no último mês</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm">Engajamento Médio</h3>
          <p className="text-3xl font-bold">78%</p>
          <p className="text-green-500 text-sm">+5% no último mês</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm">Sentimento Positivo</h3>
          <p className="text-3xl font-bold">{fansData?.sentiment_analysis?.positive || 0}%</p>
          <p className="text-green-500 text-sm">+3% no último mês</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm">Novos Fãs</h3>
          <p className="text-3xl font-bold">{fansData?.fan_types?.new || 0}%</p>
          <p className="text-green-500 text-sm">+8% no último mês</p>
        </div>
      </div>

      {/* Mapa de calor */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Distribuição Geográfica dos Fãs</h2>
        <div className="h-96">
          {interactionsData && <HeatMap geoData={interactionsData.geo_data} />}
        </div>
      </div>

      {/* Gráficos de demografia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Distribuição por Gênero</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full max-w-xs">
              <div className="flex justify-between mb-2">
                <span>Masculino</span>
                <span>{fansData?.demographics?.gender?.masculino || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${fansData?.demographics?.gender?.masculino || 0}%` }}></div>
              </div>
              
              <div className="flex justify-between mb-2">
                <span>Feminino</span>
                <span>{fansData?.demographics?.gender?.feminino || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div className="bg-pink-500 h-4 rounded-full" style={{ width: `${fansData?.demographics?.gender?.feminino || 0}%` }}></div>
              </div>
              
              <div className="flex justify-between mb-2">
                <span>Outro</span>
                <span>{fansData?.demographics?.gender?.outro || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div className="bg-purple-500 h-4 rounded-full" style={{ width: `${fansData?.demographics?.gender?.outro || 0}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Distribuição por Idade</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full max-w-xs">
              {fansData?.demographics?.age && Object.entries(fansData.demographics.age).map(([range, value]) => (
                <div key={range}>
                  <div className="flex justify-between mb-2">
                    <span>{range}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: `${value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Análise de sentimentos */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Análise de Sentimentos</h2>
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="text-center mb-4 md:mb-0">
            <div className="inline-block w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center">
              <span className="text-2xl font-bold">{fansData?.sentiment_analysis?.positive || 0}%</span>
            </div>
            <p className="mt-2 font-semibold text-green-600">Positivo</p>
          </div>
          
          <div className="text-center mb-4 md:mb-0">
            <div className="inline-block w-32 h-32 rounded-full border-8 border-gray-400 flex items-center justify-center">
              <span className="text-2xl font-bold">{fansData?.sentiment_analysis?.neutral || 0}%</span>
            </div>
            <p className="mt-2 font-semibold text-gray-500">Neutro</p>
          </div>
          
          <div className="text-center">
            <div className="inline-block w-32 h-32 rounded-full border-8 border-red-500 flex items-center justify-center">
              <span className="text-2xl font-bold">{fansData?.sentiment_analysis?.negative || 0}%</span>
            </div>
            <p className="mt-2 font-semibold text-red-600">Negativo</p>
          </div>
        </div>
      </div>

      {/* Preferências de jogos */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Preferências de Jogos</h2>
        <div className="h-64">
          <div className="w-full">
            {fansData?.game_preferences && Object.entries(fansData.game_preferences).map(([game, value]) => (
              <div key={game}>
                <div className="flex justify-between mb-2">
                  <span>{game}</span>
                  <span>{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div className="bg-purple-500 h-4 rounded-full" style={{ width: `${value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horários de atividade */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Horários de Maior Atividade</h2>
        <div className="h-64">
          <div className="w-full">
            {fansData?.active_hours && Object.entries(fansData.active_hours).map(([timeRange, value]) => (
              <div key={timeRange}>
                <div className="flex justify-between mb-2">
                  <span>{timeRange}</span>
                  <span>{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// Definir tipos para os dados
interface FanData {
  fans: any[];
  demographics: any;
  fan_types: any;
  game_preferences: any;
  sentiment_analysis: any;
  active_hours: any;
  engagement_metrics: any;
}

interface InteractionData {
  interactions: any[];
  geo_data: any;
}

interface RecommendationData {
  recommendations: any[];
  influencers: any[];
}

// Definir o tipo para o contexto de dados
interface DataContextType {
  fansData: FanData | null;
  interactionsData: InteractionData | null;
  recommendationsData: RecommendationData | null;
  loading: boolean;
  error: string | null;
  fetchFans: (fanType?: string, game?: string) => Promise<void>;
  fetchInteractions: (game?: string, sentiment?: string) => Promise<void>;
  fetchRecommendations: (fanType?: string, game?: string) => Promise<void>;
  exportData: (dataType: string, format: string) => Promise<void>;
}

// Criar o contexto de dados
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provedor de dados
export function DataProvider({ children }: { children: ReactNode }) {
  const [fansData, setFansData] = useState<FanData | null>(null);
  const [interactionsData, setInteractionsData] = useState<InteractionData | null>(null);
  const [recommendationsData, setRecommendationsData] = useState<RecommendationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar dados de fãs
  const fetchFans = async (fanType = 'all', game = 'all') => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `/api/fans?fanType=${fanType}&game=${game}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados de fãs');
      }
      
      const data = await response.json();
      setFansData(data);
    } catch (err) {
      setError('Erro ao buscar dados de fãs');
      console.error('Erro ao buscar fãs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar interações
  const fetchInteractions = async (game = 'all', sentiment = 'all') => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `/api/interactions?game=${game}&sentiment=${sentiment}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar interações');
      }
      
      const data = await response.json();
      setInteractionsData(data);
    } catch (err) {
      setError('Erro ao buscar interações');
      console.error('Erro ao buscar interações:', err);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar recomendações
  const fetchRecommendations = async (fanType = 'all', game = 'all') => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `/api/recommendations?fanType=${fanType}&game=${game}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar recomendações');
      }
      
      const data = await response.json();
      setRecommendationsData(data);
    } catch (err) {
      setError('Erro ao buscar recomendações');
      console.error('Erro ao buscar recomendações:', err);
    } finally {
      setLoading(false);
    }
  };

  // Função para exportar dados
  const exportData = async (dataType: string, format: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `/api/export?type=${dataType}&format=${format}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erro ao exportar dados');
      }
      
      if (format === 'csv') {
        // Para CSV, baixar como arquivo
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${dataType}_export.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        // Para JSON, apenas exibir no console (em produção, poderia salvar como arquivo)
        const data = await response.json();
        console.log('Dados exportados:', data);
      }
    } catch (err) {
      setError('Erro ao exportar dados');
      console.error('Erro ao exportar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  // Valor do contexto
  const value = {
    fansData,
    interactionsData,
    recommendationsData,
    loading,
    error,
    fetchFans,
    fetchInteractions,
    fetchRecommendations,
    exportData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// Hook para usar o contexto de dados
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
}
